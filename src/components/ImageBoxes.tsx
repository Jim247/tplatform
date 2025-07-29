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
    <div className={`flex justify-evenly gap-2 ${className}`}>
      {boxes.map((box, index) => (
        <div key={index} className="flex flex-col items-center p-6 bg-grey border hover:scale-105 duration-200 border-white rounded-lg">
          <Image
            src={box.src}
            alt={box.title}
            width={300}
            height={300}
            className="rounded-md object-cover mb-3"
          />
          <h3 className="font-bold text-white uppercase text-lg mb-1 text-center">{box.title}</h3>
          <p className="text-white text-center text-sm">{box.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageBoxes;