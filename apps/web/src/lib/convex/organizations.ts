"use server";

import { api } from "@linktra/backend/convex/_generated/api";
import { convex } from "./actions";

export async function getOrganizationByUsername(username: string) {
  try {
    const store = await convex.query(
      api.organizations.getOrganizationByUsername,
      {
        username,
      }
    );
    return store;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUserStore() {
  const store = await convex.query(api.auth.getCurrentUserStore);
  return store;
}
