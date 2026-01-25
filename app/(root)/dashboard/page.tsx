import TradingViewWidget from "@/components/widgets/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";
import { Activity, BarChart3, Newspaper, TrendingUp } from "lucide-react";

const HomePage = () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  return (
    <div className="min-h-screen w-full bg-[#0b0e14] home-wrapper relative overflow-hidden">
      {/* Animated gradient background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="abs-light bg-[#4f46e5] animate-pulse-slow" />
        <div className="abs-light bg-[#06b6d4] left-auto right-10 top-40 animate-pulse-slower" />
        <div className="abs-light bg-[#22c55e] bottom-0 left-1/2 animate-pulse-slow" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-10 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
            Market Dashboard
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Real-time insights and analytics for informed trading decisions
          </p>
        </div>

        {/* Market Overview Section */}
        <section className="space-y-6 animate-fade-in-up animation-delay-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
                Market Overview
              </h2>
              <p className="text-sm text-gray-500">Live market data and trends</p>
            </div>
          </div>
          
          <div className="grid w-full gap-6 md:grid-cols-1 xl:grid-cols-3">
            <div className="neo-card group hover-lift">
              <div className="absolute top-4 right-4 p-2 rounded-full bg-blue-500/10 border border-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <TradingViewWidget
                title="Market Overview"
                scriptUrl={`${scriptUrl}market-overview.js`}
                config={MARKET_OVERVIEW_WIDGET_CONFIG}
                className="custom-chart"
                height={600}
              />
            </div>

            <div className="xl:col-span-2 neo-card group hover-lift">
              <div className="absolute top-4 right-4 p-2 rounded-full bg-purple-500/10 border border-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <BarChart3 className="w-4 h-4 text-purple-400" />
              </div>
              <TradingViewWidget
                title="Stock Heat Map"
                scriptUrl={`${scriptUrl}stock-heatmap.js`}
                config={HEATMAP_WIDGET_CONFIG}
                className="custom-chart"
                height={600}
              />
            </div>
          </div>
        </section>

        {/* News & Data Section */}
        <section className="space-y-6 animate-fade-in-up animation-delay-400">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500/20 to-green-500/20 border border-teal-500/30">
              <Newspaper className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
                News & Market Data
              </h2>
              <p className="text-sm text-gray-500">Latest stories and quotes</p>
            </div>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-1 xl:grid-cols-3">
            <div className="neo-card group hover-lift">
              <div className="absolute top-4 right-4 p-2 rounded-full bg-teal-500/10 border border-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Newspaper className="w-4 h-4 text-teal-400" />
              </div>
              <TradingViewWidget
                title="Top Stories"
                scriptUrl={`${scriptUrl}timeline.js`}
                config={TOP_STORIES_WIDGET_CONFIG}
                className="custom-chart"
                height={600}
              />
            </div>

            <div className="xl:col-span-2 neo-card group hover-lift">
              <div className="absolute top-4 right-4 p-2 rounded-full bg-green-500/10 border border-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <BarChart3 className="w-4 h-4 text-green-400" />
              </div>
              <TradingViewWidget
                title="Market Quotes"
                scriptUrl={`${scriptUrl}market-quotes.js`}
                config={MARKET_DATA_WIDGET_CONFIG}
                className="custom-chart"
                height={600}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
