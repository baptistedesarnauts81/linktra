import { query } from "./_generated/server";

export const getCurrentUserStore = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return null;

    const clerkId = identity.subject;

    const store = await ctx.db
      .query("organizations")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first();

    return store;
  },
});
