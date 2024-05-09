import Home from "@/components/pages/Home/index";

export default function HomePage() {
  return (
    <div className="fluid-container mt-8 md:mt-12">
      <div className="flex flex-col h-full md:gap-[80px] gap-10 w-full max-w-[650px] mx-auto">
        <div className="text-center">
          <h1 className="lg:text-5xl text-4xl text-white font-sansBungee text-center mb-4">
            Your Small Link
          </h1>
          <h2 className="text-lg">
            The simplest URL shortener you were waiting for
          </h2>
        </div>
        <Home />
      </div>
    </div>
  );
}
