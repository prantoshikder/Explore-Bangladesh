"use client";

/**
 * Contact / feedback form. There is no server: on submit it opens the
 * visitor's email app with a pre-filled message to SITE.contactEmail
 * (mailto). Topic and page can be pre-set via ?topic=correction&page=/spots/x.
 */
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { SITE } from "@/lib/site";
import { useT } from "@/i18n/client";

const TOPIC_IDS = [
  { value: "question", icon: "❓" },
  { value: "correction", icon: "✏️" },
  { value: "suggestion", icon: "📍" },
  { value: "other", icon: "💬" },
] as const;

const field = "w-full rounded-2xl bg-sand px-4 py-3 text-sm ring-1 ring-jute placeholder:text-muted focus:ring-2 focus:ring-brand-500 focus:outline-none";

export function ContactForm() {
  const params = useSearchParams();
  const t = useT();
  const TOPICS = TOPIC_IDS.map((x) => ({ value: x.value, icon: x.icon, label: t.contact.topics[x.value] }));
  const [topic, setTopic] = useState<string>(TOPIC_IDS.some((x) => x.value === params.get("topic")) ? params.get("topic")! : "question");
  const [name, setName] = useState("");
  const [page, setPage] = useState(params.get("page") ?? "");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "opened" | "no-email" | "empty">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return setStatus("empty");
    if (!SITE.contactEmail) return setStatus("no-email");
    const topicLabel = TOPICS.find((x) => x.value === topic)?.label ?? topic;
    const subject = `[Explore Bangladesh] ${topicLabel}${page ? ` — ${page}` : ""}`;
    const body = [message.trim(), "", "—", name && `Name: ${name}`, page && `Page: ${SITE.url}${page.startsWith("/") ? page : `/${page}`}`].filter(Boolean).join("\n");
    window.location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("opened");
  };

  return (
    <form onSubmit={submit} className="space-y-5 rounded-[2rem] bg-white p-6 shadow-xl shadow-brand-900/5 ring-1 ring-jute sm:p-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">{t.contact.about}</span>
        <Select ariaLabel={t.contact.about} value={topic} onChange={setTopic} options={TOPICS} className="mt-2" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">{t.contact.name}</span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={`${field} mt-2`} placeholder={t.contact.namePh} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">{t.contact.page}</span>
          <input value={page} onChange={(e) => setPage(e.target.value)} className={`${field} mt-2`} placeholder={t.contact.pagePh} />
        </label>
      </div>
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">{t.contact.message}</span>
        <textarea
          value={message}
          onChange={(e) => { setMessage(e.target.value); if (status === "empty") setStatus("idle"); }}
          rows={6}
          required
          className={`${field} mt-2 resize-y`}
          placeholder={topic === "correction" ? t.contact.messagePhCorrection : t.contact.messagePh}
        />
      </label>

      <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700 sm:w-auto">
        {t.contact.send}
      </button>

      <p className="text-xs text-muted" aria-live="polite">
        {status === "opened" && t.contact.opened}
        {status === "empty" && t.contact.empty}
        {status === "no-email" && t.contact.noEmail}
        {status === "idle" && t.contact.idle}
      </p>
    </form>
  );
}
