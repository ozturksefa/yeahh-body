import { useState } from "react";

function ExerciseNote({ exerciseName }) {
  const key = `yb_exnote_${exerciseName}`;
  const [note, setNote] = useState(() => {
    try { return localStorage.getItem(key) || ""; } catch { return ""; }
  });
  const [editing, setEditing] = useState(false);

  const save = (val) => {
    setNote(val);
    try {
      if (val) localStorage.setItem(key, val);
      else localStorage.removeItem(key);
    } catch {
      return;
    }
  };

  if (!editing && !note) {
    return <button className="exnote-add" onClick={() => setEditing(true)}>+ Not ekle</button>;
  }

  return (
    <div className="exnote">
      {editing ? (
        <div className="exnote-edit">
          <textarea className="exnote-textarea" value={note} onChange={e => save(e.target.value)}
            placeholder="Bu harekete not ekle... (ör: sağ omuz ağrıdı, 20kg rahat geldi)" rows={2} autoFocus />
          <button className="exnote-done" onClick={() => setEditing(false)}>✓</button>
        </div>
      ) : (
        <div className="exnote-view" onClick={() => setEditing(true)}>
          <span className="exnote-icon">📝</span>
          <span className="exnote-text">{note}</span>
        </div>
      )}
    </div>
  );
}

export default ExerciseNote;
