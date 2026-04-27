import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { StickyCallButton } from "@/components/sticky-call-button";
import { CookieBanner } from "@/components/cookie-banner";
import { UtmCapture } from "@/components/gtm";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UtmCapture />
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyCallButton />
      <CookieBanner />
    </>
  );
}
