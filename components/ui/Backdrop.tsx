// Latar tetap di belakang seluruh halaman: grid tipis yang memudar ke tepi
// dan dua cahaya lembut (emas & biru). Ini satu-satunya "glow" di halaman.
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgb(148 163 184 / 0.07) 1px, transparent 1px), linear-gradient(90deg, rgb(148 163 184 / 0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)",
        }}
      />
      <div className="absolute -top-40 left-[10%] w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[30%] -right-40 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.10)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}
