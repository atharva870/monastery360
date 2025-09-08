import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Explore from "./pages/Explore";
import Tours from "./pages/Tours";
import MapPage from "./pages/Map";
import Archives from "./pages/Archives";
import Guide from "./pages/Guide";
import Calendar from "./pages/Calendar";
import { Instagram } from "lucide-react";
import Chatbot from "./components/chat/Chatbot";

const queryClient = new QueryClient();

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-accent/30 bg-gradient-to-r from-primary/95 to-accent/90 text-primary-foreground">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2 text-primary-foreground">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary-foreground/90" />
          </span>
          <span className="font-serif text-xl tracking-tight text-primary-foreground group-hover:opacity-90">
            Monasteries of Sikkim
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex text-primary-foreground">
          <NavLink to="/" className={({ isActive }) => `py-2 text-[15px] font-medium transition-colors ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}`} end>
            Home
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => `py-2 text-[15px] font-medium transition-colors ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}`}>
            Explore
          </NavLink>
          <NavLink to="/tours" className={({ isActive }) => `py-2 text-[15px] font-medium transition-colors ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}`}>
            Tours
          </NavLink>
          <NavLink to="/map" className={({ isActive }) => `py-2 text-[15px] font-medium transition-colors ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}`}>
            Map
          </NavLink>
          <NavLink to="/archives" className={({ isActive }) => `py-2 text-[15px] font-medium transition-colors ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}`}>
            Archives
          </NavLink>
          <NavLink to="/guide" className={({ isActive }) => `py-2 text-[15px] font-medium transition-colors ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}`}>
            Audio Guide
          </NavLink>
          <NavLink to="/calendar" className={({ isActive }) => `py-2 text-[15px] font-medium transition-colors ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}`}>
            Calendar
          </NavLink>
        </nav>
        <div className="flex items-center gap-2 text-primary-foreground">
          <a
            href="https://www.instagram.com/monastery360/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Open Instagram @monastery360"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="#mission"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 md:inline-flex glow-cta"
            aria-label="Jump to mission section"
          >
            Our Mission
          </a>
        </div>
        <div className="pointer-events-none pattern-border absolute inset-x-0 bottom-0 h-2 opacity-80" aria-hidden="true" />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-accent/30 bg-secondary">
      <div className="container grid gap-6 py-10 md:grid-cols-2 md:gap-8">
        <div>
          <p className="font-serif text-lg">Digitize. Preserve. Discover.</p>
          <p className="mt-2 max-w-prose text-sm text-foreground/70">
            A minimal, modern archive celebrating the sacred monasteries of Sikkim—built for travelers, researchers, and future generations.
          </p>
        </div>
        <div className="flex items-end justify-start gap-3 md:justify-end">
          <a
            href="https://www.instagram.com/monastery360/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 underline-offset-4 hover:underline"
            aria-label="Follow on Instagram"
          >
            <Instagram className="h-4 w-4" />
            Follow on Instagram
          </a>
          <p className="text-sm text-foreground/60">© {new Date().getFullYear()} Monasteries of Sikkim</p>
        </div>
      </div>
    </footer>
  );
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) navigator.serviceWorker.register("/sw.js").catch(() => void 0);
    });
  });
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/archives" element={<Archives />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/calendar" element={<Calendar />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
