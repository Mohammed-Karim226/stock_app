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
        <div className="mb-6 relative">
          <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-2">
            {title}
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent rounded-full" />
        </div>
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
