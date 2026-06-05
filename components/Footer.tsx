import { nav, contact } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative bg-night text-paper border-t border-white/12">
      <div className="shell py-16">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-6">
            <a href="#top" className="display text-paper inline-block leading-[0.92]" style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", fontStretch: "118%", fontWeight: 800 }}>
              Edwin &amp; Joyce
            </a>
            <p className="mt-5 max-w-[36ch] text-[var(--color-night-soft)] leading-relaxed">
              Natural-light photography · Austin &amp; the Texas Hill Country.
            </p>
          </div>

          <nav className="md:col-span-3">
            <h3 className="label text-[var(--color-night-soft)] mb-5">Explore</h3>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} className="link-underline text-paper">{n.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h3 className="label text-[var(--color-night-soft)] mb-5">Connect</h3>
            <ul className="space-y-3">
              <li><a href={`mailto:${contact.email}`} className="link-underline text-paper">{contact.email}</a></li>
              <li><a href={contact.phoneHref} className="link-underline text-paper">{contact.phone}</a></li>
              <li><a href={contact.instagram} className="link-underline text-paper">Instagram</a></li>
              <li><a href={contact.facebook} className="link-underline text-paper">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-7 border-t border-white/12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[0.72rem] text-[var(--color-night-soft)]">
          <span>© 2026 Edwin &amp; Joyce Ormeo Photography — Austin, Texas.</span>
          <span className="label">Natural light · Texas</span>
        </div>
      </div>
    </footer>
  );
}
