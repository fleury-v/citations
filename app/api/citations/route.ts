import { prisma } from "@/src/lib/script";
// import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    true: process.env.NODE_ENV,
  });
}

export async function POST(request: NextRequest) {
  const json = await request.json();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // console.log(json);

  // const data = {
  //   citation: String(formData.get("citation")),
  //   author: String(formData.get("author")),
  // }
  const newCitation = await prisma.citation.create({
    data: {
      text: json.citation,
      author: json.author,
    },
  });

  return NextResponse.json({
    citation: newCitation,
  });
}
