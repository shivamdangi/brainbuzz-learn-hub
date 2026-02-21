import { BrainCircuit, Mail, Phone } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-primary/10 bg-slate-950 text-slate-200">
      <div className="responsive-container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-semibold">BrainBuzz Academy</h3>
            </div>
            <p className="text-sm text-slate-400">Personalized tutoring for Classes 1-10, built to improve confidence, clarity, and consistent outcomes.</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">Contact</h4>
            <p className="mb-2 flex items-center gap-2 text-sm text-slate-400"><Mail className="h-4 w-4" />info.brainbuzz.academy@gmail.com</p>
            <p className="flex items-center gap-2 text-sm text-slate-400"><Phone className="h-4 w-4" />+91-9690724441</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">Our Purpose</h4>
            <p className="text-sm text-slate-400">We combine expert mentors, student-centric learning, and measurable progress so every learner can succeed academically and beyond.</p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-5 text-center text-xs text-slate-500">© {currentYear} BrainBuzz Academy. All rights reserved.</div>
      </div>
    </footer>
  );
};
