import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Credibility } from "@/components/sections/credibility";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Expertise } from "@/components/sections/expertise";
import { Toolkit } from "@/components/sections/toolkit";
import { WhyMe } from "@/components/sections/why-me";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Cursor, ScrollProgress } from "@/components/ui/motion-kit";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Credibility />
        <Work />
        <About />
        <Expertise />
        <Toolkit />
        <WhyMe />
        <Process />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
