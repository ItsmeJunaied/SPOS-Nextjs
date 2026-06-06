import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Clock, Loader2, Mail, User, Building2, Video, Globe2, ChevronLeft, ChevronRight } from "lucide-react";
import { MarketingNav } from "@/modules/landing/components/MarketingNav";

export const routeOptions = ({
  component: RequestDemoPage,
  head: () => ({
    meta: [
      { title: "Book a demo — Salonix" },
      { name: "description", content: "Pick a date and time. We'll email a Google Meet link to your inbox." },
      { property: "og:title", content: "Book a demo — Salonix" },
      { property: "og:description", content: "Pick a date and time. We'll email a Google Meet link to your inbox." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://salonix.io/request-demo" },
    ],
    links: [{ rel: "canonical", href: "https://salonix.io/request-demo" }],
  }),
});

const DURATIONS = [15, 30, 45];

const SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

function RequestDemoPage() {
  const [duration, setDuration] = useState(30);
  const [month, setMonth] = useState(() => {
    const d = new Date(); d.setDate(1); return d;
  });
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"pick" | "form" | "done">("pick");

  const [form, setForm] = useState({ name: "", email: "", company: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [meetLink, setMeetLink] = useState("");

  const days = useMemo(() => buildMonth(month), [month]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: server function: create Google Calendar event with Meet link, email customer.
    setTimeout(() => {
      const id = Math.random().toString(36).slice(2, 5) + "-" + Math.random().toString(36).slice(2, 6) + "-" + Math.random().toString(36).slice(2, 5);
      setMeetLink(`https://meet.google.com/${id}`);
      setLoading(false);
      setStep("done");
    }, 900);
  }

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <div className="mx-auto max-w-7xl px-5 pt-10 pb-16">
        <Link to="/home" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back home
        </Link>

        <div className="mt-6 grid lg:grid-cols-[320px_1fr] rounded-3xl border bg-card overflow-hidden soft-shadow">
          {/* Sidebar */}
          <aside className="p-6 sm:p-8 border-r bg-gradient-to-b from-accent/40 to-background">
            <div className="size-10 rounded-full bg-primary text-primary-foreground grid place-items-center">
              <Video className="size-5" />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">Salonix Team</div>
            <h1 className="text-2xl font-bold tracking-tight">Salonix Live Demo</h1>
            <div className="mt-5 space-y-3 text-sm">
              <Row icon={Clock}>{duration} min</Row>
              <Row icon={Video}>Google Meet (link sent on confirm)</Row>
              <Row icon={Globe2}>Asia/Dhaka (auto-detected)</Row>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              A focused walkthrough of POS, bookings, floor plan and multi-branch dashboards — tailored to your salon.
            </p>
            {step !== "pick" && (
              <button onClick={() => { setStep("pick"); setSlot(null); }} className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                <ArrowLeft className="size-3" /> Change time
              </button>
            )}
          </aside>

          {/* Main */}
          <div className="p-6 sm:p-8">
            {step === "pick" && (
              <>
                <div className="flex items-center gap-2">
                  {DURATIONS.map((d) => (
                    <button key={d} onClick={() => setDuration(d)}
                      className={`text-xs rounded-full px-3 py-1.5 border transition ${duration === d ? "bg-foreground text-background border-foreground" : "hover:bg-muted"}`}>
                      {d} min
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid md:grid-cols-[1fr_240px] gap-6">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">
                        {month.toLocaleString(undefined, { month: "long", year: "numeric" })}
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => setMonth(addMonth(month, -1))} className="size-8 rounded-full grid place-items-center hover:bg-muted"><ChevronLeft className="size-4" /></button>
                        <button onClick={() => setMonth(addMonth(month, 1))} className="size-8 rounded-full grid place-items-center hover:bg-muted"><ChevronRight className="size-4" /></button>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-7 text-[11px] text-center text-muted-foreground">
                      {["S","M","T","W","T","F","S"].map((d, i) => <div key={i} className="py-1">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((d, i) => {
                        if (!d) return <div key={i} />;
                        const disabled = d < today || d.getDay() === 0; // disable Sundays + past
                        const selected = date && sameDay(d, date);
                        return (
                          <button key={i} disabled={disabled}
                            onClick={() => { setDate(d); setSlot(null); }}
                            className={`aspect-square rounded-full text-sm transition ${
                              selected ? "bg-foreground text-background font-semibold"
                              : disabled ? "text-muted-foreground/40"
                              : "hover:bg-primary/20 text-foreground"
                            }`}>
                            {d.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <div className="font-semibold text-sm">
                      {date ? date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" }) : "Pick a day first"}
                    </div>
                    <div className="mt-3 max-h-72 overflow-y-auto pr-1 space-y-1.5">
                      {date && SLOTS.map((s) => (
                        <button key={s} onClick={() => setSlot(s)}
                          className={`w-full rounded-lg border py-2 text-sm font-medium transition ${slot === s ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                    {slot && (
                      <button onClick={() => setStep("form")} className="mt-3 w-full rounded-full bg-foreground text-background py-2.5 text-sm font-semibold">
                        Confirm {slot}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {step === "form" && date && slot && (
              <form onSubmit={submit} className="space-y-4 max-w-md">
                <div className="rounded-xl border bg-muted/40 p-3 text-sm flex items-center gap-2">
                  <Clock className="size-4 text-primary" />
                  <span className="font-semibold">{date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })} · {slot}</span>
                  <span className="text-muted-foreground">({duration} min)</span>
                </div>

                <FormField icon={User} label="Full name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="fi" placeholder="Jane Doe" /></FormField>
                <FormField icon={Mail} label="Email"><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="fi" placeholder="you@salon.com" /></FormField>
                <FormField icon={Building2} label="Salon / Company"><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="fi" placeholder="Glow Studios" /></FormField>
                <div>
                  <label className="text-xs font-medium">Anything we should know? (optional)</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="fi mt-1 resize-none" placeholder="Number of branches, top pain points…" />
                </div>

                <button disabled={loading} className="w-full rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary/90 inline-flex items-center justify-center gap-2 disabled:opacity-70">
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  {loading ? "Scheduling…" : "Schedule & email Google Meet link"}
                </button>
              </form>
            )}

            {step === "done" && (
              <div className="max-w-md">
                <div className="size-12 rounded-full bg-primary/15 text-primary grid place-items-center">
                  <CheckCircle2 className="size-6" />
                </div>
                <h2 className="mt-4 text-2xl font-bold">You're booked!</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We sent a confirmation and Google Meet link to <span className="font-medium text-foreground">{form.email}</span>.
                </p>
                <div className="mt-5 rounded-xl border bg-muted/40 p-4 text-sm space-y-2">
                  <div className="flex items-center gap-2"><Clock className="size-4 text-primary" /> {date?.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })} · {slot} ({duration} min)</div>
                  <div className="flex items-center gap-2"><Video className="size-4 text-primary" /> <a href={meetLink} target="_blank" rel="noreferrer" className="text-primary underline break-all">{meetLink}</a></div>
                </div>
                <Link to="/home" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold">Back home</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .fi { width:100%; background: hsl(var(--card)); border:1px solid hsl(var(--input)); border-radius:.55rem; padding:.55rem .75rem .55rem 2.25rem; font-size:.875rem; outline:none; }
        textarea.fi { padding-left:.75rem; }
        .fi:focus { box-shadow: 0 0 0 2px hsl(var(--ring) / .4); }
      `}</style>
    </div>
  );
}

function Row({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return <div className="flex items-center gap-2 text-foreground"><Icon className="size-4 text-primary" /> {children}</div>;
}
function FormField({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium">{label}</label>
      <div className="relative mt-1">
        <Icon className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
        {children}
      </div>
    </div>
  );
}

function buildMonth(monthStart: Date) {
  const y = monthStart.getFullYear(); const m = monthStart.getMonth();
  const first = new Date(y, m, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const out: (Date | null)[] = [];
  for (let i = 0; i < startPad; i++) out.push(null);
  for (let d = 1; d <= daysInMonth; d++) out.push(new Date(y, m, d));
  while (out.length % 7 !== 0) out.push(null);
  return out;
}
function addMonth(d: Date, n: number) { const x = new Date(d); x.setMonth(x.getMonth() + n); return x; }
function sameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
export default routeOptions.component;
