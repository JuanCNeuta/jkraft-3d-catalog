<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    gsap.set(".feature-card", { opacity: 1, y: 0 });
    gsap.set(".about-title", { opacity: 1, y: 0 });
    gsap.set(".about-text", { opacity: 1, x: 0 });

    // Animación del título
    gsap.from(".about-title", {
      scrollTrigger: {
        trigger: ".about-title",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Animación de las tarjetas
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".feature-card",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Animación del texto
    gsap.from(".about-text", {
      scrollTrigger: {
        trigger: ".about-text",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  });
</script>

<section id="nosotros" class="relative py-32 px-6">
  <div class="container mx-auto max-w-7xl">
    <h3
      class="about-title font-display text-5xl md:text-6xl font-bold text-center mb-6"
    >
      Sobre <span class="text-accent">Nosotros</span>
    </h3>

    <p
      class="about-text font-body text-xl text-center text-gray-300 mb-20 max-w-3xl mx-auto"
    >
      En Jkraft 3D combinamos creatividad, tecnología y precisión para dar vida
      a tus proyectos más ambiciosos
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
      <div
        class="feature-card bg-secondary/50 backdrop-blur-sm p-8 rounded-2xl border border-accent/20 hover:border-accent/50 transition-all duration-300 hover:transform hover:scale-105"
      >
        <div
          class="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mb-6"
        >
          <svg
            class="w-8 h-8 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <h4 class="font-display text-2xl font-bold mb-4">Velocidad</h4>
        <p class="font-body text-gray-400 leading-relaxed">
          Entrega rápida sin comprometer la calidad. Producción optimizada 24/7.
        </p>
      </div>

      <div
        class="feature-card bg-secondary/50 backdrop-blur-sm p-8 rounded-2xl border border-highlight/20 hover:border-highlight/50 transition-all duration-300 hover:transform hover:scale-105"
      >
        <div
          class="w-16 h-16 bg-highlight/20 rounded-xl flex items-center justify-center mb-6"
        >
          <svg
            class="w-8 h-8 text-highlight"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h4 class="font-display text-2xl font-bold mb-4">Precisión</h4>
        <p class="font-body text-gray-400 leading-relaxed">
          Cada detalle cuenta. Tecnología de alta resolución para resultados
          perfectos.
        </p>
      </div>

      <div
        class="feature-card bg-secondary/50 backdrop-blur-sm p-8 rounded-2xl border border-accent/20 hover:border-accent/50 transition-all duration-300 hover:transform hover:scale-105"
      >
        <div
          class="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mb-6"
        >
          <svg
            class="w-8 h-8 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <h4 class="font-display text-2xl font-bold mb-4">Pasión</h4>
        <p class="font-body text-gray-400 leading-relaxed">
          Cada proyecto es único. Dedicación absoluta en cada impresión.
        </p>
      </div>
    </div>

    <div
      class="bg-gradient-to-r from-accent/10 to-highlight/10 rounded-3xl p-12 border border-accent/20"
    >
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h4 class="font-display text-3xl font-bold mb-6">
            Tecnología de <span class="text-accent">Vanguardia</span>
          </h4>
          <p class="font-body text-gray-300 leading-relaxed mb-6">
            Utilizamos las impresoras 3D más avanzadas del mercado, con
            capacidad para trabajar con múltiples materiales: PLA, ABS, PETG,
            TPU, Resina y más.
          </p>
          <p class="font-body text-gray-300 leading-relaxed">
            Desde prototipos funcionales hasta piezas finales de producción,
            nuestro equipo está preparado para materializar cualquier diseño con
            la máxima fidelidad.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-secondary/50 p-6 rounded-xl border border-accent/20">
            <p class="font-display text-4xl font-bold text-accent mb-2">
              0.05mm
            </p>
            <p class="font-body text-sm text-gray-400">Resolución Mínima</p>
          </div>
          <div
            class="bg-secondary/50 p-6 rounded-xl border border-highlight/20"
          >
            <p class="font-display text-4xl font-bold text-highlight mb-2">
              300x300
            </p>
            <p class="font-body text-sm text-gray-400">Área de Impresión</p>
          </div>
          <div class="bg-secondary/50 p-6 rounded-xl border border-accent/20">
            <p class="font-display text-4xl font-bold text-accent mb-2">12+</p>
            <p class="font-body text-sm text-gray-400">Materiales</p>
          </div>
          <div
            class="bg-secondary/50 p-6 rounded-xl border border-highlight/20"
          >
            <p class="font-display text-4xl font-bold text-highlight mb-2">
              24/7
            </p>
            <p class="font-body text-sm text-gray-400">Producción</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
