"use client";

import { useState, useTransition, memo } from "react";
import { useRouter } from "next/navigation";
import { upsertTour, TourInput } from "../../actions";
import { uploadImageAction, deleteImageAction } from "../../upload";

import {
  ArrowLeft,
  Save,
  Compass,
  List,
  Eye,
  CheckSquare,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Optimized, memoized banner image preview to prevent render lag
const BannerPreview = memo(({ image }: { image: string }) => {
  if (!image) {
    return (
      <div className="text-center text-gray-400 space-y-2">
        <EyeOff size={32} className="mx-auto text-gray-300" />
        <span className="text-xs font-semibold uppercase tracking-wider block">
          No banner image uploaded yet
        </span>
      </div>
    );
  }

  return (
    <>
      <img
        src={image}
        alt="Banner Preview"
        loading="lazy"
        className="object-cover w-full h-full transition-opacity duration-300"
        onError={(e) => {
          (e.target as HTMLElement).style.display = "none";
        }}
      />
      <div className="absolute top-2 right-2 bg-black/75 px-2.5 py-1 text-[9px] font-bold text-white uppercase tracking-wider rounded-sm flex items-center gap-1">
        <Eye size={10} /> Preview Banner
      </div>
    </>
  );
});
BannerPreview.displayName = "BannerPreview";

// Optimized, memoized gallery grid to prevent main thread rendering lag when typing in form inputs
const GalleryGrid = memo(({ gallery, onRemove }: { gallery: string[]; onRemove: (index: number) => void }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
      {gallery.map((path, index) => (
        <div
          key={path + index}
          className="group bg-gray-50 border rounded-sm relative aspect-[4/3] overflow-hidden"
        >
          <img
            src={path}
            alt=""
            loading="lazy"
            className="object-cover w-full h-full transition-opacity duration-300"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute inset-0 bg-red-950/80 text-white flex items-center justify-center text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            Delete
          </button>
        </div>
      ))}

      {gallery.length === 0 && (
        <p className="text-xs text-gray-400 italic col-span-full">
          No slideshow gallery images uploaded yet.
        </p>
      )}
    </div>
  );
});
GalleryGrid.displayName = "GalleryGrid";

type TourFormProps = {
  initialData?: TourInput;
};

