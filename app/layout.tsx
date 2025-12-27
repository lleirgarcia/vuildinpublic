import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SocialStats } from "@/components/SocialStats";
import { AuthButton } from "@/components/AuthButton";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "vuilding in public",
  description: "Máquina de episodios para crear software basado en comentarios de TikTok",
  icons: {
    icon: '/favicon.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-black text-[#e5e5e5]">
        <Providers>
          <header className="border-b border-[#1a1a1a] bg-black h-14">
            <div className="max-w-7xl mx-auto px-6 py-3">
              <div className="flex justify-between items-center">
                <Link href="/" className="hover:opacity-70 transition-opacity flex items-center gap-3">
                  <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    width={32} 
                    height={32}
                    className="w-8 h-8"
                  />
                  <h1 className="text-xl font-medium tracking-tight">vuilding in public</h1>
                </Link>
                <nav className="flex items-center gap-6">
                  <Link href="/" className="text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors">
                    Home
                  </Link>
                  <Link href="/board" className="text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors">
                    Board
                  </Link>
                  <Link href="/interacciones" className="text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors">
                    Interacciones
                  </Link>
                  {process.env.NODE_ENV === 'development' && (
                    <Link href="/debug-auth" className="text-xs text-[#737373] hover:text-[#a3a3a3] transition-colors">
                      🔐 Debug
                    </Link>
                  )}
                  <AuthButton />
                </nav>
              </div>
            </div>
          </header>
          <SocialStats />
          <main className="bg-black">
            {children}
          </main>
          <footer className="border-t border-[#1a1a1a] bg-black mt-16">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-[#737373]">
                  vuildinginpublic.com
                </div>
                <div className="text-xs text-[#404040]">
                  © {new Date().getFullYear()} vuilding in public. Todos los derechos reservados.
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}

