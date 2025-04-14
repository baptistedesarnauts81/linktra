import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getOrganizationByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const store = await ctx.db
      .query("organizations")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    return store || null;
  },
});

export const createStore = mutation({
  args: {
    name: v.string(),
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("User must be logged in to create a store");

    const clerkId = identity.subject;

    const existingStore = await ctx.db
      .query("organizations")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (existingStore) {
      throw new Error("A store with this username already exists");
    }

    const storeId = await ctx.db.insert("organizations", {
      name: args.name,
      username: args.username,
      clerkId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      is_published: false,
      is_maintenance: false,
    });

    return { storeId };
  },
});