export default function TourForm({ initialData }: TourFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"core" | "content" | "itinerary" | "logistics" | "media">("core");
  const [error, setError] = useState<string | null>(null);

  // --- Form State ---
  const [id, setId] = useState(initialData?.id || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [maxPhotographers, setMaxPhotographers] = useState(initialData?.maxPhotographers || 4);
  const [availableSlots, setAvailableSlots] = useState(initialData?.availableSlots || 4);
  const [date, setDate] = useState(initialData?.date || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [price, setPrice] = useState(initialData?.price || "£3,200 per person");
  const [duration, setDuration] = useState(initialData?.duration || "10 Days | 9 Nights");
  const [overview, setOverview] = useState(initialData?.overview || "");
  const [nonRefundableDeposit, setNonRefundableDeposit] = useState(initialData?.nonRefundableDeposit || 500);
  const [image, setImage] = useState(initialData?.image || "");

  // Focus Species Tags State
  const [focusSpecies, setFocusSpecies] = useState<string[]>(initialData?.focusSpecies || []);
  const [speciesInput, setSpeciesInput] = useState("");

  // Inclusions, Exclusions, Equipment Dynamic List State
  const [included, setIncluded] = useState<string[]>(initialData?.included || []);
  const [includedInput, setIncludedInput] = useState("");

  const [notIncluded, setNotIncluded] = useState<string[]>(initialData?.notIncluded || []);
  const [notIncludedInput, setNotIncludedInput] = useState("");

  const [equipment, setEquipment] = useState<string[]>(initialData?.equipment || []);
  const [equipmentInput, setEquipmentInput] = useState("");

  // Gallery Paths List State
  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);
  const [galleryInput, setGalleryInput] = useState("");

  // Itinerary Planner Array State
  type ItineraryItem = { day: string; title: string; description: string };
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(
    initialData?.itinerary || [{ day: "Day 1", title: "", description: "" }]
  );

  // --- Upload State & Handlers ---
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [isDragActiveBanner, setIsDragActiveBanner] = useState(false);
  const [isDragActiveGallery, setIsDragActiveGallery] = useState(false);

  const handleDragBanner = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActiveBanner(true);
    } else if (e.type === "dragleave") {
      setIsDragActiveBanner(false);
    }
  };

  const handleDropBanner = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActiveBanner(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await uploadBannerFile(file);
    }
  };

  const uploadBannerFile = async (file: File) => {
    setIsUploadingBanner(true);
    setError(null);

    const oldImage = image;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadImageAction(formData);
      if (res.success && res.url) {
        setImage(res.url);
        if (oldImage) {
          await deleteImageAction(oldImage);
        }
      } else {
        setError(res.error || "Failed to upload banner image.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred during cover banner upload.");
    } finally {
      setIsUploadingBanner(false);
    }
  };

  const handleDragGallery = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActiveGallery(true);
    } else if (e.type === "dragleave") {
      setIsDragActiveGallery(false);
    }
  };

  const handleDropGallery = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActiveGallery(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    setIsUploadingGallery(true);
    setError(null);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await uploadImageAction(formData);
        if (res.success && res.url) {
          setGallery((prev) => [...prev, res.url]);
        } else {
          setError(res.error || `Failed to upload ${file.name}`);
        }
      } catch (err) {
        console.error(err);
        setError(`An unexpected error occurred during upload for ${file.name}`);
      }
    }
    setIsUploadingGallery(false);
  };

  // --- Slug Auto Generation ---
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData) {
      // Auto-generate slug and ID from title if creating a brand new tour
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
      setId(`${generatedSlug}-${new Date().getFullYear()}`);
    }
  };

  // --- Dynamic Array Actions ---
  const addSpecies = (e: React.FormEvent) => {
    e.preventDefault();
    if (speciesInput.trim() && !focusSpecies.includes(speciesInput.trim())) {
      setFocusSpecies([...focusSpecies, speciesInput.trim()]);
      setSpeciesInput("");
    }
  };

  const removeSpecies = (index: number) => {
    setFocusSpecies(focusSpecies.filter((_, i) => i !== index));
  };

  const addIncluded = (e: React.FormEvent) => {
    e.preventDefault();
    if (includedInput.trim()) {
      setIncluded([...included, includedInput.trim()]);
      setIncludedInput("");
    }
  };

  const removeIncluded = (index: number) => {
    setIncluded(included.filter((_, i) => i !== index));
  };

  const addNotIncluded = (e: React.FormEvent) => {
    e.preventDefault();
    if (notIncludedInput.trim()) {
      setNotIncluded([...notIncluded, notIncludedInput.trim()]);
      setNotIncludedInput("");
    }
  };

  const removeNotIncluded = (index: number) => {
    setNotIncluded(notIncluded.filter((_, i) => i !== index));
  };

  const addEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (equipmentInput.trim()) {
      setEquipment([...equipment, equipmentInput.trim()]);
      setEquipmentInput("");
    }
  };

  const removeEquipment = (index: number) => {
    setEquipment(equipment.filter((_, i) => i !== index));
  };

  const addGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (galleryInput.trim() && !gallery.includes(galleryInput.trim())) {
      setGallery([...gallery, galleryInput.trim()]);
      setGalleryInput("");
    }
  };

  const removeGalleryImage = (index: number) => {
    const targetUrl = gallery[index];
    setGallery(gallery.filter((_, i) => i !== index));
    if (targetUrl) {
      deleteImageAction(targetUrl).catch((err) => {
        console.error("Failed to delete gallery image from R2:", err);
      });
    }
  };

  // --- Itinerary Control Actions ---
  const addItineraryDay = () => {
    const nextDayNum = itinerary.length + 1;
    setItinerary([
      ...itinerary,
      { day: `Day ${nextDayNum}`, title: "", description: "" },
    ]);
  };

  const removeItineraryDay = (index: number) => {
    if (itinerary.length === 1) return; // Keep at least one
    const updated = itinerary.filter((_, i) => i !== index).map((item, idx) => ({
      ...item,
      day: `Day ${idx + 1}`, // Re-index days beautifully
    }));
    setItinerary(updated);
  };

  const updateItineraryField = (index: number, field: "title" | "description", val: string) => {
    const updated = [...itinerary];
    updated[index] = { ...updated[index], [field]: val };
    setItinerary(updated);
  };

  const moveItineraryItem = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === itinerary.length - 1) return;

    const swapWith = direction === "up" ? index - 1 : index + 1;
    const updated = [...itinerary];
    const temp = updated[index];
    updated[index] = updated[swapWith];
    updated[swapWith] = temp;

    // Correct day indices
    const finalized = updated.map((item, idx) => ({
      ...item,
      day: `Day ${idx + 1}`,
    }));

    setItinerary(finalized);
  };

  // --- Form Submit Action ---
  const handleSubmit = () => {
    setError(null);

    const payload: TourInput = {
      id,
      slug,
      title,
      maxPhotographers: Number(maxPhotographers),
      availableSlots: Number(availableSlots),
      date,
      location,
      price,
      duration,
      overview,
      focusSpecies,
      itinerary,
      included,
      notIncluded,
      equipment,
      image,
      gallery,
      nonRefundableDeposit: Number(nonRefundableDeposit),
    };

    startTransition(async () => {
      const res = await upsertTour(payload);
      if (res.success) {
        router.push("/admin/tours");
        router.refresh();
      } else {
        setError(res.error || "An error occurred while saving the tour.");
      }
    });
  };

  return (
    <div className="space-y-8 font-sans max-w-4xl">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/tours"
            className="p-2 border border-gray-200 bg-white hover:bg-gray-100 rounded-sm text-gray-500 transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-semibold text-gray-900 leading-tight">
              {initialData ? `Edit "${title}"` : "Create Expedition"}
            </h1>
            <p className="text-sm text-gray-500">
              Configure parameters, write itineraries, and list requirements.
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-4 bg-[#1E2E22] hover:bg-[#2C3E2E] active:bg-[#1E2E22] text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          {isPending ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={16} /> Save Expedition
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded-sm">
          {error}
        </div>
      )}

      {/* Tabs list menu */}
      <div className="flex border-b border-gray-200 bg-white px-2 pt-2 gap-2 shadow-sm rounded-t-sm">
        <button
          onClick={() => setActiveTab("core")}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "core"
              ? "border-[#1E2E22] text-[#1E2E22]"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          1. Core Details
        </button>
        <button
          onClick={() => setActiveTab("content")}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "content"
              ? "border-[#1E2E22] text-[#1E2E22]"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          2. Overview & Species
        </button>
        <button
          onClick={() => setActiveTab("itinerary")}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "itinerary"
              ? "border-[#1E2E22] text-[#1E2E22]"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          3. Itinerary Planner
        </button>
        <button
          onClick={() => setActiveTab("logistics")}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "logistics"
              ? "border-[#1E2E22] text-[#1E2E22]"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          4. Logistics
        </button>
        <button
          onClick={() => setActiveTab("media")}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "media"
              ? "border-[#1E2E22] text-[#1E2E22]"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          5. Media Assets
        </button>
      </div>

      {/* Tabs display content */}
      <div className="bg-white border border-gray-100 border-t-0 p-8 shadow-sm rounded-b-sm min-h-[400px]">
        {/* TAB 1: CORE */}
        {activeTab === "core" && (
          <div className="space-y-6">
            <h3 className="text-base font-bold uppercase tracking-wider text-gray-400 border-b pb-2 mb-4">
              Core Technical Variables
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Expedition Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Costa Rica Wildlife Expedition"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Unique Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. costa-rica-wildlife"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                  disabled={!!initialData} // Lock slug modification on edit pages
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Unique Identifier ID
                </label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="e.g. costa-rica-2027"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                  disabled={!!initialData}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Location Name
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Costa Rica"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Date Range
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. 15–20 February 2027"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Duration Text
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 6 Days | 5 Nights"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Investment Cost Label
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. £1,750 per person"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Non-Refundable Deposit Amount (£)
                </label>
                <input
                  type="number"
                  value={nonRefundableDeposit}
                  onChange={(e) => setNonRefundableDeposit(Number(e.target.value))}
                  placeholder="500"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Max Photographers (Group Size Limit)
                </label>
                <input
                  type="number"
                  value={maxPhotographers}
                  onChange={(e) => {
                    setMaxPhotographers(Number(e.target.value));
                    if (!initialData) setAvailableSlots(Number(e.target.value));
                  }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Available Slots Left
                </label>
                <input
                  type="number"
                  value={availableSlots}
                  onChange={(e) => setAvailableSlots(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OVERVIEW & SPECIES */}
        {activeTab === "content" && (
          <div className="space-y-8">
            {/* Overview */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Expedition Description Overview
                </label>
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  Markdown tags supported
                </span>
              </div>
              <textarea
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder="Describe the wildlife workshop encounters, terrain, and photographic guidance..."
                rows={8}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800 font-sans leading-relaxed"
              />
            </div>

            {/* Species tags input */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Focus Wildlife Species
              </label>

              <form onSubmit={addSpecies} className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={speciesInput}
                  onChange={(e) => setSpeciesInput(e.target.value)}
                  placeholder="e.g. Golden Eagle"
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 rounded text-xs font-bold uppercase tracking-wider text-gray-600 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={14} /> Add
                </button>
              </form>

              {/* Tag box container */}
              <div className="flex flex-wrap gap-2 pt-2">
                {focusSpecies.map((species, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 bg-[#F4F4F0] border border-gray-200 text-gray-800 text-xs px-3 py-1.5 rounded-sm"
                  >
                    <span>{species}</span>
                    <button
                      type="button"
                      onClick={() => removeSpecies(index)}
                      className="text-gray-400 hover:text-red-500 cursor-pointer font-bold ml-1"
                    >
                      &times;
                    </button>
                  </span>
                ))}

                {focusSpecies.length === 0 && (
                  <p className="text-xs text-gray-400 italic">
                    No species tags listed yet. Type one above and click add.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ITINERARY PLANNER */}
        {activeTab === "itinerary" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-gray-400">
                Itinerary Planner Scheduling
              </h3>
              <button
                type="button"
                onClick={addItineraryDay}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-[#1E2E22] transition-colors cursor-pointer"
              >
                <Plus size={14} /> Add Itinerary Day
              </button>
            </div>

            {/* List container */}
            <div className="space-y-4">
              {itinerary.map((item, index) => (
                <div
                  key={index}
                  className="p-5 border border-gray-200 bg-gray-50 rounded-sm space-y-4 relative flex flex-col md:flex-row gap-4 items-start"
                >
                  {/* Row indices and reordering actions */}
                  <div className="flex md:flex-col items-center gap-2 w-full md:w-auto self-stretch justify-between md:justify-center border-b md:border-b-0 pb-2 md:pb-0">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block bg-gray-200 px-3 py-1.5 rounded-sm">
                      {item.day}
                    </span>
                    <div className="flex md:flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => moveItineraryItem(index, "up")}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-800 disabled:opacity-20 cursor-pointer"
                        title="Move Day Up"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveItineraryItem(index, "down")}
                        disabled={index === itinerary.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-800 disabled:opacity-20 cursor-pointer"
                        title="Move Day Down"
                      >
                        <ArrowDown size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Core form values inside item */}
                  <div className="flex-1 space-y-3 w-full">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        updateItineraryField(index, "title", e.target.value)
                      }
                      placeholder="Itinerary Title (e.g. Arrival & Evening Briefing)"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800 font-semibold"
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) =>
                        updateItineraryField(index, "description", e.target.value)
                      }
                      placeholder="Detailed scheduling activities, terrain expectations, goals..."
                      rows={3}
                      className="w-full p-4 bg-white border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-700 leading-relaxed"
                    />
                  </div>

                  {/* Delete day item button */}
                  <button
                    type="button"
                    onClick={() => removeItineraryDay(index)}
                    disabled={itinerary.length === 1}
                    className="p-2 border border-transparent hover:border-red-100 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-sm transition-colors cursor-pointer self-start disabled:opacity-20"
                    title="Remove Day"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LOGISTICS LISTS */}
        {activeTab === "logistics" && (
          <div className="grid grid-cols-1 gap-10">
            {/* 1. What's Included */}
            <div className="space-y-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-gray-400 border-b pb-2 mb-2">
                What&apos;s Included In Price
              </h3>
              <form onSubmit={addIncluded} className="flex gap-2 max-w-lg">
                <input
                  type="text"
                  value={includedInput}
                  onChange={(e) => setIncludedInput(e.target.value)}
                  placeholder="e.g. 5 nights double accommodation"
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 rounded text-xs font-bold uppercase tracking-wider text-gray-600 cursor-pointer"
                >
                  Add
                </button>
              </form>

              <ul className="space-y-2 bg-gray-50 p-4 border border-gray-100 rounded-sm">
                {included.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm text-gray-700"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                      {item}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeIncluded(index)}
                      className="text-gray-400 hover:text-red-500 font-bold ml-2 cursor-pointer"
                    >
                      &times;
                    </button>
                  </li>
                ))}
                {included.length === 0 && (
                  <p className="text-xs text-gray-400 italic">No items listed.</p>
                )}
              </ul>
            </div>

            {/* 2. Not Included */}
            <div className="space-y-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-gray-400 border-b pb-2 mb-2">
                What&apos;s NOT Included In Price
              </h3>
              <form onSubmit={addNotIncluded} className="flex gap-2 max-w-lg">
                <input
                  type="text"
                  value={notIncludedInput}
                  onChange={(e) => setNotIncludedInput(e.target.value)}
                  placeholder="e.g. International flights"
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 rounded text-xs font-bold uppercase tracking-wider text-gray-600 cursor-pointer"
                >
                  Add
                </button>
              </form>

              <ul className="space-y-2 bg-gray-50 p-4 border border-gray-100 rounded-sm">
                {notIncluded.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm text-gray-700"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      {item}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeNotIncluded(index)}
                      className="text-gray-400 hover:text-red-500 font-bold ml-2 cursor-pointer"
                    >
                      &times;
                    </button>
                  </li>
                ))}
                {notIncluded.length === 0 && (
                  <p className="text-xs text-gray-400 italic">No items listed.</p>
                )}
              </ul>
            </div>

            {/* 3. Equipment Profile */}
            <div className="space-y-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-gray-400 border-b pb-2 mb-2">
                Equipment & Gear Profile Requirements
              </h3>
              <form onSubmit={addEquipment} className="flex gap-2 max-w-lg">
                <input
                  type="text"
                  value={equipmentInput}
                  onChange={(e) => setEquipmentInput(e.target.value)}
                  placeholder="e.g. 300–600mm telephoto lens"
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-[#1E2E22] outline-none text-sm text-gray-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 rounded text-xs font-bold uppercase tracking-wider text-gray-600 cursor-pointer"
                >
                  Add
                </button>
              </form>

              <ul className="space-y-2 bg-gray-50 p-4 border border-gray-100 rounded-sm">
                {equipment.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm text-gray-700"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      {item}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeEquipment(index)}
                      className="text-gray-400 hover:text-red-500 font-bold ml-2 cursor-pointer"
                    >
                      &times;
                    </button>
                  </li>
                ))}
                {equipment.length === 0 && (
                  <p className="text-xs text-gray-400 italic">No items listed.</p>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: MEDIA ASSETS */}
        {activeTab === "media" && (
          <div className="space-y-8">
            <h3 className="text-base font-bold uppercase tracking-wider text-gray-400 border-b pb-2 mb-4">
              Cover and Gallery Image Assets
            </h3>

            {/* 1. Cover Banner Upload & Drag-and-Drop */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Expedition Cover Banner
              </label>
              
              <div 
                onDragEnter={handleDragBanner}
                onDragOver={handleDragBanner}
                onDragLeave={handleDragBanner}
                onDrop={handleDropBanner}
                className={`relative w-full h-80 rounded-sm overflow-hidden border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                  image 
                    ? "border-gray-200" 
                    : isDragActiveBanner 
                      ? "border-[#1E2E22] bg-[#1E2E22]/5" 
                      : "border-dashed border-gray-300 bg-[#F4F4F0] hover:bg-white hover:border-[#1E2E22]"
                }`}
              >
                {image ? (
                  <div className="group relative w-full h-full">
                    <img
                      src={image}
                      alt="Cover Preview"
                      loading="lazy"
                      className="object-cover w-full h-full transition-opacity duration-300"
                    />
                    {/* Hover state */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
                      <span className="text-xs font-bold uppercase tracking-wider">Change Cover Image</span>
                      <span className="text-[10px] text-gray-300">Drag and drop a new file or click here to browse</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 space-y-3">
                    {isUploadingBanner ? (
                      <div className="space-y-2">
                        <div className="w-8 h-8 border-2 border-gray-300 border-t-[#1E2E22] rounded-full animate-spin mx-auto" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">Uploading cover banner...</span>
                      </div>
                    ) : (
                      <>
                        <Compass className="w-8 h-8 text-gray-400 mx-auto stroke-[1.2]" />
                        <div className="space-y-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-800 block">
                            Drag and Drop Cover Banner Here
                          </span>
                          <span className="text-[10px] text-gray-400 block font-medium">
                            Supported: JPEG, PNG, WEBP, GIF (Max 10MB)
                          </span>
                        </div>
                        <span className="inline-block px-4 py-2 border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-600 rounded-sm shadow-sm">
                          Browse Files
                        </span>
                      </>
                    )}
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadBannerFile(file);
                    e.target.value = "";
                  }}
                  disabled={isUploadingBanner}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* 2. Gallery Slideshow Drag & Drop */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Slideshow Gallery
              </label>

              {/* Upload Dropzone */}
              <div
                onDragEnter={handleDragGallery}
                onDragOver={handleDragGallery}
                onDragLeave={handleDragGallery}
                onDrop={handleDropGallery}
                className={`relative w-full h-44 rounded-sm border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer ${
                  isDragActiveGallery
                    ? "border-[#1E2E22] bg-[#1E2E22]/5"
                    : "border-gray-300 bg-[#F4F4F0] hover:bg-white hover:border-[#1E2E22]"
                }`}
              >
                <div className="text-center p-6 space-y-3">
                  {isUploadingGallery ? (
                    <div className="space-y-2">
                      <div className="w-8 h-8 border-2 border-gray-300 border-t-[#1E2E22] rounded-full animate-spin mx-auto" />
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">Uploading gallery photos...</span>
                    </div>
                  ) : (
                    <>
                      <List className="w-8 h-8 text-gray-400 mx-auto stroke-[1.2]" />
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-800 block">
                          Drag and Drop Gallery Images Here
                        </span>
                        <span className="text-[10px] text-gray-400 block font-medium">
                          You can select and upload multiple files at once
                        </span>
                      </div>
                      <span className="inline-block px-4 py-2 border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-600 rounded-sm shadow-sm">
                        Select Photos
                      </span>
                    </>
                  )}
                </div>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length === 0) return;
                    setIsUploadingGallery(true);
                    setError(null);
                    for (const file of files) {
                      const formData = new FormData();
                      formData.append("file", file);
                      try {
                        const res = await uploadImageAction(formData);
                        if (res.success && res.url) {
                          setGallery((prev) => [...prev, res.url]);
                        } else {
                          setError(res.error || `Failed to upload ${file.name}`);
                        }
                      } catch (err) {
                        console.error(err);
                        setError(`An unexpected error occurred during upload for ${file.name}`);
                      }
                    }
                    setIsUploadingGallery(false);
                    e.target.value = "";
                  }}
                  disabled={isUploadingGallery}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {/* Grid of gallery previews */}
              <GalleryGrid gallery={gallery} onRemove={removeGalleryImage} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
