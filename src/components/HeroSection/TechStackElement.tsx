import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TechStackElement = ({ icon, name }: { icon: IconProp; name: string }) => {
  return (
    <div className="w-32 h-16 flex justify-center rounded-sm items-center flex-col border border-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:scale-110">
      <FontAwesomeIcon className="w-1/2 h-1/3" icon={icon} />
      <p>{name}</p>
    </div>
  );
};

export default TechStackElement;
