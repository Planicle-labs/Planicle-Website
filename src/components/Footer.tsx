export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-16 sm:px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-[1fr_auto_auto] md:gap-16">
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
            <p className="max-w-xs text-sm leading-relaxed text-text-tertiary">
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
              href="https://wa.me/917678455973?text=Hi%2C%20I%20want%20a%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-accent transition-colors ease-out-quint"
            >
              WhatsApp
            </a>
            <a
              href="mailto:contact@planicle.com"
              target="_top"
              className="text-sm text-text-secondary hover:text-accent transition-colors ease-out-quint"
            >
              contact@planicle.com
            </a>
            {/* <a
              href="#"
              className="text-sm text-text-secondary hover:text-accent transition-colors ease-out-quint"
            >
              LinkedIn
            </a> */}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-border pt-8 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4">
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
