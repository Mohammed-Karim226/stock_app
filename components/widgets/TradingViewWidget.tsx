"use client";

import useTradingViewWidget from "@/hooks/UseTradingViewWidget";
import { cn } from "@/lib/utils";

interface ITradingViewWidget {
  title?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}
const TradingViewWidget = ({
  title,
  scriptUrl,
  config,
  height = 900,
  className,
}: ITradingViewWidget) => {
  const containerRef = useTradingViewWidget(
    scriptUrl,
    {
      ...config,
    },
    height
  );

  return (
    <div className={cn("w-full", className)}>
      {title && (
        <h2 className="mb-4 text-2xl font-bold text-gray-100">{title}</h2>
      )}
      <div
        ref={containerRef}
        className="tradingview-widget-container"
        style={{ height, width: "100%" }}
      />
    </div>
  );
};

export default TradingViewWidget;
