type Props = { className?: string };

/* Clean wordmark — "Edwin & Joyce", Archivo 700, normal same-size ampersand. */
export default function Logo({ className = "" }: Props) {
  return (
    <span
      className={`font-display leading-none ${className}`}
      style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
      aria-label="Edwin & Joyce Ormeo Photography"
    >
      Edwin&nbsp;&amp;&nbsp;Joyce
    </span>
  );
}
