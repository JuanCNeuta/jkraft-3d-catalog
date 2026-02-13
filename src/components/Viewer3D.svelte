<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let canvas;
  let scene, camera, renderer;
  let currentModel;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let selectedModelIndex = 0;
  let isLoading = false;

  const models3D = [
    {
      name: 'Engranaje Industrial',
      description: 'Pieza mecánica de precisión',
      path: '/models/ImageToStl.com_shredder.glb',
      size: 8.0
    },
    {
      name: 'Contenedor Modular',
      description: 'Organizador personalizado',
      path: '/models/ImageToStl.com_Universal+Hex+box+main.glb',
      size: 8.0
    },
    {
      name: 'Soporte Ergonómico',
      description: 'Diseño funcional optimizado',
      path: '/models/ImageToStl.com_Crochet_velux_V3.glb'
    },
    {
      name: 'Estructura Parametrica',
      description: 'Diseño generativo',
      path: '/models/ImageToStl.com_Dalpek_Rail_Knot_08.glb'
    }
  ];

function loadModel(index) {
    if (isLoading) return;
    
    // Limpieza total del modelo anterior
    if (currentModel) {
      scene.remove(currentModel);
      currentModel.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    }

    selectedModelIndex = index;
    isLoading = true;

    const loader = new GLTFLoader();
    loader.load(
      models3D[index].path,
      (gltf) => {
        const model = gltf.scene;

        // Forzar actualización de coordenadas para que Three.js sepa dónde está cada pieza
        model.updateMatrixWorld(true);

        // Calcular la caja contenedora real
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // CENTRADO INTERNO: Movemos el modelo para que su centro geográfico
        model.position.x += (model.position.x - center.x);
        model.position.y += (model.position.y - center.y);
        model.position.z += (model.position.z - center.z);

        // CREAR CONTENEDOR
        const wrapper = new THREE.Group();
        wrapper.add(model);
        scene.add(wrapper);
        currentModel = wrapper;

        // ESCALADO
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.5 / maxDim;
        
        wrapper.scale.set(0, 0, 0);
        
        // POSICIÓN DE LA CÁMARA (Vista desde arriba)
        camera.position.set(0, 3, 5); 
        camera.lookAt(0, 0, 0);

        // Animación de entrada con GSAP sobre el WRAPPER
        gsap.to(wrapper.scale, {
          x: scale,
          y: scale,
          z: scale,
          duration: 0.8,
          ease: 'back.out(1.7)'
        });

        isLoading = false;
      },
      undefined,
      (error) => {
        console.error('Error cargando el modelo:', error);
        isLoading = false;
      }
    );
  }

  onMount(() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace; 
    
    const size = Math.min(canvas.parentElement.clientWidth, 500);
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    camera.position.z = 6;
    camera.position.set(0, 3, 5); 

    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    
    const pointLight2 = new THREE.PointLight(0xff006e, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    // Cargar primer modelo
    loadModel(0);

    const handleStart = (x, y) => {
      isDragging = true;
      previousMousePosition = { x, y };
    };

    const handleMove = (x, y) => {
      if (isDragging && currentModel) {
        const deltaX = x - previousMousePosition.x;
        const deltaY = y - previousMousePosition.y;
        
        currentModel.rotation.y += deltaX * 0.01;
        currentModel.rotation.x += deltaY * 0.01;
        
        previousMousePosition = { x, y };
      }
    };

    const handleEnd = () => isDragging = false;

    // Mouse Events
    canvas.addEventListener('mousedown', e => handleStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', e => handleMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', handleEnd);

    // Touch Events
    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) handleStart(e.touches[0].clientX, e.touches[0].clientY);
    });
    window.addEventListener('touchmove', e => {
      if (isDragging && e.touches.length === 1) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    });
    window.addEventListener('touchend', handleEnd);
    
    // Animation Loop
    let reqId;
    function animate() {
      reqId = requestAnimationFrame(animate);
      if (currentModel && !isDragging) {
        currentModel.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    }
    animate();
    
    // Scroll Animation GSAP
    gsap.set('.viewer-title', { opacity: 1, y: 0 });
    gsap.from('.viewer-title', {
      scrollTrigger: {
        trigger: '.viewer-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
    
    return () => {
      cancelAnimationFrame(reqId);
      renderer.dispose();
      window.removeEventListener('mousemove', handleMove); // Limpieza de listeners globales
      window.removeEventListener('mouseup', handleEnd);
    };
  });
</script>

<section id="visualizador" class="relative py-32 px-6 bg-secondary/30">
  <div class="container mx-auto max-w-6xl">
    <h3 class="viewer-title font-display text-5xl md:text-6xl font-bold text-center mb-6">
      Visualizador <span class="text-accent">3D</span>
    </h3>
    
    <p class="font-body text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
      Interactúa con nuestros modelos. Arrastra para rotar, explora desde cualquier ángulo
    </p>

    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="relative">
        <div class="aspect-square bg-primary/50 rounded-2xl border-2 border-accent/30 overflow-hidden relative">
          
          <canvas bind:this={canvas} class="w-full h-full cursor-grab active:cursor-grabbing"></canvas>
          
          {#if isLoading}
            <div class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10 transition-all">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          {/if}

          <div class="absolute bottom-4 left-4 right-4 bg-secondary/90 backdrop-blur-sm rounded-lg p-3 border border-accent/20 pointer-events-none select-none">
            <p class="font-display text-xs text-accent text-center">
              🖱️ Arrastra para rotar • 📱 Desliza en móvil
            </p>
          </div>
        </div>
      </div>
      
      <div class="space-y-4">
        <h4 class="font-display text-2xl font-bold mb-6 text-highlight">
          Selecciona un Modelo
        </h4>
        
        {#each models3D as model, i}
          <button
            on:click={() => loadModel(i)}
            disabled={isLoading}
            class="w-full p-6 rounded-xl border-2 transition-all duration-300 text-left 
            {i === selectedModelIndex ? 'border-accent bg-accent/10 shadow-lg' : 'border-accent/20 bg-secondary/50 hover:border-accent/50 hover:bg-secondary'}
            {isLoading ? 'opacity-50 cursor-not-allowed' : ''}"
          >
            <h5 class="font-display text-xl font-bold mb-2 {i === selectedModelIndex ? 'text-accent' : 'text-white'}">
              {model.name}
            </h5>
            <p class="font-body text-sm text-gray-400">
              {model.description}
            </p>
          </button>
        {/each}
        
        <div class="pt-6">
          <a href="#contacto" class="block w-full px-6 py-4 bg-gradient-to-r from-accent to-highlight text-primary font-display font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
            Solicitar Modelo Personalizado
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  :global(.text-accent) { color: #00ff88; }
  :global(.text-highlight) { color: #ff006e; }
</style>