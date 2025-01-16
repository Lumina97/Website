"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectComponent from "./ProjectComponent";
import ProjectInfoModal from "./ProjectInfoModal";
import { ProjectsData } from "@/app/Data/ProjectData";
import { TProject } from "@/types";

const Projects = () => {
  const { t } = useTranslation("main");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);

  const handleProjectClick = (project: TProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black from-30% to-zinc-900 to-100% w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          {t("projectsHeader")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ProjectsData.map((project, index) => (
            <ProjectComponent
              key={project.title + index}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      )}
    </section>
  );
};

export default Projects;
