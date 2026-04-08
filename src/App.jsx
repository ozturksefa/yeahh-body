import { lazy, Suspense, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import AuthScreen from "./Auth";
import "./App.css";

const ClassicView = lazy(() => import("./ClassicView"));
const Program2View = lazy(() => import("./Program2View"));
const Program3View = lazy(() => import("./Program3View"));
const HomeView = lazy(() => import("./HomeView"));
const HybridView = lazy(() => import("./HybridView"));

export default function App() {
  const [user, setUser] = useState(undefined);
  const [programMode, setProgramMode] = useState(() => {
    try { return localStorage.getItem("yb_program_mode") || "hybrid"; } catch { return "hybrid"; }
  });

  useEffect(() => {
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

  const ProgramSelector = () => (
    <div className="prog-mode-bar">
      {[
        { id: "hybrid",  label: "🎯 Hibrit" },
        { id: "home",     label: "🏠 Ev" },
        { id: "classic",  label: "Klasik Split" },
        { id: "full",     label: "Full Activation" },
        { id: "athletic", label: "Atletik ⚡" },
      ].map(p => (
        <button key={p.id}
          className={`prog-mode-btn ${programMode === p.id ? "prog-mode-active" : ""}`}
          onClick={() => setMode(p.id)}>
          {p.label}
        </button>
      ))}
    </div>
  );

  if (programMode === "hybrid")  return renderProgram(<HybridView user={user} logout={logout} ProgramSelector={ProgramSelector} />);
  if (programMode === "home")     return renderProgram(<HomeView user={user} logout={logout} ProgramSelector={ProgramSelector} />);
  if (programMode === "full")     return renderProgram(<Program2View user={user} logout={logout} ProgramSelector={ProgramSelector} />);
  if (programMode === "athletic") return renderProgram(<Program3View user={user} logout={logout} ProgramSelector={ProgramSelector} />);
  return renderProgram(<ClassicView user={user} logout={logout} ProgramSelector={ProgramSelector} />);
}
