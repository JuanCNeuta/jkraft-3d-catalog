<script>
  import { onMount } from "svelte";
  import gsap from "gsap";

  export let isOpen = false;
  export let onClose = () => {};
  export let product = null;

  let modalElement;

  $: if (isOpen && modalElement) {
    document.body.style.overflow = "hidden";
    gsap.fromTo(
      modalElement,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
    );
  } else if (!isOpen) {
    document.body.style.overflow = "auto";
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function closeModal() {
    gsap.to(modalElement, {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      ease: "power2.in",
      onComplete: onClose,
    });
  }

  function handleKeydown(e) {
    if (e.key === "Escape" && isOpen) {
      closeModal();
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  });
</script>

{#if isOpen && product}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/90 backdrop-blur-lg"
    on:click={handleBackdropClick}
    on:keydown={(e) => e.key === "Enter" && handleBackdropClick(e)}
    role="button"
    tabindex="-1"
    bind:this={modalElement}
  >
    <div
      class="bg-secondary rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-accent/30 shadow-2xl"
    >
      <!-- Header -->
      <div
        class="sticky top-0 bg-secondary/95 backdrop-blur-sm border-b border-accent/20 p-6 flex items-center justify-between"
      >
        <h3 class="font-display text-3xl font-bold text-accent">
          {product.name}
        </h3>
        <button
          on:click={closeModal}
          class="w-10 h-10 rounded-lg bg-highlight/20 hover:bg-highlight/40 transition-all duration-300 flex items-center justify-center group"
        >
          <svg
            class="w-6 h-6 text-highlight group-hover:rotate-90 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-8">
        <div
          class="mb-8 rounded-xl overflow-hidden bg-primary/50 aspect-video flex items-center justify-center border border-accent/20 modal-image"
        >
          {#if product.image}
            <img src={product.image} alt={product.name} loading="lazy" />
          {:else}
            <div class="text-center p-8">
              <svg
                class="w-24 h-24 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style="color: var(--color-{product.color}, #fff)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d={product.icon}
                ></path>
              </svg>
              <p class="font-display text-gray-400">Vista 3D del producto</p>
            </div>
          {/if}
        </div>

        <!-- Descripción detallada -->
        <div class="mb-8">
          <h4 class="font-display text-xl font-bold mb-4 text-highlight">
            Descripción
          </h4>
          <p class="font-body text-gray-300 leading-relaxed mb-4">
            {product.description}
          </p>
          <p class="font-body text-gray-300 leading-relaxed">
            {product.longDescription}
          </p>
        </div>

        <!-- Especificaciones -->
        <div class="mb-8">
          <h4 class="font-display text-xl font-bold mb-4 text-highlight">
            Especificaciones
          </h4>
          <div class="grid md:grid-cols-2 gap-4">
            {#each product.specs as spec}
              <div class="bg-primary/50 p-4 rounded-lg border border-accent/10">
                <p class="font-display text-sm text-accent mb-1">
                  {spec.label}
                </p>
                <p class="font-body text-white">{spec.value}</p>
              </div>
            {/each}
          </div>
        </div>

        <!-- Materiales disponibles -->
        <div class="mb-8">
          <h4 class="font-display text-xl font-bold mb-4 text-highlight">
            Materiales Disponibles
          </h4>
          <div class="flex flex-wrap gap-3">
            {#each product.materials as material}
              <span
                class="px-4 py-2 bg-accent/10 text-accent rounded-lg border border-accent/30 font-display text-sm"
              >
                {material}
              </span>
            {/each}
          </div>
        </div>

        <!-- Precio y CTA -->
        <div
          class="flex items-center justify-between gap-4 pt-6 border-t border-accent/20"
        >
          <div>
            <p class="font-display text-sm text-gray-400 mb-1">Precio desde</p>
            <p class="font-display text-3xl font-bold text-accent">
              {product.price}
            </p>
          </div>
          <a
            href="#contacto"
            on:click={closeModal}
            class="px-8 py-4 bg-gradient-to-r from-accent to-highlight text-primary font-display font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Solicitar Cotización
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(.text-accent) {
    color: #00ff88;
  }
  :global(.text-highlight) {
    color: #ff006e;
  }
</style>
