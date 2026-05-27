import { useState, useEffect, useRef } from "react";

const SAMPLE_WORDS = [
  {
    id: 1,
    word: "Ephemeral",
    pos: "Adjective",
    meaning: "Lasting for a very short time",
    vibe: "Poetic / Reflective — beautiful but fleeting",
    example: "The ephemeral beauty of cherry blossoms makes them even more precious.",
    date: "2026-05-27",
  },
  {
    id: 2,
    word: "Lucid",
    pos: "Adjective",
    meaning: "Clear and easy to understand; also mentally clear",
    vibe: "Neutral / Academic — suits explanations, dreams, or thinking",
    example: "Her lucid explanation made the complex topic feel simple.",
    date: "2026-05-27",
  },
  {
    id: 3,
    word: "Pensive",
    pos: "Adjective",
    meaning: "Deep in thought, often with a hint of sadness",
    vibe: "Moody / Literary — quiet, melancholic feel",
    example: "He sat by the window, pensive and silent, watching the rain.",
    date: "2026-05-27",
  },
];

const POS_COLORS = {
  Noun: "#FF6B6B",
  Verb: "#4ECDC4",
  Adjective: "#45B7D1",
  Adverb: "#96CEB4",
  Idiom: "#FFEAA7",
  Phrase: "#DDA0DD",
  Other: "#B0B0B0",
};

const STORAGE_KEY = "vocab-tracker-words";

