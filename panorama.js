import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Загружаем 360° панораму (equirectangular)
const texture = new THREE.TextureLoader().load(
  "https://dl.dropboxusercontent.com/s/4oyuk9astyo08cv/Panorama8.png"
); // замените на свою картинку
const geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1); // внутренняя сторона сферы
const material = new THREE.MeshBasicMaterial({ map: texture });

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.set(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.0005; // медленное вращение
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
