import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import AuthScreen from "./Auth";
import ClassicView from "./ClassicView";
import Program2View from "./Program2View";
import Program3View from "./Program3View";
import HomeView from "./HomeView";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(undefined);
  const [programMode, setProgramMode] = useState(() => {
    try { return localStorage.getItem("yb_program_mode") || "athletic"; } catch { return "athletic"; }
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

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const setMode = (mode) => {
    setProgramMode(mode);
    try { localStorage.setItem("yb_program_mode", mode); } catch {}
  };

  const ProgramSelector = () => (
    <div className="prog-mode-bar">
      {[
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

  if (programMode === "home")     return <HomeView user={user} logout={logout} ProgramSelector={ProgramSelector} />;
  if (programMode === "full")     return <Program2View user={user} logout={logout} ProgramSelector={ProgramSelector} />;
  if (programMode === "athletic") return <Program3View user={user} logout={logout} ProgramSelector={ProgramSelector} />;
  return <ClassicView user={user} logout={logout} ProgramSelector={ProgramSelector} />;
}
