type IconProps = { className?: string };

// Minimal line-art icons for the three bread formats — used in place of
// literal food photography/emoji, which read too playful for the brand.

export function SandwichIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 20 L12 4 L21 20 Z" />
      <path d="M5.5 15.5 Q8 13.5 10.5 15.5 T15.5 15.5 T18.5 15.5" />
    </svg>
  );
}

export function PitaIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 20 L4 11 A8 8 0 0 1 20 11 L20 20 Z" />
      <path d="M8 20 L8 13 Q12 11 16 13 L16 20" />
    </svg>
  );
}

export function SubIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="9" width="20" height="6" rx="3" />
      <path d="M7 9 L5.5 15 M12 9 L10.5 15 M17 9 L15.5 15" />
    </svg>
  );
}

const formatIcons = {
  "classic-grilled": SandwichIcon,
  "pita-pocket": PitaIcon,
  "sub-roll": SubIcon,
} as const;

export function FormatIcon({
  format,
  className,
}: {
  format: keyof typeof formatIcons;
  className?: string;
}) {
  const Icon = formatIcons[format];
  return <Icon className={className} />;
}
