// src/app/redirect/[linkId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

// Environment variables
const TINYBIRD_API_URL =
  process.env.TINYBIRD_API_URL || "https://api.us-east.aws.tinybird.co";
const TINYBIRD_TOKEN = process.env.TINYBIRD_TOKEN;

export async function GET(request: Request, params: any) {
  const linkId = params.linkId;
  const url = new URL(request.url);
  const userId = url.searchParams.get("uid") || "anonymous";
  const referrer = request.headers.get("referer") || "";

  try {
    const userAgent = request.headers.get("user-agent") || "";

    // Parse the user agent to get device information
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();

    const trackPromise = fetch(`${TINYBIRD_API_URL}/v0/events?name=clicks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TINYBIRD_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        link_id: linkId,
        timestamp: new Date().toISOString(),
        referrer,
        device: JSON.stringify(device),
        browser: browser.name || "unknown",
        os: os.name || "unknown",
      }),
    });

    // Get link from convex SELECT url from links where id === linkId
    const originalUrl = "https://google.com";
    // Ensure the tracking completes, but don't wait for it to finish
    trackPromise.catch((error) =>
      console.error("Failed to track click:", error)
    );

    // Redirect to the original URL
    return NextResponse.redirect(new URL(originalUrl));
  } catch (error) {
    console.error("Error in redirect handler:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}