export default function VocabTracker() {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [form, setForm] = useState({
    word: "",
    pos: "Adjective",
    meaning: "",
    vibe: "",
    example: "",
  });
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      const savedWords = localStorage.getItem(STORAGE_KEY);

      if (savedWords) {
        setWords(JSON.parse(savedWords));
      } else {
        setWords(SAMPLE_WORDS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_WORDS));
      }
    } catch {
      setWords(SAMPLE_WORDS);
    }
  }, []);

  const saveWords = (updated) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  };

  const filtered = words
    .filter(
      (w) =>
        w.word.toLowerCase().includes(search.toLowerCase()) ||
        w.meaning.toLowerCase().includes(search.toLowerCase()) ||
        w.vibe.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.word.localeCompare(b.word));

  const handleAdd = () => {
    if (!form.word.trim() || !form.meaning.trim()) return;

    const newWord = {
      id: Date.now(),
      ...form,
      word: form.word.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    const updated = [...words, newWord];
    setWords(updated);
    saveWords(updated);
    setForm({ word: "", pos: "Adjective", meaning: "", vibe: "", example: "" });
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id) => {
    const updated = words.filter((w) => w.id !== id);
    setWords(updated);
    saveWords(updated);
    setDeleteConfirm(null);
    if (expandedId === id) setExpandedId(null);
  };

  const grouped = {};
  filtered.forEach((w) => {
    const letter = w.word[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(w);
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        overflowY: "auto",
        background: "#0D0D0D",
        fontFamily: "'Georgia', serif",
        color: "#E8E0D0",
        paddingBottom: "100px",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "32px 20px 20px",
          borderBottom: "1px solid #1E1E1E",
          position: "sticky",
          top: 0,
          background: "#0D0D0D",
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "4px",
                color: "#555",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Your Personal
            </div>
            <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "normal", color: "#E8E0D0", letterSpacing: "1px" }}>
              Lexicon
            </h1>
          </div>
          <div
            style={{
              background: "#1A1A1A",
              border: "1px solid #2A2A2A",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            📖
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#444",
              fontSize: "14px",
            }}
          >
            🔍
          </span>
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search words, meanings, vibes..."
            style={{
              width: "100%",
              background: "#161616",
              border: "1px solid #2A2A2A",
              borderRadius: "12px",
              padding: "12px 14px 12px 38px",
              color: "#E8E0D0",
              fontSize: "14px",
              fontFamily: "'Georgia', serif",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#555",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
          <span style={{ fontSize: "12px", color: "#444" }}>
            <span style={{ color: "#C9A96E", fontWeight: "bold" }}>{words.length}</span> words saved
          </span>
          {search && (
            <span style={{ fontSize: "12px", color: "#444" }}>
              <span style={{ color: "#C9A96E" }}>{filtered.length}</span> results
            </span>
          )}
        </div>
      </div>

      {/* Word List */}
      <div style={{ padding: "0 20px" }}>
        {Object.keys(grouped)
          .sort()
          .map((letter) => (
            <div key={letter}>
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "3px",
                  color: "#C9A96E",
                  textTransform: "uppercase",
                  padding: "20px 0 8px",
                  borderBottom: "1px solid #1A1A1A",
                }}
              >
                {letter}
              </div>

              {grouped[letter].map((w) => (
                <div key={w.id}>
                  <div
                    onClick={() => setExpandedId(expandedId === w.id ? null : w.id)}
                    style={{
                      padding: "16px 0",
                      borderBottom: "1px solid #141414",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "18px", color: "#E8E0D0", fontStyle: "italic" }}>{w.word}</span>
                        <span
                          style={{
                            fontSize: "10px",
                            padding: "2px 8px",
                            borderRadius: "20px",
                            background: (POS_COLORS[w.pos] || "#888") + "22",
                            color: POS_COLORS[w.pos] || "#888",
                            border: `1px solid ${(POS_COLORS[w.pos] || "#888")}44`,
                            letterSpacing: "0.5px",
                          }}
                        >
                          {w.pos}
                        </span>
                      </div>
                      <div style={{ fontSize: "13px", color: "#777", lineHeight: "1.4" }}>
                        {w.meaning.length > 60 ? w.meaning.slice(0, 60) + "…" : w.meaning}
                      </div>
                    </div>
                    <span
                      style={{
                        color: "#333",
                        fontSize: "12px",
                        marginLeft: "12px",
                        transition: "transform 0.2s",
                        transform: expandedId === w.id ? "rotate(180deg)" : "none",
                      }}
                    >
                      ▼
                    </span>
                  </div>

                  {expandedId === w.id && (
                    <div
                      style={{
                        background: "#111",
                        border: "1px solid #1E1E1E",
                        borderRadius: "12px",
                        padding: "16px",
                        marginBottom: "8px",
                        animation: "fadeIn 0.2s ease",
                      }}
                    >
                      <div style={{ marginBottom: "12px" }}>
                        <div
                          style={{
                            fontSize: "10px",
                            letterSpacing: "2px",
                            color: "#555",
                            textTransform: "uppercase",
                            marginBottom: "4px",
                          }}
                        >
                          Meaning
                        </div>
                        <div style={{ fontSize: "14px", color: "#C8C0B0", lineHeight: "1.6" }}>{w.meaning}</div>
                      </div>

                      {w.vibe && (
                        <div style={{ marginBottom: "12px" }}>
                          <div
                            style={{
                              fontSize: "10px",
                              letterSpacing: "2px",
                              color: "#555",
                              textTransform: "uppercase",
                              marginBottom: "4px",
                            }}
                          >
                            Vibe / Context
                          </div>
                          <div style={{ fontSize: "13px", color: "#C9A96E", lineHeight: "1.5", fontStyle: "italic" }}>
                            ✦ {w.vibe}
                          </div>
                        </div>
                      )}

                      {w.example && (
                        <div style={{ marginBottom: "12px" }}>
                          <div
                            style={{
                              fontSize: "10px",
                              letterSpacing: "2px",
                              color: "#555",
                              textTransform: "uppercase",
                              marginBottom: "4px",
                            }}
                          >
                            Example
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              color: "#888",
                              lineHeight: "1.6",
                              borderLeft: "2px solid #C9A96E33",
                              paddingLeft: "12px",
                              fontStyle: "italic",
                            }}
                          >
                            "{w.example}"
                          </div>
                        </div>
                      )}

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                        <span style={{ fontSize: "11px", color: "#333" }}>Added {w.date}</span>
                        {deleteConfirm === w.id ? (
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              style={{
                                fontSize: "12px",
                                background: "#1A1A1A",
                                border: "1px solid #333",
                                color: "#888",
                                padding: "4px 12px",
                                borderRadius: "6px",
                                cursor: "pointer",
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDelete(w.id)}
                              style={{
                                fontSize: "12px",
                                background: "#FF4444",
                                border: "none",
                                color: "#fff",
                                padding: "4px 12px",
                                borderRadius: "6px",
                                cursor: "pointer",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm(w.id);
                            }}
                            style={{
                              fontSize: "12px",
                              background: "none",
                              border: "1px solid #2A2A2A",
                              color: "#444",
                              padding: "4px 12px",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#333" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>📭</div>
            <div style={{ fontSize: "14px" }}>
              {search ? `No words matching "${search}"` : "No words yet. Add your first one!"}
            </div>
          </div>
        )}
      </div>

      {/* Add Word FAB */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            position: "fixed",
            bottom: "28px",
            right: "24px",
            background: "#C9A96E",
            border: "none",
            borderRadius: "50%",
            width: "56px",
            height: "56px",
            fontSize: "24px",
            cursor: "pointer",
            boxShadow: "0 4px 20px #C9A96E44",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
          }}
        >
          +
        </button>
      )}

      {/* Saved Toast */}
      {saved && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1A2A1A",
            border: "1px solid #2A4A2A",
            color: "#6ECF6E",
            padding: "10px 20px",
            borderRadius: "20px",
            fontSize: "13px",
            zIndex: 300,
          }}
        >
          ✓ Word saved!
        </div>
      )}

      {/* Add Word Sheet */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000000CC",
            zIndex: 200,
            display: "flex",
            alignItems: "flex-end",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowForm(false);
          }}
        >
          <div
            style={{
              background: "#111",
              borderRadius: "20px 20px 0 0",
              padding: "24px 20px 40px",
              width: "100%",
              boxSizing: "border-box",
              borderTop: "1px solid #222",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "normal", color: "#E8E0D0" }}>Add New Word</h2>
              <button
                onClick={() => setShowForm(false)}
                style={{ background: "none", border: "none", color: "#555", fontSize: "22px", cursor: "pointer" }}
              >
                ×
              </button>
            </div>

            {[
              { key: "word", label: "Word *", placeholder: "e.g. Ephemeral" },
              { key: "meaning", label: "Meaning *", placeholder: "What does it mean?" },
              { key: "vibe", label: "Vibe / Context", placeholder: "e.g. Poetic, Academic, Slang..." },
              { key: "example", label: "Example Sentence", placeholder: "Use it in a sentence..." },
            ].map(({ key, label, placeholder }) => (
              <div key={key} style={{ marginBottom: "14px" }}>
                <label
                  style={{
                    fontSize: "11px",
                    letterSpacing: "2px",
                    color: "#555",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  {label}
                </label>
                <input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  style={{
                    width: "100%",
                    background: "#161616",
                    border: "1px solid #2A2A2A",
                    borderRadius: "10px",
                    padding: "11px 14px",
                    color: "#E8E0D0",
                    fontSize: "14px",
                    fontFamily: "'Georgia', serif",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontSize: "11px",
                  letterSpacing: "2px",
                  color: "#555",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Part of Speech
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Noun", "Verb", "Adjective", "Adverb", "Idiom", "Phrase", "Other"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setForm({ ...form, pos: p })}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      border: `1px solid ${form.pos === p ? POS_COLORS[p] : "#2A2A2A"}`,
                      background: form.pos === p ? POS_COLORS[p] + "22" : "transparent",
                      color: form.pos === p ? POS_COLORS[p] : "#555",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!form.word.trim() || !form.meaning.trim()}
              style={{
                width: "100%",
                background: form.word.trim() && form.meaning.trim() ? "#C9A96E" : "#1A1A1A",
                border: "none",
                borderRadius: "12px",
                padding: "14px",
                color: form.word.trim() && form.meaning.trim() ? "#0D0D0D" : "#333",
                fontSize: "15px",
                fontFamily: "'Georgia', serif",
                cursor: form.word.trim() && form.meaning.trim() ? "pointer" : "not-allowed",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              Save Word
            </button>
          </div>
        </div>
      )}

      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100vh;
          background: #0D0D0D;
          overflow-x: hidden;
        }

        body {
          overscroll-behavior: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        input::placeholder {
          color: #333;
        }

        * {
          -webkit-tap-highlight-color: transparent;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}