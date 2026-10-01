export function DynamicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#fbf8f1]" aria-hidden="true">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(251,248,241,0.42)_36%,rgba(251,248,241,0.96)_72%)]" />
      <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(85,119,156,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(85,119,156,0.10)_1px,transparent_1px)] [background-size:64px_64px]" />
    </div>
  );
}
