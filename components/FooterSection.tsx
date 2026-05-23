"use client";

import Image from "next/image";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#why-us", label: "Why Us" },
  { href: "#pricing", label: "Pricing" },
];

const socialLinks = [
  { href: "https://wa.me/917678455973?text=Hi%2C%20I%20want%20to%20work%20with%20Planicle", label: "WhatsApp" },
  { href: "https://github.com", label: "GitHub" },
  { href: "https://linkedin.com", label: "LinkedIn" },
];

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      style={{
        background: "#0B0F17",
        paddingTop: "56px",
        paddingBottom: "36px",
        borderTop: "1px solid rgba(245, 242, 237, 0.06)",
        position: "relative",
      }}
    >
      <div className="container-narrow flex flex-col">
        
        {/* Main 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-12">
          
          {/* Column 1: Logo & Vision (span 5) */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
              }}
              aria-label="Planicle home"
              className="mb-6"
            >
              <Image
                src="/logo/Logo_white.svg"
                alt=""
                width={24}
                height={24}
                unoptimized
                style={{ height: "24px", width: "auto" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "var(--color-canvas)",
                  letterSpacing: "-0.01em",
                }}
              >
                Planicle
              </span>
            </a>

            <p
              className="font-body text-sm max-w-[32ch] leading-relaxed"
              style={{ color: "var(--color-ash)" }}
            >
              Design-led engineering for high-growth startups. We turn product blueprints into premium software.
            </p>
          </div>

          {/* Column 2: Navigation & Links (span 4) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 text-left">
            {/* Sitemap Links */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                Sitemap
              </span>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-body text-xs text-gray-400 hover:text-white transition-colors duration-200"
                    style={{ textDecoration: "none" }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Social Connection Links */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                Connect
              </span>
              <nav className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs text-gray-400 hover:text-white transition-colors duration-200"
                    style={{ textDecoration: "none" }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Column 3: Contact & Location (span 3) */}
          <div className="md:col-span-3 flex flex-col items-start text-left gap-4">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              Location
            </span>
            <div className="font-body text-xs text-gray-400 leading-relaxed">
              Based in New Delhi, India.
              <br />
              Collaborating globally.
            </div>
            <a
              href="mailto:hello@planicle.com"
              className="font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors mt-2"
              style={{ textDecoration: "none" }}
            >
              hello@planicle.com
            </a>
          </div>

        </div>

        {/* Horizontal Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(245, 242, 237, 0.06)",
            marginTop: "40px",
            marginBottom: "24px",
          }}
        />

        {/* Footer Metadata Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p
            className="font-body text-[11px] margin-0"
            style={{ color: "rgba(160, 154, 148, 0.5)" }}
          >
            © {year} Planicle. All rights reserved.
          </p>

          <p
            className="font-mono text-[10px] margin-0 tracking-wider"
            style={{ color: "rgba(160, 154, 148, 0.4)" }}
          >
            BUILD RESOLUTION: 100% (STABLE BUILD v2.4.0)
          </p>
        </div>

      </div>
    </footer>
  );
}
