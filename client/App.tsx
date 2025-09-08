import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
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

const queryClient = new QueryClient();

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary-foreground/90" />
          </span>
          <span className="font-serif text-xl tracking-tight text-foreground group-hover:text-foreground/90">
            Monasteries of Sikkim
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"}`} end>
            Home
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"}`}>
            Explore
          </NavLink>
          <NavLink to="/tours" className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"}`}>
            Tours
          </NavLink>
          <NavLink to="/map" className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"}`}>
            Map
          </NavLink>
          <NavLink to="/archives" className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"}`}>
            Archives
          </NavLink>
          <NavLink to="/guide" className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"}`}>
            Audio Guide
          </NavLink>
          <NavLink to="/calendar" className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"}`}>
            Calendar
          </NavLink>
        </nav>
        <a
          href="#mission"
          className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 md:inline-flex"
          aria-label="Jump to mission section"
        >
          Our Mission
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container grid gap-6 py-10 md:grid-cols-2 md:gap-8">
        <div>
          <p className="font-serif text-lg">Digitize. Preserve. Discover.</p>
          <p className="mt-2 max-w-prose text-sm text-foreground/70">
            A minimal, modern archive celebrating the sacred monasteries of Sikkim—built for travelers, researchers, and future generations.
          </p>
        </div>
        <div className="flex items-end justify-start md:justify-end">
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
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
