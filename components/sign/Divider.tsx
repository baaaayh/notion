function Line() {
  return <span className="line inline-flex flex-1 h-px bg-[#e6e5e3]"></span>;
}

export default function Divider({ text }: { text: string }) {
  return (
    <div className="divider inline-flex w-full justify-center items-center my-10">
      <Line />
      <span className="px-2 text-sm text-grey">{text}</span>
      <Line />
    </div>
  );
}
