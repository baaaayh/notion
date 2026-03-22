export default function EmojiIcon({ currentColor }: { currentColor: string }) {
  return (
    <svg
      aria-hidden="true"
      role="graphics-symbol"
      viewBox="2.37 2.37 15.26 15.25"
      className="emojiFaceFill"
      style={{
        fill: `${currentColor}`,
      }}
    >
      <path d="M2.375 10a7.625 7.625 0 1 1 15.25 0 7.625 7.625 0 0 1-15.25 0m5.67 1.706a.625.625 0 0 0-1.036.698A3.6 3.6 0 0 0 10.005 14c1.245 0 2.35-.637 2.996-1.596a.625.625 0 0 0-1.036-.698 2.37 2.37 0 0 1-1.96 1.044 2.36 2.36 0 0 1-1.96-1.044m-.68-2.041c.49 0 .88-.46.88-1.02s-.39-1.02-.88-1.02-.88.46-.88 1.02.39 1.02.88 1.02m6.15-1.02c0-.56-.39-1.02-.88-1.02s-.88.46-.88 1.02.39 1.02.88 1.02.88-.46.88-1.02"></path>
    </svg>
  );
}
