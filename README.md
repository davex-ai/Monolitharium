# Silent Orbit

**Silent Orbit** is a Three.js simulation of a monolith surrounded by orbiting planets.  
Each planet has its own orbit, speed, and subtle “flicker,” giving the system a natural, dynamic, and slightly mysterious feel.

---

## Features

- **Monolith centerpiece:** A tall, imposing central monolith that slowly rotates.  
- **Orbiting planets:** Multiple planets with unique sizes, distances, and speeds.  
- **Subtle flicker:** Planets dynamically shift brightness as they orbit, mimicking natural light reflections.  
- **Dark aesthetic:** Designed with a moody, minimalistic visual style.  

---

## Technologies

- [Three.js](https://threejs.org/) for 3D rendering
- HTML, CSS, and JavaScript for lightweight, browser-friendly setup  

---

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/yourusername/silent-orbit.git
```
### Open index.html in your browser.
(No server required; works locally.)

## File Structure
```t
monolith/
├─ index.html      # Main HTML file
├─ app.js          # Three.js setup and animation logic
└─ README.md       # Project overview
```
Customization

Adjust planets array in app.js to add or modify planets:

radius – size of the planet

distance – orbit radius from the monolith

speed – rotation speed (positive or negative)

color – planet color

flicker – subtle brightness variation

Adjust monolith geometry or color for personal style.

## Inspiration
- Inspired by a personal vision of cosmic systems, orbiting around a silent, indifferent monolith.
- [Gazi](https://github.com/gazijarin)
The project was a personal exploration of 3D motion, lighting, and aesthetic coding in Three.js.

## Demo
