const SkeletonLoaderImageCards = () => {
  return (
    <div className="space-y-4">
      <div className="relative bg-zinc-900 rounded-xl h-44 overflow-hidden border border-zinc-800">
        <div className=" aspect-square flex justify-center items-center animate-pulse bg-zinc-800 rounded-sm "></div>
        <div className="absolute bottom-0 left-0 right-0 bg-zinc-900/90  p-3">
          <div className="flex items-center justify-between bg-zinc-800 rounded-md h-6 pr-2">
            <div className="ml-2 bg-zinc-700 animate-pulse h-[4px] w-48"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoaderImageCards;
