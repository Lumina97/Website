"use client";

import { TProject } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

const ProjectComponent = ({
  project,
  children,
  onClick,
}: {
  project: TProject;
  children?: ReactNode;
  onClick: () => void;
}) => {
  const { t } = useTranslation("main");
  const languageBase = `projects.${project.title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")}.`;

  const gitHubClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!project.githubPath) return;
    event.stopPropagation();
    window.open(project.githubPath, "_blank");
  };

  return (
    <div
      onClick={onClick}
      className="bg-zinc-900 rounded-xl overflow-hidden transition-all duration-300 flex flex-col
            hover:scale-[1.02] hover:shadow-[0_0_30px_-5px] hover:shadow-orange-500/50"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          alt={project.title}
          src={project.imagePath}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6 flex-grow flex flex-col justify-between   ">
        <div>
          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            {t([languageBase + "title"])}
          </h2>
          <p className="text-gray-300 mb-4 min-h-[60px]">
            {t([languageBase + "description"])}
          </p>
        </div>

        <div className="flex flex-col justify-end">
          <div className="flex md:flex-row flex-col gap-3 mb-4">{children}</div>
          <div className="flex md:flex-row flex-col pt-4 gap-4 md:gap-0 justify-between">
            {project.githubPath && (
              <button
                onClick={(e) => gitHubClick(e)}
                className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors flex items-center gap-2 bottom-0 relative"
              >
                <Image
                  src="/images/projectImages/GitHub.svg"
                  alt="GitHub Logo"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                {t("projects.viewOnGithub")}
              </button>
            )}
            {project.redirectPath && (
              <Link
                href={project.redirectPath}
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors flex items-center gap-2 bottom-0 relative"
              >
                {t("projects.goto")}
              </Link>
            )}
            {project.externalURL && (
              <a
                href={project.externalURL}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                rel="noopener noreferrer"
                className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors flex items-center gap-2 bottom-0 relative"
              >
                {t("projects.goto")}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectComponent;
