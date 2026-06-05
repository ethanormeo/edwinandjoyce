"use client";

import { useState } from "react";
import Reveal from "./anim/Reveal";
import { copy, contact, categories } from "@/lib/site";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: categories[0].label, date: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Photography inquiry — ${form.name || "New client"}`);
    const body = encodeURIComponent(
      `Hi Edwin & Joyce,\n\nI'd love to talk about ${form.type.toLowerCase()}.\n\nName: ${form.name}\nEmail: ${form.email}\nDate / timeframe: ${form.date}\n\n${form.message}\n\nThank you!`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative bg-night text-paper pt-[clamp(4rem,12vh,9rem)] pb-24">
      <div className="shell">
        <Reveal className="max-w-4xl">
          <span className="eyebrow !text-[var(--color-night-soft)]">Inquiries</span>
          <h2 className="display fluid-h2 text-paper mt-5 max-w-[16ch]">{copy.cta.headline}</h2>
          <p className="lede fluid-lede !text-[var(--color-night-soft)] mt-7 max-w-[46ch]">{copy.cta.sub}</p>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7" y={28}>
            <form onSubmit={submit} className="grid sm:grid-cols-2 gap-x-6 gap-y-7">
              <Field label="Your name"><input required value={form.name} onChange={set("name")} className="ej-input" placeholder="Jane & John" /></Field>
              <Field label="Email"><input required type="email" value={form.email} onChange={set("email")} className="ej-input" placeholder="you@email.com" /></Field>
              <Field label="What for?">
                <select value={form.type} onChange={set("type")} className="ej-input">
                  {categories.map((c) => (<option key={c.key}>{c.label}</option>))}
                  <option>Events</option><option>Something else</option>
                </select>
              </Field>
              <Field label="Date / timeframe"><input value={form.date} onChange={set("date")} className="ej-input" placeholder="Oct 2026, or flexible" /></Field>
              <Field label="Tell us about it" full><textarea value={form.message} onChange={set("message")} rows={4} className="ej-input resize-none" placeholder="Your story, the people, the vibe…" /></Field>
              <div className="sm:col-span-2 flex flex-wrap items-center gap-5 mt-2">
                <button type="submit" className="btn btn-accent">{copy.cta.button}</button>
                <span className="text-[0.8rem] text-[var(--color-night-soft)]">
                  or email <a href={`mailto:${contact.email}`} className="link-underline text-paper">{contact.email}</a>
                </span>
              </div>
              {sent && (
                <p role="status" className="sm:col-span-2 -mt-2 text-[0.85rem] text-accent">
                  Opening your email app… if nothing happened, email us directly at{" "}
                  <a href={`mailto:${contact.email}`} className="link-underline text-paper">{contact.email}</a>.
                </p>
              )}
            </form>
          </Reveal>

          <div className="lg:col-span-5 lg:pl-8 lg:border-l border-white/12">
            <Reveal className="space-y-6 mb-12">
              <Detail label="Email" value={contact.email} href={`mailto:${contact.email}`} />
              <Detail label="Call or text" value={contact.phone} href={contact.phoneHref} />
              <Detail label="Instagram" value={contact.instagramHandle} href={contact.instagram} />
              <Detail label="Based in" value={contact.region} />
            </Reveal>
            <Reveal stagger={0.06}>
              {copy.faq.map((f, i) => (
                <details key={i} className="group border-b border-white/12 py-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-paper text-[1.05rem]">
                    {f.q}
                    <span className="ml-4 text-accent transition-transform duration-500 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[var(--color-night-soft)] text-[0.92rem] leading-relaxed">{f.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .ej-input {
          width: 100%; background: transparent; color: var(--color-paper);
          border: 0; border-bottom: 1px solid rgba(255,255,255,0.2);
          padding: 0.6rem 0; font-size: 1rem; font-family: var(--font-archivo), sans-serif;
          transition: border-color .4s var(--ease-out-expo);
        }
        .ej-input::placeholder { color: rgba(184,173,156,0.6); }
        .ej-input:focus { border-color: var(--color-accent); }
        .ej-input:focus:not(:focus-visible) { outline: none; }
        .ej-input option { color: #15120e; }
        details summary::-webkit-details-marker { display: none; }
      `}</style>
    </section>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="label text-[var(--color-night-soft)]">{label}</span>
      {children}
    </label>
  );
}

function Detail({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="label text-[var(--color-night-soft)] block mb-1">{label}</span>
      <span className="text-paper text-lg link-underline">{value}</span>
    </>
  );
  return href ? <a href={href} className="block">{content}</a> : <div>{content}</div>;
}
