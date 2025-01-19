"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { t } = useTranslation("main");
  const [subreddit, setSubreddit] = useState("");
  const router = useRouter();

  const handleFetch = () => {
    router.push(`/ImageGatherer/${subreddit}`);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold pb-2 mb-2 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            {t("imageGatherer.mainPage.title")}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t("imageGatherer.mainPage.description")}
          </p>
        </div>
        <div className="bg-zinc-900 rounded-2xl shadow-xl p-6 mb-8 border border-zinc-800">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                placeholder={t("imageGatherer.mainPage.search")}
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-100 placeholder-gray-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-colors shadow-lg hover:shadow-orange-600/25"
                onClick={handleFetch}
              >
                {t("imageGatherer.mainPage.searchButton")}
              </button>
              <Link
                href="/"
                className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium transition-colors text-center shadow-lg border border-zinc-700"
              >
                {t("imageGatherer.mainPage.returnButton")}
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-800">
            <h2 className="text-xl font-semibold mb-3 text-orange-500">
              {t("imageGatherer.mainPage.howitworksTitle")}
            </h2>
            <p className="text-gray-400">
              {t("imageGatherer.mainPage.howitworksDescription")}
            </p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-800">
            <h2 className="text-xl font-semibold mb-3 text-orange-500">
              {t("imageGatherer.mainPage.featuresTitle")}
            </h2>
            <ul className="text-gray-400 space-y-2">
              <li>{t("imageGatherer.mainPage.features.1")} </li>
              <li>{t("imageGatherer.mainPage.features.2")}</li>
              <li>{t("imageGatherer.mainPage.features.3")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
