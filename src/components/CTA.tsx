import Icon from "@mdi/react";

interface CTA {
    icon: string;
    ctaQuestion: string;
}

export default function CTA({ icon, ctaQuestion }: CTA) {
    return (
        <div className="flex justify-center">
            <div className="relative bg-gray-800/30 border border-yellow-300/90 rounded-2xl p-10 flex flex-col justify-center text-center hover:border-yellow-300/60 transition-all duration-300 max-w-md backdrop-blur-sm">
                {/* Icon with enhanced styling */}
                <div className="relative mb-8 flex justify-center">
                    <div className="bg-yellow-300/10 p-4 rounded-full">
                        <Icon path={icon} size={2.5} className="text-yellow-300" />
                    </div>
                </div>
                
                {/* Enhanced text hierarchy */}
                <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{ctaQuestion}</h3>
                <div className="mb-8">
                    <p className="text-xl font-medium text-yellow-300 mb-2">Your first 20 minutes</p>
                    <p className="text-lg text-gray-200 font-light">is completely free</p>
                </div>
                
                {/* Enhanced button */}
                <a href='/book'>
                    <button className="bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-bold px-10 py-4 rounded-xl transition-all duration-300 w-full shadow-lg text-lg">
                        Book Your Free Trial
                    </button>
                </a>
                
                {/* Subtle bottom accent */}
                <p className="text-xs text-gray-200 mt-4">No commitment required</p>
            </div>
        </div>
    )
}