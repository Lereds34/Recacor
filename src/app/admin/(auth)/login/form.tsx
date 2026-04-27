"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const from = search.get("from") || "/admin";

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      const j = await res.json();
      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        setError(j.error || "Erreur de connexion");
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-purple-deep">
      {/* Background animé */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />

        {/* Mesh rotatif */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-[0.06]"
          style={{
            backgroundImage:
              "conic-gradient(from 0deg, transparent 0%, white 1%, transparent 3%)",
          }}
        />

        {/* Orbes flottantes */}
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-light/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/6 w-80 h-80 bg-purple-bright/20 rounded-full blur-[100px]"
        />

        {/* Grille subtile */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Card login */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md mx-4"
      >
        {/* Logo top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-recacor.webp"
            alt="Recacor"
            className="h-10 w-auto mx-auto brightness-0 invert mb-3"
          />
          <p className="text-purple-glow text-xs font-bold tracking-[0.3em] uppercase">
            Espace administrateur
          </p>
        </motion.div>

        {/* Glassmorphism card */}
        <div className="relative">
          {/* Gradient border glow */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-purple-glow/40 via-purple-bright/20 to-purple-light/30 blur-sm" />

          <div className="relative rounded-3xl bg-white/[0.06] backdrop-blur-2xl border border-white/10 p-8 sm:p-10">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Bienvenue
                </h1>
                <p className="text-white/50 text-sm mt-1">
                  Connectez-vous pour gérer votre site
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-light flex items-center justify-center shadow-lg shadow-purple-bright/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>

            <form onSubmit={submit} className="space-y-5">
              {/* User */}
              <div>
                <label className="text-xs font-bold text-white/70 mb-2 block tracking-wider uppercase">
                  Identifiant
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-purple-glow transition-colors" />
                  <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    autoComplete="username"
                    placeholder="admin"
                    required
                    className="w-full h-12 rounded-xl bg-white/5 border border-white/10 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-glow/50 focus:bg-white/[0.08] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-bold text-white/70 mb-2 block tracking-wider uppercase">
                  Mot de passe
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-purple-glow transition-colors" />
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required
                    className="w-full h-12 rounded-xl bg-white/5 border border-white/10 pl-11 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-glow/50 focus:bg-white/[0.08] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label={show ? "Masquer" : "Afficher"}
                  >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-glow via-purple-light to-purple-bright text-white font-bold text-sm hover:shadow-[0_8px_32px_rgba(167,139,250,0.4)] disabled:opacity-50 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <span>Connexion...</span>
                ) : (
                  <>
                    <span>Se connecter</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Sécurité info */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-xs text-white/30 text-center flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" /> Connexion sécurisée · Session 7 jours
              </p>
            </div>
          </div>
        </div>

        {/* Footer Webomax */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-white/40 text-xs">
            Développé par{" "}
            <a
              href="https://webomax.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-glow hover:text-white font-semibold transition-colors inline-flex items-center gap-1"
            >
              Webomax
              <ArrowRight className="w-3 h-3" />
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
