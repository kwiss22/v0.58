import imgImageAiga from "@/assets/33ca97e8cf509eb461ac015004ba7277a7cc47d0.png";

export function HomeHeader() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Aiga Logo */}
        <div className="h-8">
          <img
            src={imgImageAiga}
            alt="Aiga"
            className="h-full w-auto object-contain"
          />
        </div>

        {/* ? ?? (?? ?? ???) */}
        <div></div>
      </div>
    </div>
  );
}
