<script>
  import { onMount, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  const galleryItems = [
    {
      id: 1,
      title: "Prototipo Mecánico",
      category: "Ingeniería",
      color: "accent",
      gradient: "from-emerald-500 to-green-700",
      image: "/images/gallery/IMG_3344.jpg",
    },
    {
      id: 2,
      title: "Figura Coleccionable",
      category: "Arte",
      color: "highlight",
      gradient: "from-pink-500 to-rose-700",
      image: "/images/gallery/16.png",
    },
    {
      id: 3,
      title: "Pieza Industrial",
      category: "Repuesto",
      color: "accent",
      gradient: "from-cyan-500 to-blue-700",
      image: "/images/gallery/ezgif-5-12729c8c17.webp",
    },
    {
      id: 4,
      title: "Maqueta Edificio",
      category: "Arquitectura",
      color: "highlight",
      gradient: "from-purple-500 to-indigo-700",
      image: "/images/gallery/20240204_131838.jpg",
    },
    {
      id: 5,
      title: "Herramienta Custom",
      category: "Herramental",
      color: "accent",
      gradient: "from-orange-500 to-red-700",
      image: "/images/gallery/2025-04-07_c343ef08a1a55.webp",
    },
    {
      id: 6,
      title: "Diseño Orgánico",
      category: "Decoración",
      color: "highlight",
      gradient: "from-yellow-500 to-amber-700",
      image: "/images/gallery/2025-02-06_2c078f53908c7.webp",
    },
    {
      id: 7,
      title: "Componente Electrónico",
      category: "Tecnología",
      color: "accent",
      gradient: "from-teal-500 to-emerald-700",
      image: "/images/gallery/IMG_6882.jpeg",
    },
    {
      id: 8,
      title: "Escultura Moderna",
      category: "Arte",
      color: "highlight",
      gradient: "from-fuchsia-500 to-pink-700",
      image: "/images/gallery/AnubisStatue (22).jpg",
    },
  ];

  let selectedCategory = "Todos";
  const categories = [
    "Todos",
    ...new Set(galleryItems.map((item) => item.category)),
  ];

  $: filteredItems =
    selectedCategory === "Todos"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  // Cada vez que filteredItems cambia
  $: if (filteredItems) {
    animateGalleryItems();
  }

  async function animateGalleryItems() {
    await tick();

    gsap.killTweensOf(".gallery-item");

    gsap.fromTo(
      ".gallery-item",
      {
        y: 50,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
        overwrite: "auto",
      },
    );

    ScrollTrigger.refresh();
  }

  onMount(() => {
    // Animaciones de entrada del título y filtros
    gsap.set(".gallery-title", { opacity: 1, y: 0 });
    gsap.set(".gallery-filters", { opacity: 1, y: 0 });

    gsap.from(".gallery-title", {
      scrollTrigger: {
        trigger: ".gallery-title",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".gallery-filters", {
      scrollTrigger: {
        trigger: ".gallery-filters",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });
</script>

<section id="galeria" class="relative py-32 px-6">
  <div class="container mx-auto max-w-7xl">
    <h3
      class="gallery-title font-display text-5xl md:text-6xl font-bold text-center mb-6"
    >
      <span class="text-accent">Galería</span> de Proyectos
    </h3>

    <p
      class="font-body text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto"
    >
      Explora algunos de nuestros trabajos más destacados
    </p>

    <div class="gallery-filters flex gap-3 justify-center flex-wrap mb-16">
      {#each categories as category}
        <button
          on:click={() => (selectedCategory = category)}
          class="px-6 py-3 rounded-lg font-display font-bold transition-all duration-300 transform hover:scale-105 {selectedCategory ===
          category
            ? 'bg-accent text-primary shadow-lg scale-105'
            : 'bg-secondary/50 text-gray-300 hover:bg-secondary border border-accent/20'}"
        >
          {category}
        </button>
      {/each}
    </div>

    <div
      class="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {#each filteredItems as item (item.id)}
        <div
          class="gallery-item group relative aspect-square rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          title={item.title}
          style="background: linear-gradient(135deg, rgba(0,0,0,0.06), rgba(0,0,0,0.04));"
        >
          <img
            class="gallery-image w-full h-full object-cover"
            src={item.image}
            alt={item.title}
            loading="lazy"
            on:load={(e) => e.target.classList.add("loaded")}
            on:error={(e) => {
              e.target.src = "/images/gallery/placeholder.jpg";
              e.target.classList.add("loaded");
            }}
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
          >
            <span class="font-display text-xs text-{item.color} mb-2"
              >{item.category}</span
            >
            <h4 class="font-display text-xl font-bold text-white">
              {item.title}
            </h4>
          </div>

          <div
            class="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"
          ></div>

          <div class="skeleton-overlay"></div>
        </div>
      {/each}
    </div>

    <div class="mt-20 text-center">
      <p class="font-body text-lg text-gray-300 mb-6">
        ¿Quieres ver tu proyecto en nuestra galería?
      </p>
      <a
        href="#contacto"
        class="inline-block px-8 py-4 bg-gradient-to-r from-accent to-highlight text-primary font-display font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      >
        Comienza Tu Proyecto
      </a>
    </div>
  </div>
</section>

<style>
  :global(.text-accent) {
    color: #00ff88;
  }
  :global(.text-highlight) {
    color: #ff006e;
  }
  .gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .gallery-image.loaded {
    opacity: 1;
  }
</style>
