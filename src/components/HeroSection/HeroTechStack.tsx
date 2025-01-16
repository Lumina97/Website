import {
  faCss3,
  faHtml5,
  faJs,
  faNodeJs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import TechStackElement from "./TechStackElement";

const HeroTechStack = () => {
  return (
    <div className="mt-9 w-full flex flex-col justify-center gap-4 align-middle">
      <h2 className="text-4xl text-center">Tech stack</h2>
      <div className="flex justify-center flex-wrap md:flex-nowrap gap-4">
        <TechStackElement icon={faReact} name="React" />
        <TechStackElement icon={faHtml5} name="HTML" />
        <TechStackElement icon={faNodeJs} name="NodeJS" />
        <TechStackElement icon={faCss3} name="CSS" />
        <TechStackElement icon={faJs} name="JS" />
      </div>
    </div>
  );
};

export default HeroTechStack;
