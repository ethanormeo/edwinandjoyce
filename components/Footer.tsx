import { nav, contact, copy } from "@/lib/site";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="relative bg-night text-[var(--color-night-soft)] border-t border-white/10">
      <div className="shell py-16">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-6">
            <a href="#top" className="font-display text-paper-soft text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em] inline-block">
              Edwin <em className="italic text-[var(--color-night-soft)]/65" style={{ fontWeight: 340 }}>&amp;</em> Joyce
            </a>
            <p className="mt-5 max-w-[34ch] text-[var(--color-night-soft)]/70 leading-relaxed">
              {copy.footerLine}
            </p>
          </div>

          <nav className="md:col-span-3">
            <h3 className="text-[0.66rem] uppercase tracking-[0.24em] text-[var(--color-night-soft)]/70 mb-5">Explore</h3>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-underline text-paper-soft/85 hover:text-paper-soft">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h3 className="text-[0.66rem] uppercase tracking-[0.24em] text-[var(--color-night-soft)]/70 mb-5">Connect</h3>
            <ul className="space-y-3">
              <li><a href={`mailto:${contact.email}`} className="link-underline text-paper-soft/85">{contact.email}</a></li>
              <li><a href={contact.phoneHref} className="link-underline text-paper-soft/85">{contact.phone}</a></li>
              <li><a href={contact.instagram} className="link-underline text-paper-soft/85">Instagram</a></li>
              <li><a href={contact.facebook} className="link-underline text-paper-soft/85">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[0.72rem] text-[var(--color-night-soft)]/70">
          <span>© {year} {contact.studio}. Austin, Texas.</span>
          <span className="uppercase tracking-[0.2em]">Crafted in the golden hour</span>
        </div>
      </div>
    </footer>
  );
}
