import { TImageItem } from "@/types";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";

export const ImageCard = ({
  imageItem,
  onImageClick,
  onSelectClick,
}: {
  imageItem: TImageItem;
  onImageClick: (url: string) => void;
  onSelectClick: (image: TImageItem) => void;
}) => {
  const select = () => {
    imageItem.isSelected = !imageItem.isSelected;
    setImage(imageItem);
    setIsSelected(imageItem.isSelected);
    onSelectClick(image);
  };

  const [image, setImage] = useState<TImageItem>(imageItem);
  const [isSelected, setIsSelected] = useState<boolean>(imageItem.isSelected);

  return (
    <div className="relative bg-zinc-900 rounded-xl h-44 overflow-hidden border border-zinc-800 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px] hover:shadow-orange-500/50 cursor-pointer">
      <div className=" aspect-square flex justify-center items-center rounded-b-xl  ">
        <Image
          src={image.url.preview}
          alt="Image"
          fill
          className="object-cover rounded-b-xl "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onClick={() => onImageClick(image.url.main)}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-sm p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {image.size.width}x{image.size.height}
          </span>
          <div className="flex gap-3">
            <button
              className="text-gray-400 hover:text-orange-500 transition-colors"
              aria-label="Select image"
              onClick={select}
            >
              <FontAwesomeIcon icon={isSelected ? faSquareCheck : faSquare} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
