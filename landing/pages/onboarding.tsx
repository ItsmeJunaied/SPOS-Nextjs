import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n-context";
import {
  Camera, Upload, User, Building2, MapPin, FileText, CheckCircle2,
  ArrowRight, ArrowLeft, Sparkles, Phone, Mail, Hash, Globe, Plus, Trash2, X,
  Sun, Moon, LogOut,
} from "lucide-react";

export const routeOptions = ({
  component: OnboardingPage,
  head: () => ({
    meta: [{ title: "Welcome — Setup your salon" }],
  }),
});

type Step = { key: string; title: string; subtitle: string; icon: React.ComponentType<{ className?: string }> };

const STEPS: Step[] = [
  { key: "brand", title: "Brand & logo", subtitle: "Upload your salon logo and pick a name", icon: Camera },
  { key: "owner", title: "Owner info", subtitle: "Tell us who's running the show", icon: User },
  { key: "company", title: "Company details", subtitle: "Legal and registration info", icon: Building2 },
  { key: "branches", title: "Branches", subtitle: "Add your salon locations", icon: MapPin },
  { key: "documents", title: "Documents", subtitle: "Upload trade licenses & certificates", icon: FileText },
  { key: "done", title: "All set", subtitle: "Your workspace is ready", icon: CheckCircle2 },
];

type BranchDraft = { id: string; name: string; address: string; phone: string };
type DocDraft = { id: string; branchId: string; type: string; name: string };

