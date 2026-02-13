<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let formData = {
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  };

  let formStatus = {
    submitted: false,
    loading: false,
    error: false
  };

  function handleSubmit(e) {
    e.preventDefault();
    
    formStatus.loading = true;
    
    setTimeout(() => {
      formStatus.loading = false;
      formStatus.submitted = true;
      
      // Animación de éxito
      gsap.from('.success-message', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
      
      // Reset después de 3 segundos
      setTimeout(() => {
        formStatus.submitted = false;
        formData = { name: '', email: '', phone: '', project: '', message: '' };
      }, 3000);
    }, 1500);
  }

  onMount(() => {
    // Asegurar visibilidad inicial
    gsap.set('.contact-title', { opacity: 1, y: 0 });
    gsap.set('.contact-form', { opacity: 1, x: 0 });
    gsap.set('.contact-info', { opacity: 1, x: 0 });

    gsap.from('.contact-title', {
      scrollTrigger: {
        trigger: '.contact-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.contact-form', {
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.contact-info', {
      scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });
</script>

<section id="contacto" class="relative py-32 px-6">
  <div class="container mx-auto max-w-7xl">
    <h3 class="contact-title font-display text-5xl md:text-6xl font-bold text-center mb-6">
      <span class="text-accent">Contacto</span>
    </h3>
    
    <p class="font-body text-xl text-center text-gray-300 mb-20 max-w-3xl mx-auto">
      ¿Listo para comenzar tu proyecto? Estamos aquí para ayudarte
    </p>

    <div class="grid md:grid-cols-2 gap-12">
      <!-- Formulario -->
      <div class="contact-form">
        {#if formStatus.submitted}
          <div class="success-message bg-accent/10 border-2 border-accent rounded-2xl p-12 text-center">
            <svg class="w-20 h-20 text-accent mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h4 class="font-display text-3xl font-bold text-accent mb-4">¡Mensaje Enviado!</h4>
            <p class="font-body text-gray-300">Te contactaremos muy pronto</p>
          </div>
        {:else}
          <form on:submit={handleSubmit} class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block font-display text-sm font-bold mb-2 text-accent">
                  Nombre *
                </label>
                <input
                  id="name"
                  type="text"
                  bind:value={formData.name}
                  required
                  class="w-full px-4 py-3 bg-secondary/50 border border-accent/20 rounded-lg focus:border-accent focus:outline-none transition-all duration-300 font-body"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label for="email" class="block font-display text-sm font-bold mb-2 text-accent">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  bind:value={formData.email}
                  required
                  class="w-full px-4 py-3 bg-secondary/50 border border-accent/20 rounded-lg focus:border-accent focus:outline-none transition-all duration-300 font-body"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="phone" class="block font-display text-sm font-bold mb-2 text-accent">
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  bind:value={formData.phone}
                  class="w-full px-4 py-3 bg-secondary/50 border border-accent/20 rounded-lg focus:border-accent focus:outline-none transition-all duration-300 font-body"
                  placeholder="+57 300 123 4567"
                />
              </div>

              <div>
                <label for="project" class="block font-display text-sm font-bold mb-2 text-accent">
                  Tipo de Proyecto
                </label>
                <select
                  id="project"
                  bind:value={formData.project}
                  class="w-full px-4 py-3 bg-secondary/50 border border-accent/20 rounded-lg focus:border-accent focus:outline-none transition-all duration-300 font-body"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="prototipo">Prototipo</option>
                  <option value="repuesto">Pieza de Repuesto</option>
                  <option value="decorativo">Figura Decorativa</option>
                  <option value="maqueta">Maqueta</option>
                  <option value="herramental">Herramental</option>
                  <option value="custom">Proyecto Custom</option>
                </select>
              </div>
            </div>

            <div>
              <label for="message" class="block font-display text-sm font-bold mb-2 text-accent">
                Mensaje *
              </label>
              <textarea
                id="message"
                bind:value={formData.message}
                required
                rows="6"
                class="w-full px-4 py-3 bg-secondary/50 border border-accent/20 rounded-lg focus:border-accent focus:outline-none transition-all duration-300 font-body resize-none"
                placeholder="Cuéntanos sobre tu proyecto..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formStatus.loading}
              class="w-full px-8 py-4 bg-accent text-primary font-display font-bold rounded-lg hover:bg-accent/80 transition-all duration-300 box-glow transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {#if formStatus.loading}
                <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              {:else}
                Enviar Mensaje
              {/if}
            </button>
          </form>
        {/if}
      </div>

      <!-- Información de contacto -->
      <div class="contact-info space-y-8">
        <div class="bg-secondary/50 backdrop-blur-sm p-8 rounded-2xl border border-accent/20">
          <h4 class="font-display text-2xl font-bold mb-6 text-accent">Información de Contacto</h4>
          
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <p class="font-display text-sm font-bold text-gray-400 mb-1">Email</p>
                <a href="/cdn-cgi/l/email-protection#b8dbd7d6ccd9dbccd7f8d2d3cad9decc8bdc96dbd7d5" class="font-body text-lg hover:text-accent transition-colors">
                  <span class="__cf_email__" data-cfemail="25464a4b514446514a654f4e5744435116410b464a48">jkraft3d@gmail.com</span>
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-highlight/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <p class="font-display text-sm font-bold text-gray-400 mb-1">Teléfono</p>
                <a href="tel:+573001234567" class="font-body text-lg hover:text-highlight transition-colors">
                  +57 300 123 4567
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <p class="font-display text-sm font-bold text-gray-400 mb-1">Ubicación</p>
                <p class="font-body text-lg">Medellín, Colombia</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-accent/10 to-highlight/10 p-8 rounded-2xl border border-accent/20">
          <h4 class="font-display text-xl font-bold mb-4">Horario de Atención</h4>
          <div class="space-y-2 font-body text-gray-300">
            <p>Lunes - Viernes: 8:00 AM - 6:00 PM</p>
            <p>Sábados: 9:00 AM - 2:00 PM</p>
            <p>Domingos: Cerrado</p>
          </div>
        </div>

        <div class="flex gap-4">
          <button class="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300" aria-label="Facebook">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button class="w-12 h-12 bg-highlight/20 rounded-lg flex items-center justify-center hover:bg-highlight hover:text-primary transition-all duration-300" aria-label="Instagram">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </button>
          <button class="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300" aria-label="Twitter">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>