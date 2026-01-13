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
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const monolith = new THREE.Mesh(geometry, material);//this is the pole i was talikng about earlier when i said there was a long rectangle...
scene.add(monolith);
camera.lookAt(monolith.position);  // make sure it's looking at the center

// Lighting
scene.add(new THREE.AmbientLight(0x111111));
const pointLight = new THREE.PointLight(0x8800ff, 3, 20);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// First Planet
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffcc, emissive: 0x0000ff, emissiveIntensity: 2,  metalness: 0.5 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

const planets = [
    { radius: 0.7, distance: 5, speed: 0.5, color: 0x00ffcc },
    { radius: 0.5, distance: 7, speed: 0.2, color: 0xffaa00 },
    { radius: 0.4, distance: 9, speed: -0.3, color: 0x8833ff },
];

const planetMeshes = []
planets.forEach(p => {
    const geo = new THREE.SphereGeometry(p.radius, 32, 32)
    const mat = new THREE.MeshStandardMaterial({ color: p.color, metalness: 0.5, roughness: 0.5 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    planetMeshes.push(mesh);
})

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
