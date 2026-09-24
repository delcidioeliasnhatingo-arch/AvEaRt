import React from 'react';
import { Target, Zap, ShieldCheck, HeartHandshake } from 'lucide-react';

export const PerformanceSection: React.FC = () => {
  const features = [
    {
      title: 'PRECISION',
      description: 'Equipment designed for accurate and responsive control.',
      icon: Target,
      spec: 'Sub-millimeter tracking with zero smoothing or latency jitter.',
    },
    {
      title: 'PERFORMANCE',
      description: 'Hardware built for demanding gaming experiences.',
      icon: Zap,
      spec: 'High-refresh QD-OLED and 8,000Hz internal processing pipelines.',
    },
    {
      title: 'COMFORT',
      description: 'Designed for long gaming sessions.',
      icon: HeartHandshake,
      spec: 'Cooling memory foam and neutral ergonomic contouring.',
    },
    {
      title: 'QUALITY',
      description: 'Carefully selected gaming equipment.',
      icon: ShieldCheck,
      spec: 'CNC billet aluminum, virgin PTFE, and 2-year full coverage.',
    },
  ];

  return (
    <section id="performance-section" className="py-20 lg:py-28 bg-white border-b border-[#E5E5E5]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase block mb-3">
            ENGINEERING PRINCIPLES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] uppercase mb-4 text-balance">
            PERFORMANCE WITHOUT COMPROMISE
          </h2>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            Discover gaming hardware designed around speed, precision, comfort and reliability.
            Stripped of synthetic ornamentation, focused purely on peak competitive execution.
          </p>
        </div>

        {/* 4 Feature Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-[#FBFBFB] p-8 border border-[#E5E5E5] flex flex-col justify-between hover:border-[#111111] hover:bg-white transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono font-bold text-neutral-400 tabular-nums">
                      0{idx + 1}
                    </span>
                    <Icon className="w-5 h-5 text-[#111111]" />
                  </div>

                  <h3 className="font-display text-lg font-bold tracking-tight text-[#111111] mb-2 uppercase">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-[#666666] leading-relaxed mb-6 font-normal">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 text-[11px] text-neutral-500 font-medium leading-normal">
                  {feature.spec}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
