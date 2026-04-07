import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const GQL_ENDPOINT = process.env.OPTIMIZELY_GRAPH_ENDPOINT;

    if (!GQL_ENDPOINT) {
      return NextResponse.json(
        { error: "Optimizely Graph Endpoint is not configured on the server." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const fetchResponse = await fetch(GQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!fetchResponse.ok) {
      console.error(`GraphQL fetch failed: ${fetchResponse.status} ${fetchResponse.statusText}`);
      return NextResponse.json(
        { error: "Error fetching from Optimizely Graph" },
        { status: fetchResponse.status }
      );
    }

    const data = await fetchResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("BFF GraphQL proxy error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
