<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import ScrollToPlugin from "gsap/ScrollToPlugin";
  import Hero from "./components/Hero.svelte";
  import About from "./components/About.svelte";
  import Catalog from "./components/Catalog.svelte";
  import Gallery from "./components/Gallery.svelte";
  import Viewer3D from "./components/Viewer3D.svelte";
  import Contact from "./components/Contact.svelte";
  import Navigation from "./components/Navigation.svelte";

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  onMount(() => {
    // Animación inicial de entrada
    gsap.from(".nav-item", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    // Scroll smooth
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          gsap.to(window, {
            duration: 0.2,
            scrollTo: target,
            ease: "power2.inOut",
          });
        }
      });
    });
  });
</script>

<main class="relative min-h-screen gradient-mesh">
  <!-- Efectos de fondo -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden">
    <div
      class="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
    ></div>
    <div
      class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-highlight/10 rounded-full blur-3xl animate-pulse"
      style="animation-delay: 1s;"
    ></div>
  </div>

  <Navigation />

  <div class="relative z-10">
    <Hero />
    <About />
    <Catalog />
    <Gallery />
    <Viewer3D />
    <Contact />
  </div>

  <!-- Footer -->
  <footer class="relative z-10 py-8 border-t border-accent/20">
    <div class="container mx-auto px-6 text-center">
      <p class="font-display text-sm text-gray-400">
        © 2024 Jkraft 3D. Todos los derechos reservados.
      </p>
      <p class="font-body text-xs text-gray-500 mt-2">
        Hecho con Three.js, GSAP, Svelte & Tailwind
      </p>
    </div>
  </footer>
</main>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
