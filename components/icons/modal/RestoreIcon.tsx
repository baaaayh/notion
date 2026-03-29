export default function RestoreIcon({ color }: { color?: string }) {
  return (
    <svg
      aria-hidden="true"
      role="graphics-symbol"
      viewBox="0 0 20 20"
      className="arrowUTurnUpLeft"
      style={{
        fill: color ? color : "#8e8b86",
        color: color ? color : "#8e8b86",
      }}
    >
      <path d="M7.592 4.792a.625.625 0 1 0-.884-.884l-4.4 4.4a.625.625 0 0 0 0 .884l4.4 4.4a.625.625 0 1 0 .884-.884L4.259 9.375H14a2.625 2.625 0 0 1 0 5.25h-1.42a.625.625 0 1 0 0 1.25H14a3.875 3.875 0 0 0 0-7.75H4.259z"></path>
    </svg>
  );
}
