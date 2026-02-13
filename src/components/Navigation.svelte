<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  
  let isScrolled = false;

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled ? 'bg-secondary/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}">
  <div class="container mx-auto px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="nav-item">
        <h1 class="font-display text-2xl font-bold tracking-tight">
          <span class="text-accent">J</span>kraft <span class="text-highlight">3D</span>
        </h1>
      </div>
      
      <ul class="flex gap-8 items-center">
        <li class="nav-item">
          <a href="#inicio" class="font-body font-medium hover:text-accent transition-colors duration-300">
            Inicio
          </a>
        </li>
        <li class="nav-item">
          <a href="#nosotros" class="font-body font-medium hover:text-accent transition-colors duration-300">
            Nosotros
          </a>
        </li>
        <li class="nav-item">
          <a href="#catalogo" class="font-body font-medium hover:text-accent transition-colors duration-300">
            Catálogo
          </a>
        </li>
        <li class="nav-item">
          <a href="#galeria" class="font-body font-medium hover:text-accent transition-colors duration-300">
            Galería
          </a>
        </li>
        <li class="nav-item">
          <a href="#contacto" class="font-body font-medium hover:text-accent transition-colors duration-300 px-4 py-2 border border-accent rounded-lg hover:bg-accent hover:text-primary">
            Contacto
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
