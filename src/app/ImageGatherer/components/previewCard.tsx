import Image from "next/image";

export const PreviewCard = ({
  imageUrl,
  onClick,
}: {
  imageUrl: string;
  onClick: (url: string) => void;
}) => {
  return (
    <div
      className="z-40 fixed flex justify-center items-center h-full w-full overflow-auto"
      onClick={() => onClick("")}
    >
      <div className="relative w-11/12 md:w-3/4 lg:w-1/2 h-auto max-w-full max-h-full">
        <Image
          src={imageUrl}
          layout="responsive"
          width={100}
          height={100}
          className="object-contain"
          alt="Preview"
        />
      </div>
    </div>
  );
};
