# 🚀 Vole Apex

A cinematic, scroll-driven product showcase website built with modern web technologies and AI-assisted development.

---

## 🌟 Overview

Vole Apex is an immersive frontend project that demonstrates how scroll-based animations and canvas rendering can be combined to create a premium storytelling experience.

Instead of using traditional video, the project renders a sequence of high-quality frames on a canvas, synchronized with user scroll to deliver smooth, interactive visuals.

---

## ✨ Features

* 🎞️ Scroll-controlled frame-by-frame animation
* ⚡ Smooth canvas rendering for high performance
* 🎯 Custom scroll handling and progress mapping
* 🔄 Auto-play animation after scroll threshold
* 🎨 Cinematic UI with modern design aesthetics
* 🧠 Built using AI-assisted "vibe coding" workflow

---

## 🛠️ Tech Stack

* HTML5 Canvas
* JavaScript (Vanilla)
* GSAP (for animations)
* Tailwind CSS
* Image Sequence Rendering

---

## 🧩 How It Works

1. **Preloading Frames**

   * All animation frames are loaded into memory before interaction.

2. **Scroll Tracking**

   * Scroll position is converted into a progress value (0 → 1).

3. **Frame Mapping**

   * Progress is mapped to frame index:

     ```js
     index = Math.floor(progress * maxFrames);
     ```

4. **Canvas Rendering**

   * Corresponding frame is drawn on the canvas.

5. **Automation Logic**

   * After a certain scroll threshold, animation continues automatically.

---

## 📁 Project Structure

```
/project
│── index.html
│── style.css
│── script.js
│── /frames
│     ├── frame_1.png
│     ├── frame_2.png
│     └── ...
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/vole-apex.git
```

### 2. Open in browser

Simply open `index.html` in your browser.

---

## 🧠 Vibe Coding Approach

This project was developed using a modern "vibe coding" workflow:

* AI-assisted logic generation
* Rapid prototyping through iteration
* UI/UX inspired by premium product websites
* Continuous refinement via prompt-based development

---

## 📸 Use Cases

* Product showcase websites
* Portfolio landing pages
* Interactive storytelling experiences
* Brand presentation microsites

---

## 🔮 Future Improvements

* Add mobile optimization
* Integrate WebGL for better performance
* Lazy loading for frames
* Add sound design for immersive experience

---

## 👨‍💻 Author

**Swaroop Naik**

## Live Link

https://swaroopnaik885.github.io/Vole-Apex/

---

## 📜 License

This project is open-source and available under the MIT License.
