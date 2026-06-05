type Props = { className?: string; stacked?: boolean; sub?: boolean };

/* Restyled wordmark — light Fraunces serif, small tasteful italic ampersand,
   quiet lowercase "ormeo · austin" subline. No oversized/gradient ampersand. */
export default function Logo({ className = "", stacked = false, sub = true }: Props) {
  return (
    <span className={`inline-flex flex-col leading-[0.95] ${className}`} aria-label="Edwin & Joyce Ormeo Photography">
      <span className="font-display tracking-[-0.005em]" style={{ fontWeight: 370 }}>
        Edwin{" "}
        <em
          className="font-display"
          style={{ fontStyle: "italic", fontWeight: 340, fontSize: "0.86em", color: "var(--color-ink-soft)" }}
        >
          &amp;
        </em>{" "}
        Joyce
      </span>
      {stacked && sub && (
        <span
          className="font-sans text-ink-faint mt-[0.7em]"
          style={{ fontSize: "0.38em", letterSpacing: "0.34em" }}
        >
          ormeo&nbsp;·&nbsp;austin
        </span>
      )}
    </span>
  );
}
