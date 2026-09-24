"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error || "Connexion impossible.");
        return;
      }

      router.replace(callbackUrl.startsWith("/admin") ? callbackUrl : "/admin");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-background border border-line-strong rounded-sm px-4 py-3 text-foreground focus:outline-none focus:border-brand-red/50";

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <div className="theme-dark bg-black border-b border-white/10 shadow-lg">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:px-6">
          <Image
            src="/images/logo/logo_SuperEnduro.png"
            alt="SuperEnduro"
            width={240}
            height={72}
            className="h-8 w-auto object-contain"
            priority
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm rounded-lg border border-line bg-surface p-6 shadow-card sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-brand-red font-semibold mb-2">
            Administration
          </p>
          <h1 className="font-display text-3xl text-foreground mb-6">Connexion</h1>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-muted mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-muted mb-2"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {error ? (
              <p className="text-sm text-brand-red" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-semibold uppercase tracking-widest text-sm py-3 rounded-sm transition-colors"
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
