"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Clock, Loader2, Mail, User, Building2, Video, Globe2, ChevronLeft, ChevronRight } from "lucide-react";

const DURATIONS = [15, 30, 45];
const SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];

function buildMonth(d: Date) {
  const year = d.getFullYear();
  const month = d.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) grid.push(i);
  return grid;
}

export default function RequestDemoPage() {
  const [duration, setDuration] = useState(30);
  const [month, setMonth] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const today = new Date(); today.setHours(0,0,0,0);
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"pick"|"form"|"done">("pick");
  const [form, setForm] = useState({ name:"", email:"", company:"", notes:"" });
  const [loading, setLoading] = useState(false);
  const [meetLink, setMeetLink] = useState("");
  const days = useMemo(() => buildMonth(month), [month]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const id = Math.random().toString(36).slice(2,5)+"-"+Math.random().toString(36).slice(2,6)+"-"+Math.random().toString(36).slice(2,5);
      setMeetLink(`https://meet.google.com/${id}`);
      setStep("done");
      setLoading(false);
    }, 1800);
  }

  if (step === "done") return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-5 py-24">
      <div className="max-w-md w-full text-center">
        <div className="size-16 rounded-full bg-emerald-500/15 text-emerald-500 grid place-items-center mx-auto">
          <CheckCircle2 className="size-8" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">You're booked!</h1>
        <p className="mt-3 text-[var(--muted-foreground)] text-sm">
          {date?.toLocaleDateString(undefined, {weekday:"long",month:"long",day:"numeric"})} at {slot} · {duration} min
        </p>
        <a href={meetLink} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 text-sm font-semibold">
          <Video className="size-4" /> Join Google Meet
        </a>
        <div className="mt-3 text-xs text-[var(--muted-foreground)]">Link also sent to {form.email}</div>
        <Link href="/" className="mt-6 block text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">← Back to home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition mb-8">
          <ArrowLeft className="size-4" /> Back
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-[var(--primary)]/15 rounded-full pl-1 pr-3 py-1 mb-4">
            <span className="size-4 rounded-full bg-[var(--primary)] grid place-items-center"><CheckCircle2 className="size-3 text-[var(--primary-foreground)]" /></span>
            Book a demo
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Pick a time that works for you</h1>
          <p className="mt-3 text-[var(--muted-foreground)] text-sm">We'll send a Google Meet link to your inbox. No commitment.</p>
        </div>

        {step === "pick" && (
          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            {/* Left: Duration + Calendar */}
            <div className="space-y-8">
              {/* Duration */}
              <div>
                <div className="text-sm font-semibold mb-3">Session duration</div>
                <div className="flex gap-3">
                  {DURATIONS.map(d => (
                    <button key={d} type="button" onClick={() => setDuration(d)} className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium border transition ${duration===d ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "hover:bg-[var(--muted)]"}`}>
                      <Clock className="size-3.5" /> {d} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button type="button" onClick={() => setMonth(m => { const d = new Date(m); d.setMonth(d.getMonth()-1); return d; })} className="size-8 rounded-full border grid place-items-center hover:bg-[var(--muted)] transition"><ChevronLeft className="size-4" /></button>
                  <div className="font-semibold text-sm">{month.toLocaleDateString(undefined, { month:"long", year:"numeric" })}</div>
                  <button type="button" onClick={() => setMonth(m => { const d = new Date(m); d.setMonth(d.getMonth()+1); return d; })} className="size-8 rounded-full border grid place-items-center hover:bg-[var(--muted)] transition"><ChevronRight className="size-4" /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-[var(--muted-foreground)] mb-2">
                  {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, i) => {
                    if (!day) return <div key={i} />;
                    const d = new Date(month.getFullYear(), month.getMonth(), day);
                    const isPast = d < today;
                    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                    const isSelected = date?.toDateString() === d.toDateString();
                    const disabled = isPast || isWeekend;
                    return (
                      <button key={i} type="button" disabled={disabled} onClick={() => { setDate(d); setSlot(null); }} className={`h-9 rounded-full text-sm font-medium transition ${isSelected ? "bg-[var(--foreground)] text-[var(--background)]" : disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-[var(--muted)]"}`}>
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Time slots */}
            <div>
              {date ? (
                <>
                  <div className="text-sm font-semibold mb-3">
                    {date.toLocaleDateString(undefined, { weekday:"long", month:"long", day:"numeric" })}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SLOTS.map(s => (
                      <button key={s} type="button" onClick={() => setSlot(s)} className={`rounded-full px-4 py-2.5 text-sm font-medium border transition ${slot===s ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "hover:bg-[var(--muted)]"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {slot && (
                    <button type="button" onClick={() => setStep("form")} className="mt-6 w-full rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] py-3 text-sm font-semibold hover:opacity-90 transition">
                      Continue with {slot}
                    </button>
                  )}
                </>
              ) : (
                <div className="rounded-2xl border border-dashed bg-[var(--muted)]/30 h-64 grid place-items-center text-sm text-[var(--muted-foreground)]">
                  Select a date to see available times
                </div>
              )}
            </div>
          </div>
        )}

        {step === "form" && (
          <div className="max-w-md mx-auto">
            <button type="button" onClick={() => setStep("pick")} className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-6">
              <ArrowLeft className="size-4" /> Change time
            </button>
            <div className="rounded-2xl border bg-[var(--card)] p-5 mb-6 text-sm">
              <div className="font-semibold">Your booking</div>
              <div className="mt-2 text-[var(--muted-foreground)]">
                {date?.toLocaleDateString(undefined, { weekday:"long", month:"long", day:"numeric" })} at {slot} · {duration} min
              </div>
            </div>
            <form onSubmit={submit} className="space-y-4">
              {[
                { id:"name", label:"Full name", type:"text", icon:User, placeholder:"Ayesha Rahman" },
                { id:"email", label:"Work email", type:"email", icon:Mail, placeholder:"ayesha@salon.com" },
                { id:"company", label:"Salon / company", type:"text", icon:Building2, placeholder:"Glow Studio" },
              ].map(f => {
                const Icon = f.icon;
                return (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-sm font-medium mb-1.5">{f.label}</label>
                    <div className="relative">
                      <Icon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                      <input id={f.id} type={f.type} required value={(form as any)[f.id]} onChange={e => setForm(p => ({...p,[f.id]:e.target.value}))} placeholder={f.placeholder} className="w-full rounded-full border border-[var(--border)] bg-[var(--card)] pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
                    </div>
                  </div>
                );
              })}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1.5">What would you like to cover? <span className="text-[var(--muted-foreground)] font-normal">(optional)</span></label>
                <textarea id="notes" rows={3} value={form.notes} onChange={e => setForm(p => ({...p,notes:e.target.value}))} placeholder="e.g. We have 3 branches and need multi-branch reporting…" className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="size-4 animate-spin" /> Booking…</> : <><Video className="size-4" /> Confirm booking</>}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
