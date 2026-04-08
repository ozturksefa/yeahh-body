import { useState } from "react";
import { supabase } from "./supabaseClient";

function AuthScreen() {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password: pass });
        if (error) throw error;
        setError("✅ Kayıt başarılı! E-postanı kontrol et veya giriş yap.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-screen">
      <div className="auth-box">
        <div className="auth-brand">YEAHH BODY</div>
        <div className="auth-sub">{mode === "login" ? "Giriş Yap" : "Hesap Oluştur"}</div>
        <input className="auth-input" type="email" placeholder="E-posta" value={email}
          onChange={e => setEmail(e.target.value)} />
        <input className="auth-input" type="password" placeholder="Şifre (en az 6 karakter)" value={pass}
          onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
        {error && <div className={`auth-error ${error.startsWith("✅") ? "auth-success" : ""}`}>{error}</div>}
        <button className="auth-btn" onClick={submit} disabled={loading}>
          {loading ? "..." : mode === "login" ? "Giriş Yap" : "Kayıt Ol"}
        </button>
        <button className="auth-switch" onClick={() => { setMode(m => m === "login" ? "signup" : "login"); setError(null); }}>
          {mode === "login" ? "Hesabın yok mu? Kayıt ol" : "Hesabın var mı? Giriş yap"}
        </button>
      </div>
    </div>
  );
}

export default AuthScreen;
