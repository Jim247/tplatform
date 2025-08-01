import Image from 'next/image';

export interface ImageBoxProps {
  title: string;
  description: string;
  src: string;
}

export interface ImageBoxesProps {
  boxes: ImageBoxProps[];
  className?: string;
}

const ImageBoxes: React.FC<ImageBoxesProps> = ({ boxes, className = '' }) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 justify-center ${className}`}
    >
      {boxes.map((box, index) => (
        <div
          key={index}
          className="bg-grey border border-white rounded-lg hover:scale-105 duration-200 flex flex-col items-center p-4"
        >
          <div className="w-full aspect-square mb-3 relative">
            <Image
              src={box.src}
              alt={box.title}
              fill
              className="rounded-md object-cover"
              sizes="(max-width: 640px) 100vw, 288px"
            />
          </div>
          <h3 className="pb-4 font-bold text-white uppercase text-lg mb-1 text-center">
            {box.title}
          </h3>
          <p className="text-white font-medium text-center">{box.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageBoxes;
