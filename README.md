# 📖 Lexicon — Personal Vocabulary Tracker

A beautiful, mobile-first vocabulary tracker built with React. Save words, their meanings, vibes, and example sentences — all stored locally in your browser.

![Lexicon App](https://img.shields.io/badge/React-App-61DAFB?style=flat&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)
![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-brightgreen?style=flat)

---

## ✨ Features

- **Add words** with meaning, part of speech, vibe/context, and an example sentence
- **Search** instantly across words, meanings, and vibes
- **Alphabetical sorting** with letter dividers (A, B, C...)
- **Color-coded** part of speech tags (Noun, Verb, Adjective, etc.)
- **Persistent storage** — words are saved across sessions
- **Dark, elegant UI** designed for daily use on mobile

---

## 🖥️ Preview

```
┌─────────────────────────┐
│  Your Personal          │
│  Lexicon            📖  │
│                         │
│  🔍 Search words...     │
│  12 words saved         │
│                         │
│  ── E ──────────────    │
│  Ephemeral  [Adjective] │
│  Lasting for a very...  │
│                         │
│  ── L ──────────────    │
│  Lucid      [Adjective] │
│  Clear and easy to...   │
│                         │
│                    [+]  │
└─────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/lexicon-vocab-tracker.git

# 2. Navigate into the project folder
cd lexicon-vocab-tracker

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗂️ Project Structure

```
lexicon-vocab-tracker/
├── src/
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Built With

- [React](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — Build tool
- Browser `localStorage` — Persistent word storage

---

## 📱 How to Use

1. **Tap the `+` button** at the bottom right to add a new word
2. Fill in the **Word**, **Meaning**, **Vibe/Context**, and **Example Sentence**
3. Select the **Part of Speech** (Noun, Verb, Adjective, etc.)
4. Tap **Save Word**
5. **Tap any word** in the list to expand and see full details
6. Use the **search bar** to find any word instantly

---

## 🎨 Design

The app uses a dark, editorial aesthetic inspired by classic dictionaries and literary journals:

- Deep black backgrounds (`#0D0D0D`)
- Warm gold accents (`#C9A96E`)
- Georgia serif typography
- Smooth expand/collapse animations

---

## 📄 License

MIT License — feel free to use, modify, and share.

---

## 🙌 Contributing

Pull requests are welcome! If you have ideas for new features (e.g. word of the day, quiz mode, export to CSV), feel free to open an issue.

---

*Built with ❤️ to make vocabulary learning beautiful.*
