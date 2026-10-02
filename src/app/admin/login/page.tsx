import type { Metadata } from "next";
import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import LoginForm from "./LoginForm";

export const metadata: Metadata = createMetadata({
  title: "Connexion admin",
  description: "Connexion à l'espace d'administration.",
  path: "/admin/login",
  noIndex: true,
});

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100dvh] bg-background flex items-center justify-center text-subtle text-sm">
          Chargement…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
