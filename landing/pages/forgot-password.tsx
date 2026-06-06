import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Mail, Phone, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export const routeOptions = ({
  component: ForgotPasswordPage,
  head: () => ({
    meta: [
      { title: "Forgot password — Salonix" },
      { name: "description", content: "Reset your Salonix password with email or phone OTP." },
    ],
  }),
});

type Step = "identify" | "otp" | "done";
type Mode = "email" | "phone";

// dummy registered identifiers
const VALID = ["admin@salonix.io", "owner@glowstudios.com", "+8801700000000", "01700000000"];

function ForgotPasswordPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("email");
  const [identifier, setIdentifier] = useState("");
  const [step, setStep] = useState<Step>("identify");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendIn, setResendIn] = useState(0);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const id = setTimeout(() => setResendIn(resendIn - 1), 1000);
    return () => clearTimeout(id);
  }, [resendIn]);

  function isValid(v: string) {
    return VALID.some((x) => x.toLowerCase() === v.trim().toLowerCase());
  }

  function sendOtp(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    if (!identifier.trim()) {
      setError(t("Please enter your") + " " + (mode === "email" ? t("Email") : t("Phone")));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!isValid(identifier)) {
        setError(t("We couldn't find an account with that information."));
        return;
      }
      setStep("otp");
      setOtp(["", "", "", "", "", ""]);
      setResendIn(30);
      setTimeout(() => inputsRef.current[0]?.focus(), 50);
    }, 700);
  }

  function setDigit(i: number, v: string) {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = d;
    setOtp(next);
    if (d && i < 5) inputsRef.current[i + 1]?.focus();
  }

  function onKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputsRef.current[i - 1]?.focus();
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = ["", "", "", "", "", ""];
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setOtp(next);
    inputsRef.current[Math.min(text.length, 5)]?.focus();
  }

  function verify(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    const code = otp.join("");
    if (code.length !== 6) {
      setError(t("Enter the full 6-digit code."));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // demo: any 6-digit code works
      setStep("done");
    }, 600);
  }

  return (
    <div className="min-h-screen bg-background grid place-items-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="size-4" /> {t("Back to sign in")}
        </Link>

        <div className="rounded-2xl border bg-card soft-shadow p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{t("Forgot password")}</h1>
              <p className="text-xs text-muted-foreground">
                {step === "identify" && t("We'll send a 6-digit code to verify your account.")}
                {step === "otp" && t("Enter the 6-digit code we sent you.")}
                {step === "done" && t("You're verified. Set a new password.")}
              </p>
            </div>
          </div>

          {step === "identify" && (
            <form onSubmit={sendOtp} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl">
                {(["email", "phone"] as Mode[]).map((m) => {
                  const active = mode === m;
                  const Icon = m === "email" ? Mail : Phone;
                  return (
                    <button
                      type="button"
                      key={m}
                      onClick={() => { setMode(m); setIdentifier(""); setError(null); }}
                      className={
                        "flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition " +
                        (active ? "bg-card soft-shadow text-foreground" : "text-muted-foreground hover:text-foreground")
                      }
                    >
                      <Icon className="size-4" /> {t(m === "email" ? "Email" : "Phone")}
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="text-xs font-medium">{mode === "email" ? t("Email") : t("Phone number")}</label>
                <div className="relative mt-1">
                  {mode === "email" ? (
                    <Mail className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  ) : (
                    <Phone className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  )}
                  <input
                    type={mode === "email" ? "email" : "tel"}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={mode === "email" ? "you@example.com" : "+8801xxxxxxxxx"}
                    className="w-full bg-card border border-input rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5">
                  {t("Try")}: <span className="font-mono">admin@salonix.io</span> {t("or")} <span className="font-mono">+8801700000000</span>
                </p>
              </div>

              {error && <div className="text-xs text-destructive">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:bg-primary/90 inline-flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading && <Loader2 className="size-4 animate-spin" />}
                {loading ? t("Sending…") : t("Send 6-digit OTP")}
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={verify} className="mt-6 space-y-4">
              <div className="text-xs text-muted-foreground">
                {t("Code sent to")} <span className="font-medium text-foreground">{identifier}</span>
              </div>
              <div className="flex items-center justify-between gap-2" onPaste={onPaste}>
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputsRef.current[i] = el; }}
                    value={d}
                    inputMode="numeric"
                    maxLength={1}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => onKey(i, e)}
                    className="size-12 text-center text-lg font-semibold bg-card border border-input rounded-lg outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring/40"
                  />
                ))}
              </div>

              {error && <div className="text-xs text-destructive">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:bg-primary/90 inline-flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading && <Loader2 className="size-4 animate-spin" />}
                {loading ? t("Verifying…") : t("Verify code")}
              </button>

              <div className="flex items-center justify-between text-xs">
                <button type="button" onClick={() => setStep("identify")} className="text-muted-foreground hover:text-foreground">
                  {t("Change details")}
                </button>
                <button
                  type="button"
                  disabled={resendIn > 0}
                  onClick={() => sendOtp()}
                  className="text-primary font-medium disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  {resendIn > 0 ? `${t("Resend in")} ${resendIn}s` : t("Resend code")}
                </button>
              </div>
            </form>
          )}

          {step === "done" && (
            <div className="mt-6 space-y-4">
              <div className="rounded-lg border bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-3 py-2 text-sm inline-flex items-center gap-2">
                <CheckCircle2 className="size-4" /> {t("Verified successfully")}
              </div>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:bg-primary/90"
              >
                {t("Continue to sign in")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default routeOptions.component;
