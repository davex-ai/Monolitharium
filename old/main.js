import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.module.js';

// ── Renderer ──────────────────────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1); // solid black — no white bleed
document.body.appendChild(renderer.domElement);

// ── Scene & Camera ────────────────────────────────────────────────────────────
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 18);

// ── Resize handler — keeps canvas filling viewport ───────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ── Monolith ──────────────────────────────────────────────────────────────────
const geometry = new THREE.BoxGeometry(2, 6, 1);
// Dark obsidian-like material — visible but mysterious
const material = new THREE.MeshStandardMaterial({
  color: 0x1a0a2e,
  metalness: 0.9,
  roughness: 0.15,
  emissive: 0x220044,
  emissiveIntensity: 0.4,
});
const monolith = new THREE.Mesh(geometry, material);
scene.add(monolith);
camera.lookAt(monolith.position);

// ── Lighting ──────────────────────────────────────────────────────────────────
// Enough ambient to make everything visible
scene.add(new THREE.AmbientLight(0x443366, 1.2));

// Main purple point light at center
const pointLight = new THREE.PointLight(0x8800ff, 6, 60);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Cyan rim light from above-right — separates monolith from bg
const rimLight = new THREE.PointLight(0x00ffcc, 3, 40);
rimLight.position.set(8, 8, -5);
scene.add(rimLight);

// Soft warm fill from below
const fillLight = new THREE.PointLight(0xff6600, 1.5, 30);
fillLight.position.set(-6, -4, 6);
scene.add(fillLight);

// ── Starfield ─────────────────────────────────────────────────────────────────
const starGeo = new THREE.BufferGeometry();
const starPositions = [];
for (let i = 0; i < 2000; i++) {
  starPositions.push(
    (Math.random() - 0.5) * 400,
    (Math.random() - 0.5) * 400,
    (Math.random() - 0.5) * 400
  );
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3, sizeAttenuation: true });
scene.add(new THREE.Points(starGeo, starMat));

// ── Planets ───────────────────────────────────────────────────────────────────
const planets = [
  { radius: 0.75, distance: 5,  speed: 0.8,  color: 0x00ffcc, brightness: 1.4,  flicker: 0.10 },
  { radius: 0.55, distance: 7,  speed: 0.5,  color: 0xffaa00, brightness: 1.6,  flicker: 0.05 },
  { radius: 0.84, distance: 9,  speed: -0.7, color: 0xaa44ff, brightness: 1.2,  flicker: 0.08 },
  { radius: 1.00, distance: 11, speed: -0.3, color: 0x00ffcc, brightness: 1.5,  flicker: 0.07 },
];

const planetMeshes = [];

planets.forEach(p => {
  const geo = new THREE.SphereGeometry(p.radius, 32, 32);
  const color = new THREE.Color(p.color).multiplyScalar(p.brightness);
  const mat = new THREE.MeshStandardMaterial({
    color: color,
    emissive: new THREE.Color(p.color).multiplyScalar(0.35),
    metalness: 0.4,
    roughness: 0.4,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.userData.baseColor = color.clone();
  mesh.userData.baseEmissive = new THREE.Color(p.color).multiplyScalar(0.35);
  scene.add(mesh);
  planetMeshes.push(mesh);

  // Orbit ring
  const ringGeo = new THREE.TorusGeometry(p.distance, 0.012, 8, 160);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x332255, transparent: true, opacity: 0.5 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);
});

// ── Speed control ─────────────────────────────────────────────────────────────
let speedMultiplier = 1.0;
const slider = document.getElementById('speedSlider');
const speedVal = document.getElementById('speedVal');

slider.addEventListener('input', () => {
  speedMultiplier = parseFloat(slider.value);
  speedVal.textContent = speedMultiplier.toFixed(1) + 'x';
});

// ── Animate ───────────────────────────────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);

  const time = performance.now() * 0.001;

  monolith.rotation.y += 0.001;

  planetMeshes.forEach((mesh, i) => {
    const p = planets[i];
    const angle = time * p.speed * speedMultiplier;

    mesh.position.x = Math.cos(angle) * p.distance;
    mesh.position.z = Math.sin(angle) * p.distance;
    mesh.position.y = Math.sin(angle * 0.3) * 0.5;

    const flicker = 1 + Math.sin(time * 5 + i) * p.flicker;
    mesh.material.color.copy(mesh.userData.baseColor).multiplyScalar(flicker);
  });

  renderer.render(scene, camera);
}

animate();