function OnboardingPage() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);

  // Brand
  const [logo, setLogo] = useState<string | null>(null);
  const [salonName, setSalonName] = useState("");
  const [tagline, setTagline] = useState("");
  const logoRef = useRef<HTMLInputElement>(null);

  // Owner
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerNid, setOwnerNid] = useState("");

  // Company
  const [companyName, setCompanyName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [vat, setVat] = useState("");
  const [website, setWebsite] = useState("");
  const [hqAddress, setHqAddress] = useState("");

  // Branches
  const [branches, setBranches] = useState<BranchDraft[]>([
    { id: "b1", name: "", address: "", phone: "" },
  ]);

  // Documents
  const [docs, setDocs] = useState<DocDraft[]>([]);

  const step = STEPS[i];
  const progress = ((i + 1) / STEPS.length) * 100;

  function next() {
    if (i < STEPS.length - 1) setI(i + 1);
  }
  function back() {
    if (i > 0) setI(i - 1);
  }
  function finish() {
    try { localStorage.setItem("acru.onboarded", "1"); } catch { /* noop */ }
    navigate("/tenant");
  }
  function logout() {
    try { localStorage.removeItem("acru.onboarded"); } catch { /* noop */ }
    navigate("/login");
  }
  function skip() {
    if (i === STEPS.length - 1) {
      finish();
    } else {
      next();
    }
  }

  const { theme, toggle } = useTheme();
  const { t } = useI18n();

  return (
    <div className="min-h-screen w-full bg-background grid lg:grid-cols-[360px_1fr]">
      {/* Sidebar — steps */}
      <aside className="hidden lg:flex flex-col p-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-r border-border/60">
        <div className="flex items-center gap-2 mb-10">
          <div className="size-10 rounded-xl bg-primary grid place-items-center text-primary-foreground font-bold">S</div>
          <span className="text-xl font-bold tracking-tight">Salonix</span>
        </div>
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-card/80 backdrop-blur px-2.5 py-1 rounded-full border w-fit mb-3">
          <Sparkles className="size-3 text-primary" /> {t("First-time setup")}
        </div>
        <h1 className="text-2xl font-bold tracking-tight leading-tight">{t("Let's set up your salon workspace")}</h1>
        <p className="text-sm text-muted-foreground mt-2">Step {i + 1} of {STEPS.length} · takes ~3 minutes</p>

        <ol className="mt-8 space-y-1">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const done = idx < i;
            const current = idx === i;
            return (
              <li
                key={s.key}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg transition",
                  current && "bg-primary/10",
                )}
              >
                <div className={cn(
                  "size-8 rounded-full grid place-items-center shrink-0 mt-0.5",
                  done ? "bg-success text-success-foreground" :
                  current ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}>
                  {done ? <CheckCircle2 className="size-4" /> : <Icon className="size-4" />}
                </div>
                <div className="min-w-0">
                  <div className={cn("text-sm font-semibold", current && "text-foreground", !current && !done && "text-muted-foreground")}>
                    {t(s.title)}
                  </div>
                  <div className="text-[11px] text-muted-foreground">{t(s.subtitle)}</div>
                </div>
              </li>
            );
          })}
        </ol>

        <button onClick={finish} className="mt-auto text-xs text-muted-foreground hover:text-foreground self-start">
          {t("Skip for now →")}
        </button>
      </aside>

      {/* Main panel */}
      <main className="flex flex-col">
        {/* Top progress */}
        <div className="px-6 lg:px-12 pt-6">
          <div className="flex items-center mb-4">
            <div className="lg:hidden flex items-center gap-2">
              <div className="size-9 rounded-xl bg-primary grid place-items-center text-primary-foreground font-bold">S</div>
              <span className="font-bold tracking-tight">Salonix</span>
              <span className="ml-auto text-xs text-muted-foreground">Step {i + 1} / {STEPS.length}</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={toggle}
                className="inline-flex items-center justify-center size-9 rounded-lg bg-muted hover:bg-muted/80 text-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </button>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-3 h-9 rounded-lg bg-muted hover:bg-destructive/10 hover:text-destructive text-foreground text-xs font-medium transition"
                title={t("Log out")}
              >
                <LogOut className="size-3.5" /> {t("Log out")}
              </button>
            </div>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex-1 px-6 lg:px-12 py-8 overflow-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">{t(step.title)}</h2>
            <p className="text-muted-foreground mt-1">{t(step.subtitle)}</p>

            <div className="mt-8 space-y-4">
              {step.key === "brand" && (
                <>
                  <div className="flex items-center gap-5">
                    <div className="size-28 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-dashed border-border grid place-items-center overflow-hidden shrink-0">
                      {logo ? <img src={logo} alt="Logo" className="size-full object-cover" /> : <Camera className="size-9 text-muted-foreground" />}
                    </div>
                    <div>
                      <input ref={logoRef} type="file" accept="image/*" className="hidden"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) setLogo(URL.createObjectURL(f)); }} />
                      <div className="flex gap-2">
                        <button onClick={() => logoRef.current?.click()} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                          <Upload className="size-3.5" /> {logo ? "Replace" : "Upload logo"}
                        </button>
                        {logo && (
                          <button onClick={() => setLogo(null)} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80">
                            <X className="size-3.5" /> Remove
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-2">PNG / JPG / SVG · up to 2MB</p>
                    </div>
                  </div>
                  <Input label="Salon name" value={salonName} onChange={setSalonName} placeholder="e.g. ACRU Salon Co." />
                  <Input label="Brand tagline (optional)" value={tagline} onChange={setTagline} placeholder="Style. Care. Confidence." />
                </>
              )}

              {step.key === "owner" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input label="Your full name" value={ownerName} onChange={setOwnerName} placeholder="Michael Johnson" />
                  <Input label="Email" value={ownerEmail} onChange={setOwnerEmail} type="email" icon={Mail} placeholder="you@salon.com" />
                  <Input label="Phone number" value={ownerPhone} onChange={setOwnerPhone} icon={Phone} placeholder="+880 …" />
                  <Input label="National ID / Passport" value={ownerNid} onChange={setOwnerNid} icon={Hash} placeholder="1990-7700-…" />
                </div>
              )}

              {step.key === "company" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input label="Legal company name" value={companyName} onChange={setCompanyName} placeholder="ACRU Salon Co. Ltd." />
                  <Input label="Registration number" value={regNo} onChange={setRegNo} icon={Hash} placeholder="C-198765/2021" />
                  <Input label="VAT / TIN" value={vat} onChange={setVat} icon={Hash} placeholder="002-456-789-…" />
                  <Input label="Website" value={website} onChange={setWebsite} icon={Globe} placeholder="https://" />
                  <div className="sm:col-span-2">
                    <Input label="Headquarters address" value={hqAddress} onChange={setHqAddress} placeholder="Plot, road, city" />
                  </div>
                </div>
              )}

              {step.key === "branches" && (
                <div className="space-y-3">
                  {branches.map((b, idx) => (
                    <div key={b.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold inline-flex items-center gap-2">
                          <MapPin className="size-4 text-primary" /> Branch {idx + 1}
                        </div>
                        {branches.length > 1 && (
                          <button onClick={() => setBranches(branches.filter((x) => x.id !== b.id))} className="p-1 rounded-md text-destructive hover:bg-destructive/10">
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </div>
                      <Input label="Branch name" value={b.name} onChange={(v) => setBranches(branches.map((x) => x.id === b.id ? { ...x, name: v } : x))} placeholder="Dhanmondi Flagship" />
                      <Input label="Address" value={b.address} onChange={(v) => setBranches(branches.map((x) => x.id === b.id ? { ...x, address: v } : x))} placeholder="House, road, city" />
                      <Input label="Contact phone" value={b.phone} onChange={(v) => setBranches(branches.map((x) => x.id === b.id ? { ...x, phone: v } : x))} icon={Phone} placeholder="+880 …" />
                    </div>
                  ))}
                  <button
                    onClick={() => setBranches([...branches, { id: `b${Date.now()}`, name: "", address: "", phone: "" }])}
                    className="w-full inline-flex items-center justify-center gap-1.5 text-sm px-3 py-2.5 rounded-lg border border-dashed border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="size-4" /> Add another branch
                  </button>
                </div>
              )}

              {step.key === "documents" && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Upload trade license, VAT certificate, or any compliance document for each branch. You can also do this later from Configuration.
                  </p>
                  {branches.map((b) => (
                    <div key={b.id} className="rounded-xl border border-border bg-card p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm font-semibold inline-flex items-center gap-2">
                          <MapPin className="size-4 text-primary" /> {b.name || "Unnamed branch"}
                        </div>
                        <OnboardDocUploader onUpload={(file, type) => setDocs([...docs, { id: `d${Date.now()}`, branchId: b.id, type, name: file.name }])} />
                      </div>
                      <div className="space-y-1.5">
                        {docs.filter((d) => d.branchId === b.id).length === 0 && (
                          <div className="text-[11px] text-muted-foreground text-center py-2 border border-dashed border-border rounded-md">
                            No documents yet
                          </div>
                        )}
                        {docs.filter((d) => d.branchId === b.id).map((d) => (
                          <div key={d.id} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/60">
                            <FileText className="size-3.5 text-primary shrink-0" />
                            <span className="text-xs font-medium">{d.type}</span>
                            <span className="text-[11px] text-muted-foreground truncate">{d.name}</span>
                            <button onClick={() => setDocs(docs.filter((x) => x.id !== d.id))} className="ml-auto p-1 rounded text-destructive hover:bg-destructive/10">
                              <X className="size-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step.key === "done" && (
                <div className="text-center py-8">
                  <div className="size-20 rounded-full bg-success/15 grid place-items-center mx-auto">
                    <CheckCircle2 className="size-10 text-success" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold">You're all set!</h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Your salon workspace is ready. You can update any of this later from <span className="font-semibold text-foreground">Setup → Configuration</span>.
                  </p>
                  <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2">
                    <Pill>{branches.length} branch{branches.length !== 1 && "es"}</Pill>
                    <Pill>{docs.length} document{docs.length !== 1 && "s"}</Pill>
                    {salonName && <Pill>{salonName}</Pill>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="border-t border-border/60 px-6 lg:px-12 py-4 flex items-center justify-between bg-card/40">
          <button
            onClick={back}
            disabled={i === 0}
            className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-md text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="size-4" /> {t("Back")}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={skip}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-md text-muted-foreground hover:text-foreground font-medium"
            >
              {i === STEPS.length - 1 ? t("Skip & go home") : t("Skip")}
            </button>
            {i < STEPS.length - 1 ? (
              <button onClick={next} className="inline-flex items-center gap-1.5 text-sm px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                {t("Continue")} <ArrowRight className="size-4" />
              </button>
            ) : (
              <button onClick={finish} className="inline-flex items-center gap-1.5 text-sm px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                {t("Go to dashboard")} <ArrowRight className="size-4" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Input({
  label, value, onChange, placeholder, type = "text", icon: Icon,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div>
      <label className="text-xs font-medium text-foreground">{label}</label>
      <div className="relative mt-1">
        {Icon && <Icon className="size-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-muted/60 rounded-md py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50",
            Icon ? "pl-9 pr-3" : "px-3",
          )}
        />
      </div>
    </div>
  );
}

function OnboardDocUploader({ onUpload }: { onUpload: (f: File, type: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("Trade License");
  return (
    <div className="flex items-center gap-2">
      <select value={type} onChange={(e) => setType(e.target.value)} className="bg-muted/60 rounded-md px-2 py-1 text-[11px] outline-none focus:ring-2 focus:ring-ring/50">
        <option>Trade License</option>
        <option>VAT Certificate</option>
        <option>TIN Certificate</option>
        <option>Fire License</option>
        <option>Other</option>
      </select>
      <input ref={ref} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f, type); if (ref.current) ref.current.value = ""; }} />
      <button onClick={() => ref.current?.click()} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
        <Upload className="size-3" /> Upload
      </button>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-xs font-medium">{children}</span>;
}
export default routeOptions.component;
