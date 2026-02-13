<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import gsap from "gsap";

  let canvas;
  let scene, camera, renderer;
  let models = [];
  let currentModelIndex = 0;
  let particles;
  let isTransitioning = false;
  let resizeObserver;
  let autoRotateInterval;

  const modelConfigs = [
    {
      type: "torusKnot",
      name: "Prototipo Complejo",
      geometry: () => new THREE.TorusKnotGeometry(2, 0.6, 200, 32),
      color: 0x00ff88,
    },
    {
      type: "dodecahedron",
      name: "Pieza Geométrica",
      geometry: () => new THREE.DodecahedronGeometry(2.5, 1),
      color: 0xff006e,
    },
    {
      type: "torus",
      name: "Anillo Industrial",
      geometry: () => new THREE.TorusGeometry(2, 0.8, 32, 100),
      color: 0x00d4ff,
    },
    {
      type: "octahedron",
      name: "Modelo Arquitectónico",
      geometry: () => new THREE.OctahedronGeometry(2.5, 2),
      color: 0xffaa00,
    },
  ];

  modelConfigs.forEach((c) => {
    c.hex = "#" + c.color.toString(16).padStart(6, "0");

    const col = new THREE.Color(c.color);
    c.rgb = `${Math.round(col.r * 255)}, ${Math.round(col.g * 255)}, ${Math.round(col.b * 255)}`;
  });

  function createModel(config) {
    const geometry = config.geometry();
    const material = new THREE.MeshPhongMaterial({
      color: config.color,
      emissive: config.color,
      emissiveIntensity: 0.5,
      shininess: 100,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);

    // Wireframe overlay
    const wireframeGeometry = config.geometry();
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    wireframeMesh.scale.multiplyScalar(1.02);

    const group = new THREE.Group();
    group.add(mesh);
    group.add(wireframeMesh);
    group.userData.config = config;

    return { group, mesh, wireframeMesh };
  }

  function switchModel(index) {
    if (isTransitioning || index === currentModelIndex) return;
    isTransitioning = true;

    const currentModel = models[currentModelIndex];
    const nextModel = models[index];

    gsap.to(currentModel.group.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        currentModel.group.visible = false;

        nextModel.group.scale.set(0, 0, 0);
        nextModel.group.visible = true;

        gsap.to(nextModel.group.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            isTransitioning = false;
          },
        });

        currentModelIndex = index;
      },
    });
  }

  onMount(() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // aspect se actualizará más abajo
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparente

    // Crear modelos
    modelConfigs.forEach((config, index) => {
      const model = createModel(config);
      model.group.visible = index === 0;
      if (index !== 0) model.group.scale.set(0, 0, 0);
      scene.add(model.group);
      models.push(model);
    });

    // Partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      const color = new THREE.Color();
      color.setHSL(Math.random() > 0.5 ? 0.35 : 0.9, 1, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0x00ff88, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0xff006e, 2, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    camera.position.z = 8;

    // Rotaciones continuas con GSAP
    models.forEach((model) => {
      gsap.to(model.mesh.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
      gsap.to(model.wireframeMesh.rotation, {
        y: -Math.PI * 2,
        x: Math.PI * 2,
        duration: 25,
        repeat: -1,
        ease: "none",
      });
    });

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      const currentModel = models[currentModelIndex];
      if (currentModel) {
        currentModel.group.rotation.x +=
          (mouseY * 0.3 - currentModel.group.rotation.x) * 0.05;
        currentModel.group.rotation.y +=
          (mouseX * 0.3 - currentModel.group.rotation.y) * 0.05;
      }
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    // Auto-rotate entre modelos cada 5s
    autoRotateInterval = setInterval(() => {
      const nextIndex = (currentModelIndex + 1) % models.length;
      switchModel(nextIndex);
    }, 5000);

    // Responsive
    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    // Observador para cambios de tamaño del contenedor del canvas
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // llamada inicial
    handleResize();

    // Animaciones de texto
    gsap.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.3,
    });
    gsap.from(".hero-subtitle", {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.6,
    });
    gsap.from(".hero-cta", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
      delay: 0.9,
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      if (autoRotateInterval) clearInterval(autoRotateInterval);
      renderer.dispose();
    };
  });
