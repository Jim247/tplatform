
import Icon from "@mdi/react";
import React from "react";
import Image from "next/image";


type SectionDividerProps = {
  icon?: string; // mdi icon path or custom SVG path
  imgSrc?: string; // image file path (e.g. /logo.svg)
  size?: number;
  color?: string;
};

export default function SectionDivider({ icon, imgSrc, size = 1.5, color = "#fde047" }: SectionDividerProps) {
  return (
    <div className="flex items-center justify-center my-20">
      <span className="border-t border-gray-200 flex-grow"></span>
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt="Section Divider Icon"
          width={size * 64}
          height={size * 64}
          className="mx-4"
          style={{ width: size + 'em', height: size + 'em' }}
          priority
        />
      ) : icon ? (
        <Icon path={icon} size={size} color={color} className="mx-4" />
      ) : null}
      <span className="border-t border-gray-200 flex-grow"></span>
    </div>
  );
}