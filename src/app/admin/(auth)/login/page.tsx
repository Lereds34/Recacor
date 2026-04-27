import { Suspense } from "react";
import { LoginForm } from "./form";

export const metadata = {
  title: "Connexion — Admin Recacor",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-purple-deep" />}>
      <LoginForm />
    </Suspense>
  );
}
