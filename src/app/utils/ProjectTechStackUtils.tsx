import {
  faCss,
  faHtml5,
  faJs,
  faNodeJs,
  faReact,
  faUnity,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const getTSTechStack = () => {
  return (
    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded-full text-sm">
      <svg
        width="16"
        height="16"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image href="\images\projectImages\TS.svg" width="32" height="32" />
      </svg>
      <span>TypeScript</span>
    </div>
  );
};

export const getReactTechStack = () => {
  return (
    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded-full text-sm">
      <FontAwesomeIcon icon={faReact} />
      <span>React</span>
    </div>
  );
};

export const getNextTechStack = () => {
  return (
    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded-full text-sm">
      <svg
        width="16"
        height="16"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image href="\images\projectImages\nextjs.svg" width="32" height="32" />
      </svg>
      <span>NextJS</span>
    </div>
  );
};

export const getNodeJSTechStack = () => {
  return (
    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded-full text-sm">
      <FontAwesomeIcon icon={faNodeJs} />
      <span>NodeJS</span>
    </div>
  );
};

export const getUnityTechStack = () => {
  return (
    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded-full text-sm">
      <FontAwesomeIcon icon={faUnity} />
      <span>Unity</span>
    </div>
  );
};

export const getCSSTechStack = () => {
  return (
    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded-full text-sm">
      <FontAwesomeIcon icon={faCss} />
      <span>CSS</span>
    </div>
  );
};

export const getHTMLTechStack = () => {
  return (
    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded-full text-sm">
      <FontAwesomeIcon icon={faHtml5} />
      <span>HTML</span>
    </div>
  );
};

export const getJSTechStack = () => {
  return (
    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded-full text-sm">
      <FontAwesomeIcon icon={faJs} />
      <span>JS</span>
    </div>
  );
};
