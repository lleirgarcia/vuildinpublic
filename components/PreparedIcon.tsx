export function PreparedIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Icono de lista/checklist - proyectos preparados */}
      <rect
        x="2"
        y="3"
        width="12"
        height="10"
        rx="1"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M5 7L7 9L11 5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="5"
        y1="11"
        x2="11"
        y2="11"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

