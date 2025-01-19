"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { fetchImages } from "@/app/utils/utils";
import { TImageItem } from "@/types";
import SkeletonLoaderImageCards from "@/components/SkeletonLoading/SkeletonLoaderImageCards";
import { PreviewCard } from "../components/previewCard";
import { ImageCard } from "../components/imageCard";

type TCollectionPageProps = {
  params: Promise<{ collection: string }>;
};

export default function CollectionPage({ params }: TCollectionPageProps) {
  const { t } = useTranslation("main");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [previewURL, setPreviewURL] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [images, setImages] = useState<TImageItem[]>([]);
  const [sortedImages, setSortedImages] = useState<TImageItem[]>([]);
  const [selectedImages, setSelectedImages] = useState<TImageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { collection } = use(params);

  useEffect(() => {
    const getImages = async () => {
      const images = await fetchImages(collection);
      setImages(images);
    };
    getImages();
  }, [collection]);

  useEffect(() => {
    const sorted = [...images].sort((a, b) => {
      const aSize = a.size.width * a.size.height;
      const bSize = b.size.width * b.size.height;
      return sortOrder === "asc" ? aSize - bSize : bSize - aSize;
    });
    setSortedImages(sorted);
  }, [images, sortOrder]);

  const handleOnSelectChange = (image: TImageItem) => {
    setSelectedImages((prev) => [...prev, image]);
  };

  const handleDownloadClick = async (downloadAll: boolean) => {
    setIsLoading(() => true);
    const links = downloadAll
      ? images.map((image) => image.url.main)
      : selectedImages.map((image) => image.url.main);

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ links }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();

      data.images.forEach((image: { data: string }, index: number) => {
        const a = document.createElement("a");
        a.href = image.data;
        a.download = `image_${index + 1}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    } catch (error) {
      console.error("Error sending image URLs:", error);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  const toggleModal = (url: string) => {
    let enable = true;
    if (url.length === 0) enable = false;
    setShowPreview(enable);
    setPreviewURL(url);
  };

  return (
    <div className="h-screen bg-black text-gray-100 flex items-center">
      {showPreview && (
        <PreviewCard imageUrl={previewURL} onClick={toggleModal} />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-8 h-full  w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl  sm:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            {t("imageGatherer.collection.title")}
          </h1>
          <Link
            href="/ImageGatherer"
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-900 rounded-xl transition-colors border border-orange-500 active:scale-90"
          >
            {t("imageGatherer.collection.backButton")}
          </Link>
        </div>
        <div className="flex  sm:flex-row-reverse flex-col justify-between">
          <div className="flex sm:flex-row flex-col   gap-4 mb-4">
            <div className="text-red-600 pl-6">
              Downloading currently does not work - We&apos;re working on a fix,
              sorry for the inconvenience
            </div>
            {isLoading && (
              <div className="loader border-t-transparent border-solid animate-spin rounded-full border-orange-500 border-4 h-6 w-6"></div>
            )}
            <button
              disabled={isLoading}
              onClick={() => {
                handleDownloadClick(true);
              }}
              className={`px-4 py-2 rounded-lg bg-zinc-800 ${
                !isLoading && "active:scale-90"
              } hover:bg-zinc-900 disabled:bg-zinc-950 disabled:text-gray-600 border-orange-500 border `}
            >
              {t("imageGatherer.collection.DownloadAll")}
            </button>
            <button
              disabled={isLoading}
              onClick={() => {
                handleDownloadClick(false);
              }}
              className={`px-4 py-2 rounded-lg bg-zinc-800 ${
                !isLoading && " active:scale-90"
              } hover:bg-zinc-900 disabled:bg-zinc-950 disabled:text-gray-600 border-orange-500 border`}
            >
              {t("imageGatherer.collection.DownloadSelected")}
            </button>
          </div>
          <div className="flex gap-4 mb-4">
            <select
              onChange={(e) => {
                setSortOrder(e.target.value as "asc" | "desc");
              }}
              className="px-4 py-2 rounded-lg sm:h-full h-[42px] w-full text-center sm:text-left   bg-zinc-800 hover:bg-zinc-900 text-gray-100 border border-orange-500"
              value={sortOrder}
            >
              <option value="asc">
                {t("imageGatherer.collection.sortAsc")}
              </option>
              <option value="desc">
                {t("imageGatherer.collection.sortDesc")}
              </option>
            </select>
          </div>
        </div>

        <div
          className="h-[80vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-2 
        bg-zinc-900 rounded-2xl p-4 border border-zinc-800
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-zinc-800
        [&::-webkit-scrollbar-thumb]:bg-gradient-to-b
        [&::-webkit-scrollbar-thumb]:from-orange-500
        [&::-webkit-scrollbar-thumb]:to-red-600
        [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {sortedImages.length > 0
            ? sortedImages.map((image) => {
                return (
                  <ImageCard
                    onImageClick={toggleModal}
                    onSelectClick={handleOnSelectChange}
                    imageItem={image}
                    key={image.url.main}
                  />
                );
              })
            : [...Array(15)].map((_, index) => (
                <SkeletonLoaderImageCards key={index} />
              ))}
        </div>
      </div>
    </div>
  );
}