</script>

<!-- LAYOUT: canvas a la izquierda, contenido a la derecha -->
<section
  id="inicio"
  class="relative min-h-screen flex flex-col md:flex-row overflow-hidden"
>
  <!-- LEFT: Canvas (3D) -->
  <div class="w-full md:w-1/2 h-[70vh] md:h-screen bg-transparent relative">
    <!-- canvas ocupa todo el contenedor izquierdo -->
    <canvas bind:this={canvas} class="absolute inset-0 w-full h-full block"
    ></canvas>
  </div>

  <!-- RIGHT: Contenido (texto) -->
  <div
    class="w-full md:w-1/2 flex items-center justify-center p-8 relative z-10"
  >
    <div class="max-w-xl text-left">
      <h2
        class="hero-title font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight"
      >
        <span class="text-glow">JKRAFT</span>
        <span class="text-glow-pink">3D</span>
      </h2>

      <p
        class="hero-subtitle font-body text-lg md:text-xl mb-6 text-gray-300 font-light"
      >
        Transformamos tus ideas en realidad física con tecnología de impresión
        3D de última generación
      </p>

      <!-- Indicador de modelo actual -->
      <div class="hero-model-name mb-6">
        <p class="font-display text-sm text-accent/80 mb-1">Modelo actual:</p>
        <p class="font-body text-lg font-semibold">
          {modelConfigs[currentModelIndex].name}
        </p>
      </div>
      <!-- Controles -->
      <div class="hero-model-controls flex gap-2 justify-start mb-6 flex-wrap">
        {#each modelConfigs as config, i}
          <button
            on:click={() => switchModel(i)}
            aria-label={config.name}
            disabled={isTransitioning}
            class="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none"
            style={i === currentModelIndex
              ? `border: 1.5px solid ${config.hex};
             background: rgba(${config.rgb},0.12);
             box-shadow: 0 4px 14px rgba(${config.rgb},0.18);`
              : `border: 1.5px solid rgba(255,255,255,0.08);
             background: rgba(255,255,255,0.02);`}
          >
            <!-- punto interior -->
            <span
              class="rounded-full block transition-all duration-200"
              style={i === currentModelIndex
                ? `width: 8px; height: 8px; background: ${config.hex};
               box-shadow: 0 0 10px ${config.hex}55`
                : `width: 7px; height: 7px;
               background: rgba(255,255,255,0.15)`}
            ></span>
          </button>
        {/each}
      </div>

      <div class="hero-cta flex gap-4 justify-start flex-wrap">
        <a
          href="#catalogo"
          class="px-6 py-3 bg-accent text-primary font-display font-bold rounded-lg hover:bg-accent/80 transition-all duration-300 box-glow transform hover:scale-105"
        >
          Ver Catálogo
        </a>
        <a
          href="#contacto"
          class="px-6 py-3 border-2 border-highlight text-highlight font-display font-bold rounded-lg hover:bg-highlight hover:text-primary transition-all duration-300 transform hover:scale-105"
        >
          Contactar
        </a>
      </div>

      <!-- métricas -->
      <div
        class="mt-10 flex gap-8 justify-start text-sm font-body text-gray-300"
      >
        <div>
          <p class="text-accent text-2xl font-display font-bold">500+</p>
          <p class="text-gray-400 mt-1">Proyectos</p>
        </div>
        <div>
          <p class="text-accent text-2xl font-display font-bold">24h</p>
          <p class="text-gray-400 mt-1">Producción</p>
        </div>
        <div>
          <p class="text-accent text-2xl font-display font-bold">100%</p>
          <p class="text-gray-400 mt-1">Satisfacción</p>
        </div>
      </div>
    </div>
  </div>
</section>
