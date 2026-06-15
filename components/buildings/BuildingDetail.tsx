"use client";

import { useState } from "react";

type BuildingProps = {
  building: {
    id: string;
    location: string | null;
    architect: string | null;
    builtYear: number | null;

    translations: {
      id: string;
      lang: string;
      name: string;
      description: string;
    }[];

    images: {
      id: string;
      url: string;
      caption: string | null;
    }[];

    tags: {
      id: string;
      name: string;
    }[];
  };
};

export default function BuildingDetail({ building }: BuildingProps) {
  const [selectedLang, setSelectedLang] = useState("fa");

  const translation =
    building.translations.find((t) => t.lang === selectedLang) ||
    building.translations[0];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* language switcher */}
      <div className="flex flex-wrap gap-2 mb-8">
        {building.translations.map((t) => (
          <button
            key={t.lang}
            onClick={() => setSelectedLang(t.lang)}
            className={`px-4 py-2 rounded-md border ${
              selectedLang === t.lang ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {t.lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* title */}
      <h1 className="text-4xl font-bold mb-4">{translation.name}</h1>

      {/* description */}
      <p className="leading-8 text-gray-700 mb-8">{translation.description}</p>

      {/* building info */}
      <div className="bg-gray-50 rounded-xl p-5 mb-8">
        <p>
          <strong>Location:</strong> {building.location ?? "-"}
        </p>

        <p>
          <strong>Architect:</strong> {building.architect ?? "-"}
        </p>

        <p>
          <strong>Built Year:</strong> {building.builtYear ?? "-"}
        </p>
      </div>

      {/* tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {building.tags.map((tag) => (
          <span
            key={tag.id}
            className="px-3 py-1 bg-blue-100 rounded-full text-sm"
          >
            {tag.name}
          </span>
        ))}
      </div>

      {/* images */}
      <div className="grid md:grid-cols-3 gap-4">
        {building.images.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-xl shadow">
            <img
              src={image.url}
              alt={image.caption ?? ""}
              className="w-full h-64 object-cover"
            />

            {image.caption && (
              <div className="p-2 text-sm text-gray-600">{image.caption}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
