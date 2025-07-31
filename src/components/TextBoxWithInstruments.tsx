import TextBox, { TextBoxProps } from './TextBox';
import Instruments from './Instruments';
import React from 'react';

export interface TextBoxWithInstrumentsProps extends TextBoxProps {
  // You can add more props here if you want to customize Instruments
  instrumentsClassName?: string;
  containerClassName?: string;
}

export default function TextBoxWithInstruments({
  heading,
  intro,
  bulletPoints,
  subheading,
  subtext,
  imageSrc,
  imageAlt,
  instrumentsClassName = '',
  containerClassName = '',
}: TextBoxWithInstrumentsProps) {
  return (
    <div className={`flex flex-col w-full ${containerClassName}`}>
      <TextBox
        heading={heading}
        intro={intro}
        bulletPoints={bulletPoints}
        subheading={subheading}
        subtext={subtext}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        className="rounded-b-none border-b-0 pb-0 mb-0"
      />
      <div className={`w-full ${instrumentsClassName}`}>
        <Instruments className="rounded-t-none border-t-0 pt-0 mt-0" />
      </div>
    </div>
  );
}
