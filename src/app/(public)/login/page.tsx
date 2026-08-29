import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";
import { BrandLockup } from "@/components/BrandLockup";

export default function LoginPage() {
  return (
    <main className="login-shell">
      <section className="login-card" aria-labelledby="login-title">
        <BrandLockup size="md" />
        <p className="eyebrow">Scale AI x SpaceXAI</p>
        <h1 id="login-title">Open the working concept</h1>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}
