"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { TProject } from "@/types";
import { useTranslation } from "react-i18next";

interface ProjectInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: TProject;
}

const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const { t } = useTranslation("main");
  const languageBase = `projects.${project.title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")}.`;

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-zinc-900 rounded-lg p-6 max-w-xl max-h-full w-full md:mx-4 m-4 relative border border-zinc-700 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-200">
            {t([languageBase + "title"])}
          </h2>

          <div className="max-w-md mx-auto">
            <div className="aspect-video relative">
              <Image
                src={project.imagePath}
                alt={project.title}
                className="rounded-lg object-cover"
                width={400}
                height={225}
                quality={95}
              />
            </div>
          </div>

          <p className="text-zinc-400 leading-relaxed">
            {t([languageBase + "fullDescription"])}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoModal;
