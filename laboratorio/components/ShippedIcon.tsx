export function ShippedIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Checkmark en círculo - proyectos terminados */}
      <circle
        cx="8"
        cy="8"
        r="7"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M5 8L7 10L11 6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

