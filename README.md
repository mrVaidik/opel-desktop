


# 🚀 Opel Desktop App

Opel is a modern Electron desktop application built using Vite, React, Tailwind CSS, and TypeScript. This app is designed to be fast, efficient, and easy to maintain.

---

## 📦 Tech Stack

- ⚛️ React
- ⚡ Vite
- 🧠 TypeScript
- 🖼️ Tailwind CSS
- 🖥️ Electron
- 🧰 ESLint + Prettier
- 📦 Electron Builder for packaging

---

## 🔧 Installation

Make sure you have **Node.js ≥ 18** installed.

```bash
git clone https://github.com/your-username/opel.git
cd opel
npm install
```

> If you face dependency errors, use:

```bash
npm install --force
```

---

## 🚀 Development

Start the app in development mode:

```bash
npm run dev
```

This runs:

* Vite for frontend
* Electron in dev mode

---

## 🛠️ Build

To build the app for production (create `.exe`, `.dmg`, etc.):

```bash
npm run build
```

Output will be inside the `/release` folder.

---

## 📁 Project Structure

```
├── dist/              # Vite build output
├── dist-electron/     # Electron build output
├── electron/          # Electron main process
├── public/            # Static assets
├── src/               # React source code
├── release/           # Final packaged app (.exe)
├── vite.config.ts     # Vite config
└── electron-builder.json5 # Electron builder config
```

---

## 📃 License

MIT

---

## 🙌 Author


GitHub: [@mrVaidik](https://github.com/mrVaidik)




