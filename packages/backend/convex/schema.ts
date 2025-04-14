import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  organizations: defineTable({
    name: v.string(),
    username: v.string(),
    clerkId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    is_published: v.boolean(),
    is_maintenance: v.boolean(),
  })
    .index("by_username", ["username"])
    .index("by_clerkId", ["clerkId"]),
});
