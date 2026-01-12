import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.module.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 12);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Monolith
const geometry = new THREE.BoxGeometry(1, 6, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x050505 });
const monolith = new THREE.Mesh(geometry, material);
scene.add(monolith);
camera.lookAt(monolith.position);  // make sure it's looking at the center

// Lighting
scene.add(new THREE.AmbientLight(0x111111));
const pointLight = new THREE.PointLight(0x8800ff, 3, 20);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// First Planet
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Monolith slow rotation
    monolith.rotation.y += 0.001;

    // Planet orbit
    const time = performance.now() * 0.001;
    const radius = 5;
    sphere.position.x = Math.cos(time) * radius;
    sphere.position.z = Math.sin(time) * radius;
    sphere.position.y = Math.sin(time * 0.3) * 0.3; // vertical drift

    renderer.render(scene, camera);
}

animate();
