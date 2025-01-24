import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    username: v.string(),
    stripeId: v.optional(v.string()),
    role: v.optional(v.string()),
  })
  .index("by_userId", ["userId"])
  .index("by_stripeId", ["stripeId"])
  .index("by_username", ["username"]),

  featureRequests: defineTable({
    userId: v.optional(v.string()),
    username: v.optional(v.string()),
    request: v.string(),
    tags: v.optional(v.array(v.string())),
    priority: v.optional(v.string()),
    status: v.string(),
    adminNote: v.optional(v.string()),
    votes: v.array(v.string()),
    createdAt: v.number(),
  })
    .index("by_votes", ["votes"])
    .index("by_createdAt", ["createdAt"]),

    jobListings: defineTable({
      userId: v.id("users"),
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
        v.literal("Seasonal"),
        v.literal("One-time gig")
      ),
      eventDateTime: v.optional(v.object({
        startDate: v.string(),
        startTime: v.string(),
        endDate: v.optional(v.string()),
        endTime: v.optional(v.string()),
        isRecurring: v.optional(v.boolean()),
        recurringPattern: v.optional(v.object({
          frequency: v.union(
            v.literal("weekly"),
            v.literal("monthly"),
            v.literal("custom")
          ),
          daysOfWeek: v.optional(v.array(v.string())),
          endDate: v.optional(v.string()),
        })),
      })),
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
      status: v.union(
        v.literal("active"),
        v.literal("expired"),
        v.literal("draft")
      ),
      createdAt: v.number(),
      expiresAt: v.number(),
    })
    .index("by_createdAt", ["createdAt"])
    .index("by_expiresAt", ["expiresAt"]),
}); 
