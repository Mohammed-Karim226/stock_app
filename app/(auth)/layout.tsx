import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href={'/'} className="auth-logo">
          <Image src={'/icons/logo.png'} alt="logo" width={140} height={32} className="h-8 w-auto" />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">
          {children}
        </div>
      </section>
      <section className="flex flex-col justify-start items-start max-sm:hidden pt-12 pl-12 bg-neutral-900">
       <div className="flex flex-col justify-start items-start gap-4">
         <blockquote className="font-medium text-xl w-[646px]">Signalist turned my watchlist into a winning list. The alerts are spot-on, and I feel more confident making moves in the market</blockquote>
        <div className="flex justify-between items-center w-[646px]">
          <div className="flex flex-col justify-start">
            <span className="font-bold text-lg">— Ethan R.</span>
            <span className="font-medium text-base">Retail Investor</span>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
       </div>
        <div className="relative flex-1 mt-8 rounded-tl-2xl shadow-2xl border-t-4 border-l-4 border-neutral-800">
          
            <Image 
              src={'/images/ShgnPanner.png'} 
              alt="ShgnPanner" 
              width={646} 
              height={646}
              className="relative z-10 w-full h-full object-cover rounded-tl-2xl"
              priority
            />
         </div>
      </section>
    </main>
  );
};

export default Layout;

