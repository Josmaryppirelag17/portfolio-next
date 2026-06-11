interface SectionHeaderProps {
  labelKey?: string;
  heading: string;
  strokeColor?: string;
}

export function SectionSystemLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-2 text-brand-lime font-mono text-xs tracking-widest uppercase mb-2">
      <span>{children}</span>
    </div>
  );
}

export default function SectionHeader({
  labelKey,
  heading,
  strokeColor = "#FD1EB1",
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col mb-16">
      {labelKey && <SectionSystemLabel>{labelKey}</SectionSystemLabel>}
      <h2
        className="text-5xl sm:text-6xl tracking-tight uppercase italic text-transparent font-bold select-none text-left"
        style={{
          fontFamily: '"Arial Black", "Syne", sans-serif',
          WebkitTextStroke: `2px ${strokeColor}`,
        }}
      >
        {heading}
      </h2>
      <div className="h-1.5 w-32 bg-brand-cyan mt-3" />
    </div>
  );
}
