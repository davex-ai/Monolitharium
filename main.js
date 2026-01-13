import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.module.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 15);


// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Monolith
const geometry = new THREE.BoxGeometry(2, 6, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const monolith = new THREE.Mesh(geometry, material);//this is the pole i was talikng about earlier when i said there was a long rectangle...
scene.add(monolith);
camera.lookAt(monolith.position);  // make sure it's looking at the center

// Lighting
scene.add(new THREE.AmbientLight(0x111111));
const pointLight = new THREE.PointLight(0x8800ff, 3, 20);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const planets = [
    { radius: 0.75, distance: 5, speed: 3, color: 0x00ffcc, brightness: 1 },
    { radius: 0.55, distance: 7, speed: 2, color: 0xffaa00, brightness: 1.3 },
    { radius: 0.84, distance: 9, speed: -3, color: 0x8833ff, brightness: 0.7 },
    { radius: 1, distance: 11, speed: -1, color: 0x00ffcc, brightness: 1.1 },
];


const planetMeshes = []
planets.forEach(p => {
    const geo = new THREE.SphereGeometry(p.radius, 32, 32)
    const color = new THREE.Color(p.color);
    color.multiplyScalar(p.brightness);
const mat = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.5,
        roughness: 0.5
    });     
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    planetMeshes.push(mesh);
})

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Monolith slow rotation
    monolith.rotation.y += 0.001

    // Planet orbit
    const time = performance.now() * 0.001;
    const radius = 5;
    // sphere.position.x = Math.cos(time) * radius;
    // sphere.position.z = Math.sin(time) * radius;
    // sphere.position.y = Math.sin(time * 0.3) * 0.3; // vertical drift
    planetMeshes.forEach((mesh, i) => {
    const p = planets[i];
    const angle = time * p.speed; // unique speed for each
    mesh.position.x = Math.cos(angle) * p.distance;
    mesh.position.z = Math.sin(angle) * p.distance;
    mesh.position.y = Math.sin(angle * 0.3) * 0.3; // optional vertical drift
});

    renderer.render(scene, camera);
}

animate();
