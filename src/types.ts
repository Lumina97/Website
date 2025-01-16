export type TImageSize = {
  width: number;
  height: number;
};

export type TImageLink = {
  preview: string;
  main: string;
};

export type TImageItem = {
  url: TImageLink;
  size: TImageSize;
  isSelected: boolean;
};

type TResolution = {
  url: string;
  width: number;
  height: number;
};

type TImage = {
  source: TResolution;
  resolutions: TResolution[];
};

type TData = {
  url: string;
  preview: {
    images: TImage[];
  };
};

export type TRedditPost = {
  kind: string;
  data: TData;
};

export type TProject = {
  imagePath: string;
  title: string;
  description?: string;
  fullDescription?: string;
  githubPath?: string;
  redirectPath?: string;
  externalURL?: string;
  techStack: EProjectTechStack[];
};

export enum EProjectTechStack {
  HTML,
  CSS,
  JS,
  TS,
  REACT,
  NODEJS,
  UNITY,
  NEXTJS,
}
