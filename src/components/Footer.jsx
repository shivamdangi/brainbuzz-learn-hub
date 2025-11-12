export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-foreground">BrainBuzz Academy</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            © {currentYear} BrainBuzz. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

