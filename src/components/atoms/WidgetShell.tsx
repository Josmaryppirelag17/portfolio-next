import type { LucideIcon } from "lucide-react";

interface WidgetShellProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  status: string;
  children: React.ReactNode;
}

export default function WidgetShell({
  title,
  icon: Icon,
  iconColor,
  status,
  children,
}: WidgetShellProps) {
  return (
    <div className="p-4 bg-brand-bg/95 border border-brand-pale/10 rounded-xl flex flex-col justify-between h-48 select-none relative overflow-hidden">
      <div className="flex items-center justify-between mb-1.5 z-10">
        <span className="flex items-center space-x-1 font-mono text-[9px] text-[#DCF10B] uppercase tracking-widest">
          <Icon size={12} className={iconColor ?? "text-brand-lime animate-pulse"} />
          <span>{title}</span>
        </span>
        <span className="font-mono text-[8px] text-brand-lime/50 uppercase">{status}</span>
      </div>
      {children}
    </div>
  );
}
