import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");
  const filename = lang === "en" ? "cv-en.pdf" : "cv-es.pdf";
  const filePath = join(process.cwd(), "public", filename);

  try {
    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="curriculum-josmary-pirela-${lang === "en" ? "en" : "es"}.pdf"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("CV not found", { status: 404 });
  }
}
