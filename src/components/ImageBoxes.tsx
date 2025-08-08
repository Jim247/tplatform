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
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ${className}`}>
      {boxes.map((box, index) => (
        <div
          key={index}
          className="bg-gray-800/30 border border-gray-700/50 rounded-xl hover:border-yellow-300/50 transition-all duration-300 hover:bg-gray-800/50 overflow-hidden group"
        >
          <div className="w-full aspect-square relative overflow-hidden">
            <Image
              src={box.src}
              alt={box.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-3 text-center">{box.title}</h3>
            <p className="text-gray-300 text-center leading-relaxed">{box.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageBoxes;
