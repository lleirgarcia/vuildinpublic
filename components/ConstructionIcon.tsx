export function ConstructionIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Patrón de barras diagonales estilo "en construcción" */}
      <defs>
        <pattern
          id="construction-pattern"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 0L8 8M8 0L0 8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </pattern>
      </defs>
      <rect
        width="16"
        height="16"
        fill="url(#construction-pattern)"
      />
    </svg>
  );
}

