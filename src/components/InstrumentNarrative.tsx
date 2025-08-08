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
  headline1,
  text1,
  icon1,
  headline2,
  text2,
  icon2,
  headline3,
  text3,
  icon3,
  iconSize = 2,
  iconClassName = 'text-yellow-300 mb-4',
}: NarrativeProps) {
  return (
    <section className="max-w-6xl mx-auto my-16 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 text-center hover:border-yellow-300/50 hover:bg-gray-800/50 transition-all duration-300 group">
          {icon1 && (
            <div className="flex justify-center mb-6">
              <Icon path={icon1} size={iconSize} className={iconClassName} />
            </div>
          )}
          <h2 className="text-xl font-bold text-white mb-4 leading-tight">{headline1}</h2>
          <p className="text-gray-300 leading-relaxed">{text1}</p>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 text-center hover:border-yellow-300/50 hover:bg-gray-800/50 transition-all duration-300 group">
          {icon2 && (
            <div className="flex justify-center mb-6">
              <Icon path={icon2} size={iconSize} className={iconClassName} />
            </div>
          )}
          <h3 className="text-xl font-bold text-white mb-4 leading-tight">{headline2}</h3>
          <p className="text-gray-300 leading-relaxed">{text2}</p>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 text-center hover:border-yellow-300/50 hover:bg-gray-800/50 transition-all duration-300 group">
          {icon3 && (
            <div className="flex justify-center mb-6">
              <Icon path={icon3} size={iconSize} className={iconClassName} />
            </div>
          )}
          <h3 className="text-xl font-bold text-white mb-4 leading-tight">{headline3}</h3>
          <p className="text-gray-300 leading-relaxed">{text3}</p>
        </div>
      </div>
    </section>
  );
}
