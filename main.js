
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.module.js';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,                   
  window.innerWidth / window.innerHeight,
  0.1,                  
  1000                
);
camera.position.set(0, 6, 12); 
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 6, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x050505 });
const monolith = new THREE.Mesh(geometry, material);
scene.add(monolith);

const ambientLight = new THREE.AmbientLight(0x111111);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x8800ff, 3, 20);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);


function animate() {
  requestAnimationFrame(animate);
  
    monolith.rotation.y += 0.001;
  
  renderer.render(scene, camera);
}

animate();
