export default function Header() {
  return (
    <header className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden shadow-lg mb-8">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('/header-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative h-full flex items-center justify-center">
        <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
          Todo App
        </h1>
      </div>
    </header>
  );
}
