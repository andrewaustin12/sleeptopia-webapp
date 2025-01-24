import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    title: v.string(),
    companyName: v.string(),
    companyLogo: v.optional(v.string()),
    companyWebsite: v.optional(v.string()),
    location: v.object({
      city: v.string(),
      state: v.string(),
      postalCode: v.string(),
      country: v.string(),
    }),
    jobType: v.union(
      v.literal("Full-time"),
      v.literal("Part-time"),
      v.literal("Contract"),
      v.literal("Seasonal")
    ),
    salaryRange: v.string(),
    description: v.string(),
    requirements: v.optional(v.string()),
    categoryId: v.string(),
    subcategoryId: v.string(),
    listingType: v.union(
      v.literal("standard"),
      v.literal("premium"),
      v.literal("spotlight")
    ),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const now = Date.now();
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

    const jobListing = await ctx.db.insert("jobListings", {
      userId: identity.subject as Id<"users">,
      ...args,
      status: "active",
      createdAt: now,
      expiresAt: now + thirtyDaysInMs,
    });

    return jobListing;
  },
});

export const list = query({
  handler: async (ctx) => {
    const now = Date.now();
    const jobs = await ctx.db
      .query("jobListings")
      .filter((q) => 
        q.and(
          q.eq(q.field("status"), "active"),
          q.gt(q.field("expiresAt"), now)
        )
      )
      .order("desc")
      .collect();
    
    return jobs;
  },
});

// Add a new mutation to handle expired listings
export const cleanupExpiredListings = mutation({
  handler: async (ctx) => {
    const now = Date.now();
    const expiredListings = await ctx.db
      .query("jobListings")
      .filter((q) => 
        q.and(
          q.eq(q.field("status"), "active"),
          q.lte(q.field("expiresAt"), now)
        )
      )
      .collect();

    // Update expired listings to inactive status
    for (const listing of expiredListings) {
      await ctx.db.patch(listing._id, { status: "expired" });
    }
  },
});

// Add this new query
export const get = query({
  args: { id: v.id("jobListings") },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.id);
    return job;
  },
});