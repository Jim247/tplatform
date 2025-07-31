
import Icon from '@mdi/react';

type NarrativeProps = {
  headline1: string;
  text1: string;
  icon1?: string;
  headline2: string;
  text2: string;
  icon2?: string;
  headline3: string;
  text3: string;
  icon3?: string;
  iconSize?: number;
  iconClassName?: string;
};

export default function InstrumentNarrative({
  headline1, text1, icon1, headline2, text2, icon2, headline3, text3, icon3, iconSize = 2, iconClassName = "text-yellow-300 mb-2",
}: NarrativeProps) {
  return (
    <section className="max-w-6xl mx-auto my-12 px-4 text-center flex flex-col lg:flex-row gap-10 lg:gap-8">
      <div className="flex-1 transition-transform duration-200 hover:scale-105 bg-grey border border-gray-200 rounded-xl p-6">
        {icon1 && (
          <div className="flex justify-center mb-2">
            <Icon path={icon1} size={iconSize} className={iconClassName} />
          </div>
        )}
        <h2 className="text-xl font-bold text-yellow-300 mb-2">{headline1}</h2>
        <p className="text-white text-lg">{text1}</p>
      </div>
      <div className="flex-1 transition-transform duration-200 hover:scale-105 bg-grey border border-gray-200 rounded-xl p-6">
        {icon2 && (
          <div className="flex justify-center mb-2">
            <Icon path={icon2} size={iconSize} className={iconClassName} />
          </div>
        )}
        <h3 className="text-xl font-bold text-yellow-300 mb-2">{headline2}</h3>
        <p className="text-white text-lg">{text2}</p>
      </div>
      <div className="flex-1 transition-transform duration-200 hover:scale-105 bg-grey border border-gray-200 rounded-xl p-6">
        {icon3 && (
          <div className="flex justify-center mb-2">
            <Icon path={icon3} size={iconSize} className={iconClassName} />
          </div>
        )}
        <h3 className="text-xl font-bold text-yellow-300 mb-2">{headline3}</h3>
        <p className="text-white text-lg">{text3}</p>
      </div>
    </section>
  );
}