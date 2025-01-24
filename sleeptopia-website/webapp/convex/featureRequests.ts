import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

export const create = mutation({
  args: { request: v.string(), tags: v.array(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const userData = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", user.subject))
      .first();

    if (!userData) {
      throw new Error("User not found in database");
    }

    const featureRequest = await ctx.db.insert("featureRequests", {
      request: args.request,
      userId: user.subject,
      username: userData.username,
      createdAt: Date.now(),
      tags: args.tags,
      votes: [],
      status: "pending",
      adminNote: "",
      priority: "unassigned",
    });

    // Send email notification to admin
    await ctx.scheduler.runAfter(0, internal.sendEmails.sendFeatureRequestEmail, {
      to: ADMIN_EMAIL,
      username: userData.username,
      request: args.request,
      tag: args.tags[0] || "untagged",
    });

    return featureRequest;
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      return undefined;
    }

    const requests = await ctx.db
      .query("featureRequests")
      .order("desc")
      .collect();

    return requests.map(request => ({
      ...request,
      voted: request.votes?.includes(user.subject) ?? false,
      voteCount: request.votes?.length ?? 0,
    }));
  },
});

export const toggleVote = mutation({
  args: { id: v.id("featureRequests") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const request = await ctx.db.get(args.id);
    if (!request) throw new Error("Feature request not found");

    const userId = identity.subject;
    const votes = request.votes;
    const hasVoted = votes.includes(userId);

    if (hasVoted) {
      votes.splice(votes.indexOf(userId), 1);
    } else {
      votes.push(userId);
    }

    await ctx.db.patch(args.id, { votes });
  },
});

export const getAllForAdmin = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { error: "Unauthorized: Not logged in" };
    
    // Check if user is admin
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("userId"), identity.subject))
      .unique();
    
    if (user?.role !== "admin") {
      return { error: "Unauthorized: Not an admin" };
    }
    
    const features = await ctx.db
      .query("featureRequests")
      .order("desc")
      .collect();
    
    return { data: features.map(feature => ({
      ...feature,
      status: feature.status || "pending",
      adminNote: feature.adminNote || ""
    }))};
  }
});

export const updateStatus = mutation({
  args: { 
    id: v.id("featureRequests"),
    status: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) throw new Error("Unauthorized");
    
    await ctx.db.patch(args.id, {
      status: args.status
    });
  }
});

export const updateAdminNote = mutation({
  args: { 
    id: v.id("featureRequests"),
    note: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { error: "Unauthorized: Not logged in" };
    
    // Check if user is admin
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("userId"), identity.subject))
      .unique();
    
    if (user?.role !== "admin") {
      return { error: "Unauthorized: Not an admin" };
    }

    await ctx.db.patch(args.id, {
      adminNote: args.note
    });
    return { success: true };
  }
});

export const deleteFeatureRequest = mutation({
  args: { id: v.id("featureRequests") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { error: "Unauthorized: Not logged in" };
    
    // Check if user is admin
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("userId"), identity.subject))
      .unique();
    
    if (user?.role !== "admin") {
      return { error: "Unauthorized: Not an admin" };
    }

    await ctx.db.delete(args.id);
    return { success: true };
  }
});

export const updatePriority = mutation({
  args: { 
    id: v.id("featureRequests"),
    priority: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { error: "Unauthorized: Not logged in" };
    
    // Check if user is admin
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("userId"), identity.subject))
      .unique();
    
    if (user?.role !== "admin") {
      return { error: "Unauthorized: Not an admin" };
    }

    await ctx.db.patch(args.id, {
      priority: args.priority
    });
    return { success: true };
  }
});