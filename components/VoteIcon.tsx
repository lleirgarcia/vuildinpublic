export function VoteIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Mano levantada - votar */}
      <path
        d="M8 2C7.5 2 7 2.5 7 3V6H5C4.5 6 4 6.5 4 7V10C4 10.5 4.5 11 5 11H7V13C7 13.5 7.5 14 8 14C8.5 14 9 13.5 9 13V11H11C11.5 11 12 10.5 12 10V7C12 6.5 11.5 6 11 6H9V3C9 2.5 8.5 2 8 2Z"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pulgar */}
      <path
        d="M8 2L8 6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

