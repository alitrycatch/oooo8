import { prisma } from "@/lib/prisma";
import BuildingDetail from "@/components/buildings/BuildingDetail";

export default async function BuildingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const building = await prisma.building.findUnique({
    where: { id },
    include: {
      translations: true,
      images: {
        orderBy: {
          order: "asc",
        },
      },
      videos: true,
      tags: true,
    },
  });

  if (!building) {
    return <div>Building not found</div>;
  }

  return <BuildingDetail building={building} />;
}
