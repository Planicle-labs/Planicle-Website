export function Footer() {
  return (
    <footer className="py-16 px-6 md:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-16 mb-16">
          {/* Brand */}
          <div>
            <a
              href="#"
              className="font-display text-xl font-bold tracking-tight flex items-center gap-2.5 mb-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo/Logo_white.svg"
                alt="Planicle"
                className="h-7 w-auto"
              />
              Planicle
            </a>
            <p className="text-text-tertiary text-sm max-w-xs leading-relaxed">
              Premium software for local businesses. No templates. No fluff. Just results.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.05em] font-bold text-text-tertiary mb-2">
              Navigate
            </span>
            <a
              href="#services"
              className="text-sm text-text-secondary hover:text-foreground transition-colors ease-out-quint"
            >
              Services
            </a>
            <a
              href="#why-us"
              className="text-sm text-text-secondary hover:text-foreground transition-colors ease-out-quint"
            >
              Why Us
            </a>
            <a
              href="#pricing"
              className="text-sm text-text-secondary hover:text-foreground transition-colors ease-out-quint"
            >
              Pricing
            </a>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.05em] font-bold text-text-tertiary mb-2">
              Connect
            </span>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-accent transition-colors ease-out-quint"
            >
              WhatsApp
            </a>
            <a
              href="mailto:hello@planicle.com"
              className="text-sm text-text-secondary hover:text-accent transition-colors ease-out-quint"
            >
              Email
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary hover:text-accent transition-colors ease-out-quint"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} Planicle Labs. All rights
            reserved.
          </p>
          <p className="text-xs text-text-tertiary">
            Built with precision in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
