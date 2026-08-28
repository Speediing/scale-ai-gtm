import Image from "next/image";

export function BrandLockup({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={`brand-lockup brand-lockup-${size}`}
      aria-label="Scale AI and SpaceXAI"
    >
      <Image
        src="/brand/scale-wordmark.svg"
        alt="Scale AI"
        className="brand-scale"
        width={60}
        height={20}
      />
      <span className="brand-times" aria-hidden>
        ×
      </span>
      <Image
        src="/brand/spacexai.svg"
        alt="SpaceXAI"
        className="brand-sxai"
        width={136}
        height={18}
      />
    </span>
  );
}
