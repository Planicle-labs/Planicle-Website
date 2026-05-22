"use client";

import Image from "next/image";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#pricing", label: "Pricing" },
];

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      style={{
        background: "var(--color-ink)",
        paddingBlock: "48px",
        borderTop: "1px solid rgba(245, 242, 237, 0.06)",
      }}
    >
      <div
        className="container-narrow"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
            aria-label="Planicle home"
          >
            <Image
              src="/logo/Logo_white.svg"
              alt=""
              width={32}
              height={24}
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

          {/* Nav links */}
          <nav
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
            }}
            aria-label="Footer navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--color-ash)",
                  textDecoration: "none",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-canvas)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-ash)")
                }
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/917678455973?text=Hi%2C%20I%20want%20a%20website"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--color-ash)",
                textDecoration: "none",
                transition: "color 200ms ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-canvas)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-ash)")
              }
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(245, 242, 237, 0.06)",
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body), 'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(160, 154, 148, 0.6)",
              margin: 0,
            }}
          >
            © {year} Planicle. All rights reserved.
          </p>

          <p
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: "11px",
              color: "rgba(160, 154, 148, 0.4)",
              margin: 0,
            }}
          >
            Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
