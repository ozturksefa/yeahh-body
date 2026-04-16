import { useCallback, useEffect, useState } from "react";

/**
 * Phone-dialer style numeric pad that overlays from the bottom of the
 * screen. Used for weight (decimal, step 2.5 or 5) and reps (integer,
 * step 1) entry without opening the native mobile keyboard.
 *
 * Props:
 *   field         — "weight" | "reps"
 *   initialValue  — number shown when the pad opens
 *   step          — quick ± delta (2.5/5 for weight, 1 for reps)
 *   label         — title shown above the digits (e.g. "Ağırlık")
 *   unit          — suffix next to the value (e.g. "kg")
 *   allowDecimal  — true for weight, false for reps
 *   onCommit(val) — called with the parsed number when the user taps "Tamam"
 *   onCancel()    — called when the user taps "Kapat" or the backdrop
 */
export default function NumericPad({
  field,
  initialValue,
  step,
  label,
  unit,
  allowDecimal,
  onCommit,
  onCancel,
}) {
  const initialText = initialValue && Number(initialValue) > 0
    ? String(Number.isInteger(Number(initialValue)) ? Number(initialValue) : Number(initialValue).toFixed(1))
    : "";
  const [text, setText] = useState(initialText);

  const commit = useCallback(() => {
    const parsed = parseFloat(text) || 0;
    onCommit(parsed);
  }, [onCommit, text]);

  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape") onCancel();
      if (event.key === "Enter") commit();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commit, onCancel]);

  const appendDigit = (digit) => {
    if (text.length >= 6) return; // hard cap
    setText((prev) => (prev === "0" ? String(digit) : prev + digit));
  };

  const appendDecimal = () => {
    if (!allowDecimal) return;
    if (text.includes(".")) return;
    setText((prev) => (prev === "" ? "0." : prev + "."));
  };

  const backspace = () => {
    setText((prev) => prev.slice(0, -1));
  };

  const bumpBy = (delta) => {
    const base = parseFloat(text) || 0;
    const next = Math.max(0, base + delta);
    setText(Number.isInteger(next) ? String(next) : next.toFixed(1));
  };

  const clearAll = () => setText("");

  const display = text || "0";

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="numpad-backdrop" role="dialog" aria-modal="true" aria-label={`${label} gir`} onClick={onCancel}>
      <div className="numpad-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="numpad-head">
          <div>
            <div className="numpad-label">{label}</div>
            <div className="numpad-value">
              <span className="numpad-value-num">{display}</span>
              <span className="numpad-value-unit">{unit}</span>
            </div>
          </div>
          <button type="button" className="numpad-close" onClick={onCancel} aria-label="Kapat">✕</button>
        </div>

        <div className="numpad-bumps">
          <button type="button" className="numpad-bump" onClick={() => bumpBy(-step)}>
            −{step}
          </button>
          <button type="button" className="numpad-bump" onClick={clearAll} aria-label="Temizle">
            Sıfırla
          </button>
          <button type="button" className="numpad-bump" onClick={() => bumpBy(step)}>
            +{step}
          </button>
        </div>

        <div className="numpad-grid">
          {digits.map((d) => (
            <button key={d} type="button" className="numpad-key" onClick={() => appendDigit(d)}>
              {d}
            </button>
          ))}
          <button
            type="button"
            className={`numpad-key numpad-key-alt ${allowDecimal ? "" : "numpad-key-disabled"}`}
            onClick={appendDecimal}
            disabled={!allowDecimal}
            aria-label="Nokta"
          >
            ,
          </button>
          <button type="button" className="numpad-key" onClick={() => appendDigit("0")}>
            0
          </button>
          <button type="button" className="numpad-key numpad-key-alt" onClick={backspace} aria-label="Sil">
            ⌫
          </button>
        </div>

        <button
          type="button"
          className="numpad-commit"
          data-testid={`numpad-commit-${field}`}
          onClick={commit}
        >
          Tamam
        </button>
      </div>
    </div>
  );
}
