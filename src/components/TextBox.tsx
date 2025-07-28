import Image from "next/image";

export default function TextBox() {
  return (
    <div className="max-w-5xl mx-auto my-10 px-4 flex flex-col md:flex-row items-center md:items-start gap-8">
      {/* Text content */}
      <div className="flex-1 text-white text-left space-y-6">
        <h2 className="text-3xl font-bold mb-2 uppercase pb-4">Music Lessons Bristol</h2>
        <p>
          We proudly offer music lessons across the greater Bristol area and nationwide through our online platform.
        </p>
        <ul className="list-disc list-inside max-w-md text-base">
          <li>A hand-picked roster of specialist tutors</li>
          <li>Guitar, piano, singing, brass, woodwind, and more</li>
          <li>Online and in-person lessons available</li>
        </ul>
        <div>
          <h3 className="text-xl font-semibold mt-4 mb-1">For All Levels</h3>
          <p>
            Beginners are warmly welcomed and supported. Advanced players benefit from tailored mentoring that can be a true game changer for their growth.
          </p>
        </div>
      </div>
      {/* Image on the right */}
      <div className="flex-shrink-0 w-full md:w-80">
        <Image
          src="/guitar-square.png"
          alt="Music lessons"
          width={320}
          height={320}
          className="rounded-lg object-cover w-full h-auto"
          priority={false}
        />
      </div>
    </div>
  );
}