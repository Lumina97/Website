import { EProjectTechStack, TProject } from "@/types";
export const projectImagePath = "/images/projectImages/";

export const ProjectsData: TProject[] = [
  {
    imagePath: projectImagePath + "SpaceTrace2.png",
    title: "Space Trace",
    description: "",
    fullDescription: "",
    githubPath: "https://github.com/Lumina97/Space-Trace",
    redirectPath: "/SpaceTrace",
    techStack: [EProjectTechStack.UNITY],
  },
  {
    imagePath: projectImagePath + "ImageGatherer.png",
    title: "Image Gatherer",
    githubPath: "https://github.com/Lumina97/WebsiteBackend",
    redirectPath: "/ImageGatherer",
    techStack: [
      EProjectTechStack.NODEJS,
      EProjectTechStack.TS,
      EProjectTechStack.NEXTJS,
    ],
  },
  {
    imagePath: projectImagePath + "NoteMaster.png",
    title: "Note Master",
    githubPath: "https://github.com/Lumina97/NoteMaster",
    techStack: [EProjectTechStack.TS],
  },
  {
    imagePath: projectImagePath + "Gw2_taskmaster.png",
    title: "Tyria Tracker",
    githubPath: "https://github.com/Lumina97/TyriaTracker",
    externalURL: "https://tyria-tracker.vercel.app",
    techStack: [
      EProjectTechStack.REACT,
      EProjectTechStack.NODEJS,
      EProjectTechStack.TS,
    ],
  },
  {
    imagePath: projectImagePath + "Hannula.PNG",
    title: "Hannulawells",
    techStack: [
      EProjectTechStack.CSS,
      EProjectTechStack.HTML,
      EProjectTechStack.JS,
    ],
  },
];
