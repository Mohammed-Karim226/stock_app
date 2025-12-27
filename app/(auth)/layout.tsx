import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href={"/"} className="auth-logo group">
          <Image
            src={"/icons/logo.png"}
            alt="logo"
            width={140}
            height={32}
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>

      <section className="auth-right-section max-sm:hidden! relative overflow-hidden">

        {/* Background orbs */}
        <div className="absolute -top-20 -right-20 w-[420px] h-[420px] bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-purple-500/15 rounded-full blur-3xl animate-pulse-slower" />

        <div className="relative z-10 h-full flex flex-col justify-between px-16 py-20">

          {/* ===== Top Content ===== */}
          <div className="space-y-10 animate-fade-in-up">

            {/* Headline */}
            <div className="space-y-4 max-w-xl">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
          ⚡ Smart Trading Signals
        </span>

              <h2 className="text-4xl font-bold text-gray-100 leading-tight">
                Trade with confidence,
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
            not guesswork
          </span>
              </h2>

              <p className="text-gray-400 text-lg">
                Real-time alerts, market insights, and AI-powered signals built for
                modern traders.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-4 max-w-xl">
              {[
                { title: "Real-time Alerts", desc: "Instant market movements" },
                { title: "AI Signals", desc: "Data-driven entries" },
                { title: "Risk Control", desc: "Smarter trade exits" },
                { title: "Multi-Markets", desc: "Crypto, Stocks, Forex" },
              ].map((item, i) => (
                  <div
                      key={i}
                      className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm hover:border-blue-500/40 transition"
                  >
                    <h4 className="text-gray-100 font-semibold">{item.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>
              ))}
            </div>
          </div>

          {/* ===== Bottom Content ===== */}
          <div className="space-y-8 animate-fade-in-up animation-delay-400">

            {/* Stats */}
            <div className="flex gap-10">
              {[
                { value: "12K+", label: "Active Traders" },
                { value: "98%", label: "Signal Accuracy" },
                { value: "4.9★", label: "User Rating" },
              ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-gray-100">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
              ))}
            </div>

            {/* Image Preview */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-br from-blue-500/20 via-purple-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl transform transition-transform group-hover:scale-[1.02]">
                <Image
                    src="/images/ShgnPanner.png"
                    alt="Platform Preview"
                    width={720}
                    height={420}
                    className="w-full h-full object-cover"
                    priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Layout;
