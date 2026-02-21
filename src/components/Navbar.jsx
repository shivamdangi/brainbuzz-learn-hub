import { useState } from "react";
import { BrainCircuit, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "home" },
    { name: "Explore", path: "explore" },
    { name: "Platform", path: "platform" },
    { name: "Contact", path: "contact" },
  ];

  const handleNavigate = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-primary/10 bg-background/70 backdrop-blur-xl">
      <div className="responsive-container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-primary/5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-hero text-white shadow-lg">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-sm font-semibold text-primary">BrainBuzz Academy</span>
              <span className="hidden text-xs text-muted-foreground sm:block">Learn brighter, grow faster</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-2 rounded-full border border-border/70 bg-card/70 p-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={currentPage === item.path ? "default" : "ghost"}
                onClick={() => handleNavigate(item.path)}
                className="rounded-full px-5"
              >
                {item.name}
              </Button>
            ))}
          </div>

          <div className="hidden md:flex">
            <Button onClick={() => handleNavigate("contact")} className="rounded-full">
              <Sparkles className="mr-2 h-4 w-4" />
              Enroll Now
            </Button>
          </div>

          <button
            className="md:hidden rounded-lg p-2 hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <div className="space-y-2 rounded-2xl border border-border/70 bg-card/90 p-3 shadow-card">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`block w-full rounded-xl px-4 py-3 text-left transition ${
                    currentPage === item.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
