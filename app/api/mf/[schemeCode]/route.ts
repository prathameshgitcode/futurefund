import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ schemeCode: string }> },
) {
  const { schemeCode } = await params;
  const code = parseInt(schemeCode, 10);

  if (!code || isNaN(code)) {
    return NextResponse.json({ error: "Invalid scheme code" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(`https://api.mfapi.in/mf/${code}`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    clearTimeout(timer);

    if (!res.ok) {
      return NextResponse.json(
        { error: `mfapi returned ${res.status}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      { error: isAbort ? "Request timed out" : "Failed to fetch fund data" },
      { status: isAbort ? 504 : 502 },
    );
  }
}
