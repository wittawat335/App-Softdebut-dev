import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const endpoint = process.env.GRAPH_QL_ENDPOINT_LIVE;
    const apiKey = process.env.SITECORE_API_KEY_LIVE;

    if (!endpoint || !apiKey) {
      return NextResponse.json(
        { error: "Missing GRAPH_QL_ENDPOINT or SITECORE_API_KEY in .env" },
        { status: 500 },
      );
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sc_apikey: apiKey,
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("❌ Sitecore Preview API Error:", responseText);
      return NextResponse.json(
        { error: "Preview API Error", details: responseText },
        { status: response.status },
      );
    }

    return NextResponse.json(JSON.parse(responseText));
  } catch (error) {
    console.error("❌ Proxy Critical Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
