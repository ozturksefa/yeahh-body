import { lazy, Suspense, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import AuthScreen from "./Auth";
import "./App.css";

const ClassicView = lazy(() => import("./ClassicView"));
const Program2View = lazy(() => import("./Program2View"));
const Program3View = lazy(() => import("./Program3View"));
const HomeView = lazy(() => import("./HomeView"));
const HybridView = lazy(() => import("./HybridView"));

function isE2EBypassEnabled() {
  if (!import.meta.env.DEV || typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("e2eAuth") === "1" || localStorage.getItem("yb_e2e_auth_bypass") === "1";
  } catch {
    return false;
  }
}

export default function App() {
  const [user, setUser] = useState(undefined);
  const [programMode, setProgramMode] = useState(() => {
    try { return localStorage.getItem("yb_program_mode") || "hybrid"; } catch { return "hybrid"; }
  });

  useEffect(() => {
    if (isE2EBypassEnabled()) {
      setUser({ id: "e2e-user", email: "e2e@yeahh.body" });
      return undefined;
    }

    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (user === undefined) {
    return (
      <div className="auth-screen">
        <div className="auth-box">
          <div className="auth-brand">YEAHH BODY</div>
          <div style={{ color: "#666", marginTop: 16 }}>Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (!user) return <AuthScreen />;

  const renderProgram = (node) => (
    <Suspense
      fallback={
        <div className="auth-screen">
          <div className="auth-box">
            <div className="auth-brand">YEAHH BODY</div>
            <div style={{ color: "#666", marginTop: 16 }}>Program yükleniyor...</div>
          </div>
        </div>
      }
    >
      {node}
    </Suspense>
  );

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const setMode = (mode) => {
    setProgramMode(mode);
    try { localStorage.setItem("yb_program_mode", mode); } catch { return }
  };

  const ProgramSelector = () => {
    const [open, setOpen] = useState(false);
    const [legacyOpen, setLegacyOpen] = useState(false);
    const primaryOptions = [
      { id: "hybrid", label: "🎯 Hibrit", hint: "Önerilen ana akış" },
      { id: "home", label: "🏠 Ev", hint: "Hibritin ev görünümü" },
      { id: "athletic", label: "Atletik ⚡", hint: "Hibritin Macfit görünümü" },
    ];
    const legacyOptions = [
      { id: "classic", label: "Klasik Split", hint: "Eski program" },
      { id: "full", label: "Full Activation", hint: "Eski program" },
    ];
    const options = [...primaryOptions, ...legacyOptions];
    const active = options.find((item) => item.id === programMode) || options[0];
    const isLegacyActive = legacyOptions.some((item) => item.id === programMode);

    return (
      <div className="prog-selector-wrap">
        <button
          className="prog-selector-toggle"
          data-testid="program-selector-toggle"
          onClick={() => setOpen((value) => !value)}
        >
          <div>
            <div className="prog-selector-label">Aktif Akış</div>
            <div className="prog-selector-value">{active.label}</div>
            <div className="prog-selector-subtext">{active.hint}</div>
          </div>
          <div className="prog-selector-caret">{open ? "−" : "+"}</div>
        </button>

        {open && (
          <div className="prog-selector-panel">
            <div className="prog-selector-section-label">Ana Program</div>
            <div className="prog-mode-bar prog-mode-bar-primary">
              {primaryOptions.map((item) => (
                <button
                  key={item.id}
                  data-testid={`program-mode-${item.id}`}
                  className={`prog-mode-btn ${programMode === item.id ? "prog-mode-active" : ""}`}
                  onClick={() => {
                    setMode(item.id);
                    setOpen(false);
                  }}
                >
                  <span>{item.label}</span>
                  <small>{item.hint}</small>
                </button>
              ))}
            </div>

            <button
              className={`prog-legacy-toggle ${legacyOpen || isLegacyActive ? "prog-legacy-toggle-open" : ""}`}
              onClick={() => setLegacyOpen((value) => !value)}
            >
              <span>Diğer Programlar</span>
              <span>{legacyOpen || isLegacyActive ? "−" : "+"}</span>
            </button>

            {(legacyOpen || isLegacyActive) && (
              <div className="prog-mode-bar prog-mode-bar-legacy">
                {legacyOptions.map((item) => (
                  <button
                    key={item.id}
                    data-testid={`program-mode-${item.id}`}
                    className={`prog-mode-btn prog-mode-btn-legacy ${programMode === item.id ? "prog-mode-active" : ""}`}
                    onClick={() => {
                      setMode(item.id);
                      setOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                    <small>{item.hint}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (programMode === "hybrid")  return renderProgram(<HybridView user={user} logout={logout} ProgramSelector={ProgramSelector} />);
  if (programMode === "home")     return renderProgram(<HomeView user={user} logout={logout} ProgramSelector={ProgramSelector} />);
  if (programMode === "full")     return renderProgram(<Program2View user={user} logout={logout} ProgramSelector={ProgramSelector} />);
  if (programMode === "athletic") return renderProgram(<Program3View user={user} logout={logout} ProgramSelector={ProgramSelector} />);
  return renderProgram(<ClassicView user={user} logout={logout} ProgramSelector={ProgramSelector} />);
}
