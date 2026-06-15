"use client";

import { useState } from "react";

const LANGUAGES = [
  { code: "fa", label: "فارسی" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
];

const TAG_OPTIONS = [
  "تاریخی",
  "مدرن",
  "مذهبی",
  "طبیعی",
  "موزه",
  "قلعه",
  "کاخ",
  "مسجد",
  "کلیسا",
];

export default function NewBuildingPage() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");

  const [location, setLocation] = useState("");
  const [builtYear, setBuiltYear] = useState("");
  const [architect, setArchitect] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [images, setImages] = useState(["", "", ""]);
  const [videos, setVideos] = useState(["", ""]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [translations, setTranslations] = useState(
    LANGUAGES.map((lang) => ({ lang: lang.code, name: "", description: "" })),
  );

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function updateTranslation(index: number, field: string, value: string) {
    setTranslations((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  async function handleSubmit() {
    setIsPending(true);
    setMessage("");

    const res = await fetch("/api/buildings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location,
        builtYear,
        architect,
        lat,
        lng,
        images,
        videos,
        tags: selectedTags,
        translations,
      }),
    });

    if (res.ok) {
      setMessage("✅ بنا با موفقیت ثبت شد!");
    } else {
      setMessage("❌ خطا در ثبت!");
    }

    setIsPending(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">افزودن بنای جدید</h1>

      {/* اطلاعات اصلی */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">اطلاعات اصلی</h2>
        <input
          className="input"
          placeholder="لوکیشن"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="input"
          placeholder="سال ساخت"
          value={builtYear}
          onChange={(e) => setBuiltYear(e.target.value)}
        />
        <input
          className="input"
          placeholder="معمار"
          value={architect}
          onChange={(e) => setArchitect(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <input
            className="input"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </div>
      </section>

      {/* عکس‌ها */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold border-b pb-2">لینک عکس‌ها</h2>
        {images.map((url, i) => (
          <input
            key={i}
            className="input"
            placeholder={`لینک عکس ${i + 1}`}
            value={url}
            onChange={(e) => {
              const updated = [...images];
              updated[i] = e.target.value;
              setImages(updated);
            }}
          />
        ))}
        <button
          onClick={() => setImages([...images, ""])}
          className="text-blue-500 text-sm"
        >
          + افزودن عکس
        </button>
      </section>

      {/* ویدیوها */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold border-b pb-2">لینک ویدیوها</h2>
        {videos.map((url, i) => (
          <input
            key={i}
            className="input"
            placeholder={`لینک ویدیو ${i + 1}`}
            value={url}
            onChange={(e) => {
              const updated = [...videos];
              updated[i] = e.target.value;
              setVideos(updated);
            }}
          />
        ))}
        <button
          onClick={() => setVideos([...videos, ""])}
          className="text-blue-500 text-sm"
        >
          + افزودن ویدیو
        </button>
      </section>

      {/* تگ‌ها */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold border-b pb-2">تگ‌ها</h2>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full border text-sm ${
                selectedTags.includes(tag)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* ترجمه‌ها */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold border-b pb-2">ترجمه‌ها</h2>
        {LANGUAGES.map((lang, i) => (
          <div key={lang.code} className="space-y-2 p-4 border rounded-lg">
            <h3 className="font-medium">{lang.label}</h3>
            <input
              className="input"
              placeholder="نام بنا"
              value={translations[i].name}
              onChange={(e) => updateTranslation(i, "name", e.target.value)}
            />
            <textarea
              className="input"
              placeholder="توضیحات"
              rows={3}
              value={translations[i].description}
              onChange={(e) =>
                updateTranslation(i, "description", e.target.value)
              }
            />
          </div>
        ))}
      </section>

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium"
      >
        {isPending ? "در حال ثبت..." : "ثبت بنا"}
      </button>

      {message && <p className="text-center">{message}</p>}

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          padding: 8px 12px;
          border-radius: 6px;
          outline: none;
        }
        .input:focus {
          ring: 2px solid #3b82f6;
        }
      `}</style>
    </div>
  );
}
