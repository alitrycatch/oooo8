import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const building = await prisma.building.create({
      data: {
        location: body.location,
        builtYear: body.builtYear ? parseInt(body.builtYear) : null,
        architect: body.architect,
        lat: body.lat ? parseFloat(body.lat) : null,
        lng: body.lng ? parseFloat(body.lng) : null,
        images: {
          create: body.images
            .filter((url: string) => url.trim())
            .map((url: string, i: number) => ({ url, order: i })),
        },
        videos: {
          create: body.videos
            .filter((url: string) => url.trim())
            .map((url: string) => ({ url })),
        },
        tags: {
          create: body.tags.map((name: string) => ({ name })),
        },
        translations: {
          create: body.translations.filter((t: any) => t.name && t.description),
        },
      },
    });

    return NextResponse.json(building);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
