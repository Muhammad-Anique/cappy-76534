import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onJoinWaitlist: () => void;
}

export default function Hero({ onJoinWaitlist }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cappy-black via-cappy-dark to-cappy-gray" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cappy-accent/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cappy-purple/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cappy-cyan/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-cappy-accent" />
          <span className="text-sm text-gray-300">Coming Soon</span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 animate-slide-up">
          CAPPY<span className="text-cappy-accent">.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-medium mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Streetwear Redefined
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Bold designs for the fearless generation. Be the first to experience 
          the future of street fashion.
        </p>

        {/* CTA Button */}
        <button
          onClick={onJoinWaitlist}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-cappy-black font-bold text-lg rounded-full 
                     hover:bg-cappy-accent hover:text-white transition-all duration-300 transform hover:scale-105
                     animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          Join Waitlist
          <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </button>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">2K+</div>
            <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">Waitlist</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">50+</div>
            <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">Designs</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">24</div>
            <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">Days Left</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-gray-500" />
      </div>
    </section>
  );
}