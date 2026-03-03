import { NextRequest, NextResponse } from "next/server";

// Store this in .env.local → AZURE_FUNCTION_URL=https://...
const AZURE_URL = process.env.AZURE_FUNCTION_URL!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const azureRes = await fetch(AZURE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!azureRes.ok) {
      return NextResponse.json(
        { error: "Azure Function returned an error" },
        { status: azureRes.status }
      );
    }

    const data = await azureRes.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: "Internal proxy error" }, { status: 500 });
  }
}