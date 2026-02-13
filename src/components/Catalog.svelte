<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import Modal from "./Modal.svelte";

  gsap.registerPlugin(ScrollTrigger);

  let selectedProduct = null;
  let isModalOpen = false;

  const products = [
    {
      id: 1,
      name: "Prototipos Funcionales",
      description: "Pruebas y validación de diseños antes de producción masiva",
      longDescription:
        "Desarrollamos prototipos funcionales de alta precisión que te permiten validar tus diseños antes de invertir en producción masiva. Ideal para ingenieros, diseñadores industriales y emprendedores que necesitan iterar rápidamente.",
      price: "Desde $50",
      color: "accent",
      icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
      image: "/images/products/PXL_20251001_074539639.jpg",
      specs: [
        { label: "Precisión", value: "±0.1mm" },
        { label: "Tiempo de entrega", value: "24-48 horas" },
        { label: "Tamaño máximo", value: "300x300x400mm" },
        { label: "Acabado", value: "Estándar o Premium" },
      ],
      materials: ["PLA", "ABS", "PETG", "TPU", "Resina"],
    },
    {
      id: 2,
      name: "Piezas de Repuesto",
      description: "Fabricación de componentes únicos o descontinuados",
      longDescription:
        "Reproducimos piezas descontinuadas o difíciles de conseguir mediante ingeniería inversa y modelado 3D. Solución perfecta para reparar maquinaria, electrodomésticos o vehículos clásicos.",
      price: "Desde $30",
      color: "highlight",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      image: "/images/products/ImportedPhoto.764351398.604973.jpeg",
      specs: [
        { label: "Método", value: "Ingeniería inversa" },
        { label: "Compatibilidad", value: "98% fidelidad" },
        { label: "Resistencia", value: "Industrial" },
        { label: "Producción", value: "Unitaria o seriada" },
      ],
      materials: ["Nylon", "ABS", "PC", "PETG"],
    },
    {
      id: 3,
      name: "Figuras Decorativas",
      description: "Arte y diseño personalizado para cualquier espacio",
      longDescription:
        "Creamos esculturas, figuras y elementos decorativos únicos. Desde reproducciones de arte hasta diseños originales personalizados. Perfectos para decoración de interiores, regalos corporativos o coleccionismo.",
      price: "Desde $40",
      color: "accent",
      icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
      image: "/images/products/7392670d-5d3a-48ac-ab17-d2f4c7d945d1.png",
      specs: [
        { label: "Resolución", value: "Hasta 0.05mm" },
        { label: "Altura máxima", value: "400mm" },
        { label: "Acabados", value: "Pintado, lijado" },
        { label: "Personalización", value: "Total" },
      ],
      materials: ["Resina", "PLA", "Mármol PLA", "Madera PLA"],
    },
    {
      id: 4,
      name: "Maquetas Arquitectónicas",
      description: "Visualización precisa de proyectos arquitectónicos",
      longDescription:
        "Maquetas arquitectónicas de alta precisión para presentaciones, concursos y visualización de proyectos. Trabajamos desde planos CAD, BIM o modelos 3D. Ideal para arquitectos, ingenieros civiles y desarrolladores inmobiliarios.",
      price: "Desde $120",
      color: "highlight",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      image: "/images/products/tempImage0S1IMR.jpg",
      specs: [
        { label: "Escala", value: "1:50 a 1:500" },
        { label: "Base", value: "Incluida" },
        { label: "Detalles", value: "Alta fidelidad" },
        { label: "Montaje", value: "Profesional" },
      ],
      materials: ["PLA Blanco", "ABS", "Resina", "Multi-material"],
    },
    {
      id: 5,
      name: "Herramental y Moldes",
      description: "Fabricación de herramientas especializadas",
      longDescription:
        "Diseño y fabricación de herramientas de trabajo, fixtures, jigs y moldes personalizados. Optimiza tus procesos de producción con herramental a medida. Perfecto para talleres, manufactura y laboratorios.",
      price: "Desde $80",
      color: "accent",
      icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
      image: "/images/products/20251005_111435.jpg",
      specs: [
        { label: "Resistencia", value: "Alta durabilidad" },
        { label: "Tolerancias", value: "±0.05mm" },
        { label: "Aplicación", value: "Industrial" },
        { label: "Vida útil", value: "1000+ ciclos" },
      ],
      materials: ["Nylon CF", "PETG CF", "PC", "ABS"],
    },
    {
      id: 6,
      name: "Proyectos Custom",
      description: "Diseño y fabricación de proyectos únicos a medida",
      longDescription:
        "¿Tienes una idea pero no sabes cómo llevarla a cabo? Nuestro equipo de diseñadores e ingenieros te ayuda desde el concepto hasta la pieza final. Diseño 3D incluido, múltiples iteraciones y soporte técnico completo.",
      price: "Cotizar",
      color: "highlight",
      icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      image:
        "/images/products/Prova_Pixel_Esportazione_render_2025-Dec-23_10-28-25PM-000_CustomizedView19344926452.png",
      specs: [
        { label: "Diseño 3D", value: "Incluido" },
        { label: "Iteraciones", value: "Ilimitadas" },
        { label: "Soporte", value: "Completo" },
        { label: "Asesoría", value: "Técnica" },
      ],
      materials: ["Todos disponibles", "Multi-material", "Según necesidad"],
    },
  ];

  function openModal(product) {
    selectedProduct = product;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
    setTimeout(() => {
      selectedProduct = null;
    }, 300);
  }

  onMount(() => {
    gsap.set(".product-card", { opacity: 1, y: 0 });
    gsap.set(".catalog-title", { opacity: 1, y: 0 });

    gsap.from(".catalog-title", {
      scrollTrigger: {
        trigger: ".catalog-title",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".product-card", {
      scrollTrigger: {
        trigger: ".product-card",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  });


</script>

<section id="catalogo" class="relative py-32 px-6 bg-secondary/30">
  <div class="container mx-auto max-w-7xl">
    <h3
      class="catalog-title font-display text-5xl md:text-6xl font-bold text-center mb-6"
    >
      Nuestro <span class="text-highlight">Catálogo</span>
    </h3>

    <p
      class="font-body text-xl text-center text-gray-300 mb-20 max-w-3xl mx-auto"
    >
      Descubre la variedad de servicios que ofrecemos para transformar tus ideas
      en realidad
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each products as product}
        <div
          class="product-card group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40 bg-primary/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-{product.color}/20 hover:border-{product.color}/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          on:click={() => openModal(product)}
          tabindex="0"
          role="button"
          on:keydown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openModal(product);
            }
          }}
          aria-label={`Abrir ${product.name} - detalles`}
        >
          <div class="p-8">
            <div
              class="w-16 h-16 bg-{product.color}/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-{product.color}/30 transition-all duration-300"
            >
              <svg
                class="w-8 h-8 text-{product.color}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d={product.icon}
                ></path>
              </svg>
            </div>

            <h4
              class="font-display text-2xl font-bold mb-3 group-hover:text-{product.color} transition-colors duration-300"
            >
              {product.name}
            </h4>

            <p class="font-body text-gray-400 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div class="flex items-center justify-between">
              <span class="font-display text-xl font-bold text-{product.color}">
                {product.price}
              </span>
              <button
                on:click|stopPropagation={() => openModal(product)}
                class="px-4 py-2 bg-{product.color}/20 text-{product.color} rounded-lg hover:bg-{product.color} hover:text-primary transition-all duration-300 font-display text-sm font-bold"
              >
                Ver más
              </button>
            </div>
          </div>

          <div
            class="h-1 bg-gradient-to-r from-transparent via-{product.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
        </div>
      {/each}
    </div>

    <div class="mt-20 text-center">
      <p class="font-body text-lg text-gray-300 mb-6">
        ¿No encuentras lo que buscas? Trabajamos en proyectos personalizados
      </p>
      <a
        href="#contacto"
        class="inline-block px-8 py-4 bg-gradient-to-r from-accent to-highlight text-primary font-display font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      >
        Solicitar Cotización
      </a>
    </div>
  </div>

  <!-- Modal para detalles de producto -->
  <Modal
    bind:isOpen={isModalOpen}
    product={selectedProduct}
    onClose={closeModal}
  />
</section>

<style>

  :global(.bg-accent\/20) {
    background-color: rgba(0, 255, 136, 0.2);
  }
  :global(.bg-accent\/30) {
    background-color: rgba(0, 255, 136, 0.3);
  }
  :global(.bg-highlight\/20) {
    background-color: rgba(255, 0, 110, 0.2);
  }
  :global(.bg-highlight\/30) {
    background-color: rgba(255, 0, 110, 0.3);
  }
  :global(.border-accent\/20) {
    border-color: rgba(0, 255, 136, 0.2);
  }
  :global(.border-accent\/60) {
    border-color: rgba(0, 255, 136, 0.6);
  }
  :global(.border-highlight\/20) {
    border-color: rgba(255, 0, 110, 0.2);
  }
  :global(.border-highlight\/60) {
    border-color: rgba(255, 0, 110, 0.6);
  }
  :global(.text-accent) {
    color: #00ff88;
  }
  :global(.text-highlight) {
    color: #ff006e;
  }
  :global(.hover\:text-accent:hover) {
    color: #00ff88;
  }
  :global(.hover\:text-highlight:hover) {
    color: #ff006e;
  }
  :global(.hover\:bg-accent:hover) {
    background-color: #00ff88;
  }
  :global(.hover\:bg-highlight:hover) {
    background-color: #ff006e;
  }
</style>
