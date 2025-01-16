import { Header } from "@/components/HeroSection/Header";
import Projects from "@/components/Projects/Projects";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Projects />
      </main>
    </div>
  );
}
