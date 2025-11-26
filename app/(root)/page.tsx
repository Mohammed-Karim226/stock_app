import TradingViewWidget from "@/components/widgets/TradingViewWidget";
import {
  MARKET_OVERVIEW_WIDGET_CONFIG,
  HEATMAP_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
} from "@/lib/constants";

const HomePage = () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  return (
    <div className="min-h-screen w-full bg-[#0b0e14] home-wrapper relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="abs-light bg-[#4f46e5]" />
        <div className="abs-light bg-[#06b6d4] left-auto right-10 top-40" />
        <div className="abs-light bg-[#22c55e] bottom-0 left-1/2" />
      </div>

      <div className="relative z-10 p-6 md:p-10 grid gap-10">
        <section className="grid w-full gap-10 md:grid-cols-1 xl:grid-cols-3 home-section">
          <div className="neo-card">
            <TradingViewWidget
              title="Market Overview"
              scriptUrl={`${scriptUrl}market-overview.js`}
              config={MARKET_OVERVIEW_WIDGET_CONFIG}
              className="custom-chart"
              height={600}
            />
          </div>

          <div className="xl:col-span-2 neo-card">
            <TradingViewWidget
              title="Stock Heat Map"
              scriptUrl={`${scriptUrl}stock-heatmap.js`}
              config={HEATMAP_WIDGET_CONFIG}
              className="custom-chart"
              height={600}
            />
          </div>
        </section>

        <section className="grid w-full gap-10 md:grid-cols-1 xl:grid-cols-3 home-section">
          <div className="neo-card">
            <TradingViewWidget
              title="Top Stories"
              scriptUrl={`${scriptUrl}timeline.js`}
              config={TOP_STORIES_WIDGET_CONFIG}
              className="custom-chart"
              height={600}
            />
          </div>

          <div className="xl:col-span-2 neo-card">
            <TradingViewWidget
              title="Market Quotes"
              scriptUrl={`${scriptUrl}market-quotes.js`}
              config={MARKET_DATA_WIDGET_CONFIG}
              className="custom-chart"
              height={600}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
