// app.js
// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(
  75,                 // FOV
  window.innerWidth / window.innerHeight,
  0.1,                // near
  1000                // far
);
camera.position.set(0, 6, 12); // starting position

// 3. Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Monolith (you can tweak dimensions)
const geometry = new THREE.BoxGeometry(1, 6, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x050505 });
const monolith = new THREE.Mesh(geometry, material);
scene.add(monolith);

// 5. Lighting
const ambientLight = new THREE.AmbientLight(0x111111);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x8800ff, 3, 20);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const sphere = new THREE.SphereGeometry(1, 23, 3)

// 6. Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Monolith slow rotation
  monolith.rotation.y += 0.001;
  
  renderer.render(scene, camera);
}

animate();
