"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  ArrowLeft,
  ArrowUpDown,
  Mail,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { contactCategories } from "@/data/contact";
import type { ContactMessageRow } from "@/lib/admin/messages";
import { cn } from "@/lib/cn";

const statusLabels: Record<string, string> = {
  new: "Nouveau",
  read: "Lu",
  replied: "Répondu",
  archived: "Archivé",
};

const statusOptions = [
  { value: "all", label: "Tous les statuts" },
  { value: "new", label: "Nouveau" },
  { value: "read", label: "Lu" },
  { value: "replied", label: "Répondu" },
  { value: "archived", label: "Archivé" },
] as const;

const sortOptions = [
  { value: "newest", label: "Plus récents" },
  { value: "oldest", label: "Plus anciens" },
  { value: "status", label: "Par statut" },
  { value: "category", label: "Par catégorie" },
] as const;

const categoryStyles: Record<string, string> = {
  general: "border-sky-500/40 bg-sky-500/10 text-sky-700",
  tickets: "border-amber-500/40 bg-amber-500/10 text-amber-700",
  vip: "border-violet-500/40 bg-violet-500/10 text-violet-700",
  press: "border-cyan-500/40 bg-cyan-500/10 text-cyan-700",
  partnership: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700",
  volunteer: "border-lime-600/40 bg-lime-500/10 text-lime-700",
  other: "border-zinc-400/50 bg-zinc-500/10 text-zinc-700",
};

type SortValue = (typeof sortOptions)[number]["value"];
type StatusFilter = (typeof statusOptions)[number]["value"];

function categoryLabel(value: string) {
  return contactCategories.find((c) => c.value === value)?.label ?? value;
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function StatusBadge({ status }: { status: string }) {
  const isNew = status === "new";
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        isNew
          ? "border-brand-red/40 text-brand-red"
          : "border-line-strong text-subtle"
      )}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full truncate rounded-md border px-2 py-0.5 text-[10px] font-medium",
        categoryStyles[category] ?? categoryStyles.other
      )}
    >
      {categoryLabel(category)}
    </span>
  );
}

const selectClass =
  "w-full rounded-md border border-line-strong bg-background px-3 py-2 text-sm text-foreground focus:border-brand-red/40 focus:outline-none";

const checkboxClass =
  "h-4 w-4 shrink-0 rounded border-line-strong bg-surface accent-brand-red focus:ring-brand-red/40 focus:ring-offset-0";

export function MessagesInbox({
  initialMessages,
}: {
  initialMessages: ContactMessageRow[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [reply, setReply] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortValue>("newest");
  const [error, setError] = useState<string | null>(null);
  const [replyError, setReplyError] = useState<string | null>(null);
  const [replySuccess, setReplySuccess] = useState(false);
  const [pending, startTransition] = useTransition();
  const [replyPending, startReplyTransition] = useTransition();
  const [confirmDeleteIds, setConfirmDeleteIds] = useState<string[] | null>(
    null
  );

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const filteredMessages = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = messages.filter((message) => {
      if (statusFilter !== "all" && message.status !== statusFilter) {
        return false;
      }
      if (categoryFilter !== "all" && message.category !== categoryFilter) {
        return false;
      }
      if (!q) return true;

      const haystack = [
        message.name,
        message.email,
        message.subject,
        message.message,
        categoryLabel(message.category),
        message.category,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    const statusOrder = ["new", "read", "replied", "archived"];

    list.sort((a, b) => {
      if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      if (sortBy === "status") {
        const diff =
          statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        if (diff !== 0) return diff;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortBy === "category") {
        const diff = categoryLabel(a.category).localeCompare(
          categoryLabel(b.category),
          "fr"
        );
        if (diff !== 0) return diff;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return list;
  }, [messages, query, statusFilter, categoryFilter, sortBy]);

  const selected = useMemo(
    () => filteredMessages.find((m) => m.id === selectedId) ?? null,
    [filteredMessages, selectedId]
  );

  const filteredIds = filteredMessages.map((m) => m.id);
  const allFilteredSelected =
    filteredIds.length > 0 && filteredIds.every((id) => selectedIds.has(id));
  const someFilteredSelected = filteredIds.some((id) => selectedIds.has(id));
  const newCount = messages.filter((m) => m.status === "new").length;

  const hasActiveFilters =
    query.trim() !== "" ||
    statusFilter !== "all" ||
    categoryFilter !== "all" ||
    sortBy !== "newest";

  const resetFilters = () => {
    setQuery("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSortBy("newest");
  };

  const markAsRead = (id: string) => {
    const target = messages.find((m) => m.id === id);
    if (!target || target.status !== "new") return;

    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "read" } : m))
    );

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/messages", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: [id], status: "read" }),
        });
        if (!response.ok) {
          const data = (await response.json()) as { error?: string };
          throw new Error(data.error || "Mise à jour impossible.");
        }
      } catch (err) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: "new" } : m))
        );
        setError(
          err instanceof Error ? err.message : "Mise à jour impossible."
        );
      }
    });
  };

  const openMessage = (id: string) => {
    setSelectedId(id);
    setReply("");
    setError(null);
    setReplyError(null);
    setReplySuccess(false);
    markAsRead(id);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllFiltered = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allFilteredSelected) {
        filteredIds.forEach((id) => next.delete(id));
      } else {
        filteredIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const sendReply = () => {
    if (!selectedId || !reply.trim() || replyPending) return;
    setReplyError(null);
    setReplySuccess(false);
    const body = reply.trim();
    const messageId = selectedId;

    startReplyTransition(async () => {
      try {
        const response = await fetch("/api/admin/messages/reply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: messageId, reply: body }),
        });
        const data = (await response.json()) as { error?: string };
        if (!response.ok) {
          throw new Error(data.error || "Envoi impossible.");
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId ? { ...m, status: "replied" } : m
          )
        );
        setReply("");
        setReplySuccess(true);
      } catch (err) {
        setReplyError(
          err instanceof Error ? err.message : "Envoi impossible."
        );
      }
    });
  };

  const askDelete = (ids: string[]) => {
    if (ids.length === 0) return;
    setConfirmDeleteIds(ids);
  };

  const confirmDelete = () => {
    if (!confirmDeleteIds?.length) return;
    const ids = confirmDeleteIds;
    setConfirmDeleteIds(null);
    setError(null);

    const previous = messages;
    setMessages((prev) => prev.filter((m) => !ids.includes(m.id)));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
    if (selectedId && ids.includes(selectedId)) {
      setSelectedId(null);
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/messages", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids }),
        });
        if (!response.ok) {
          const data = (await response.json()) as { error?: string };
          throw new Error(data.error || "Suppression impossible.");
        }
      } catch (err) {
        setMessages(previous);
        setError(
          err instanceof Error ? err.message : "Suppression impossible."
        );
      }
    });
  };

  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line-strong bg-surface/70 px-6 py-12 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-background text-subtle">
          <Mail size={22} />
        </div>
        <p className="text-base font-medium text-foreground">Aucun message</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-subtle">
          Les messages du formulaire contact apparaîtront ici.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="rounded-xl border border-line bg-surface shadow-card p-3 sm:p-4">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          <label className="relative sm:col-span-2 xl:col-span-1">
            <span className="sr-only">Rechercher</span>
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher…"
              className="w-full rounded-md border border-line-strong bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-subtle focus:border-brand-red/40 focus:outline-none"
            />
          </label>

          <label>
            <span className="sr-only">Filtrer par statut</span>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as StatusFilter)
              }
              className={selectClass}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Filtrer par catégorie</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={selectClass}
            >
              <option value="all">Toutes les catégories</option>
              {contactCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>

          <label className="relative">
            <span className="sr-only">Trier</span>
            <ArrowUpDown
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortValue)}
              className={cn(selectClass, "pl-9")}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-xs text-subtle">
            <span className="font-semibold tabular-nums text-foreground/85">
              {filteredMessages.length}
            </span>{" "}
            message{filteredMessages.length > 1 ? "s" : ""}
            {filteredMessages.length !== messages.length
              ? ` sur ${messages.length}`
              : null}
            {newCount > 0 ? (
              <>
                {" · "}
                <span className="font-semibold text-brand-red">
                  {newCount} nouveau{newCount > 1 ? "x" : ""}
                </span>
              </>
            ) : null}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {selectedIds.size > 0 ? (
              <button
                type="button"
                disabled={pending}
                onClick={() => askDelete(Array.from(selectedIds))}
                className="inline-flex items-center gap-1.5 rounded-md bg-brand-red px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-brand-red/20 transition-colors hover:bg-brand-red-dark disabled:opacity-60"
              >
                <Trash2 size={12} />
                Supprimer ({selectedIds.size})
              </button>
            ) : null}
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <X size={12} />
                Réinitialiser
              </button>
            ) : null}
          </div>
        </div>

        {error ? (
          <p className="mt-3 text-sm text-brand-red" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-4">
        <div
          className={cn(
            "overflow-hidden rounded-xl border border-line bg-surface shadow-card",
            selected ? "hidden lg:block" : "block"
          )}
        >
          <div className="flex items-center gap-3 border-b border-line px-3.5 py-2.5 sm:px-4">
            <input
              type="checkbox"
              className={checkboxClass}
              checked={allFilteredSelected}
              ref={(el) => {
                if (el) {
                  el.indeterminate =
                    someFilteredSelected && !allFilteredSelected;
                }
              }}
              onChange={toggleSelectAllFiltered}
              aria-label="Tout sélectionner"
            />
            <span className="text-xs text-subtle">
              {allFilteredSelected
                ? "Tout désélectionner"
                : "Tout sélectionner"}
            </span>
          </div>

          <ul className="max-h-[min(55vh,480px)] divide-y divide-line overflow-y-auto sm:max-h-[min(60vh,560px)] lg:max-h-[min(72vh,640px)]">
            {filteredMessages.length === 0 ? (
              <li className="px-4 py-10 text-center text-sm text-subtle">
                Aucun message ne correspond à ces filtres.
              </li>
            ) : (
              filteredMessages.map((message) => {
                const active = message.id === selectedId;
                const checked = selectedIds.has(message.id);
                return (
                  <li key={message.id}>
                    <div
                      className={cn(
                        "flex items-start gap-3 px-3.5 py-3.5 transition-colors sm:px-4",
                        active ? "bg-brand-red/[0.06]" : "hover:bg-foreground/[0.03]"
                      )}
                    >
                      <input
                        type="checkbox"
                        className={cn(checkboxClass, "mt-1")}
                        checked={checked}
                        onChange={() => toggleSelect(message.id)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Sélectionner ${message.subject}`}
                      />
                      <button
                        type="button"
                        onClick={() => openMessage(message.id)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <div className="mb-1.5 flex items-start justify-between gap-2">
                          <p className="min-w-0 truncate text-sm font-medium text-foreground">
                            {message.name}
                          </p>
                          <StatusBadge status={message.status} />
                        </div>
                        <p className="truncate text-xs text-muted">
                          {message.subject}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <CategoryBadge category={message.category} />
                          <span className="text-[11px] text-subtle">
                            {formatDate(message.createdAt)}
                          </span>
                        </div>
                      </button>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        {selected ? (
          <div className="flex min-h-[min(70vh,520px)] flex-col rounded-xl border border-line bg-surface shadow-card p-4 sm:min-h-[420px] sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground lg:hidden"
              >
                <ArrowLeft size={14} />
                Retour à la liste
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => askDelete([selected.id])}
                className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-brand-red px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-60"
              >
                <Trash2 size={12} />
                Supprimer
              </button>
            </div>

            <div className="mb-4 border-b border-line pb-4">
              <div className="mb-2.5 flex flex-wrap items-center gap-2">
                <StatusBadge status={selected.status} />
                <CategoryBadge category={selected.category} />
                <span className="text-[11px] text-subtle">
                  {formatDate(selected.createdAt)}
                </span>
              </div>
              <h2 className="text-base font-medium leading-snug text-foreground sm:text-lg">
                {selected.subject}
              </h2>
              <p className="mt-1.5 break-words text-sm text-muted">
                {selected.name}
                <span className="text-subtle"> · </span>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-foreground/85 underline-offset-2 hover:underline"
                >
                  {selected.email}
                </a>
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/85">
                {selected.message}
              </p>
            </div>

            <div className="mt-5 space-y-3 border-t border-line pt-4">
              <label
                htmlFor="admin-reply"
                className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle"
              >
                Répondre
              </label>
              <textarea
                id="admin-reply"
                value={reply}
                onChange={(e) => {
                  setReply(e.target.value);
                  setReplySuccess(false);
                  setReplyError(null);
                }}
                rows={4}
                placeholder="Écrire une réponse…"
                className="w-full resize-y rounded-md border border-line-strong bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-subtle focus:border-brand-red/50 focus:outline-none"
              />
              {replyError ? (
                <p className="text-xs text-brand-red">{replyError}</p>
              ) : null}
              {replySuccess ? (
                <p className="text-xs text-emerald-700">
                  Réponse envoyée.
                </p>
              ) : null}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] text-subtle">
                  Envoi depuis contact@gpsuperenduroparis.fr via Brevo.
                </p>
                <button
                  type="button"
                  disabled={replyPending || !reply.trim()}
                  onClick={sendReply}
                  className="rounded-md bg-brand-red px-4 py-2.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {replyPending ? "Envoi…" : "Envoyer"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden min-h-[420px] items-center justify-center rounded-xl border border-dashed border-line-strong bg-surface/60 p-8 text-center lg:flex">
            <div>
              <Mail className="mx-auto mb-3 text-subtle" size={28} />
              <p className="text-sm text-subtle">
                Sélectionne un message pour le lire.
              </p>
            </div>
          </div>
        )}
      </div>

      {confirmDeleteIds ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm p-4 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-sm rounded-xl border border-line bg-surface p-5 shadow-2xl"
          >
            <h3 id="delete-title" className="text-lg font-medium text-foreground">
              Supprimer{" "}
              {confirmDeleteIds.length > 1
                ? `ces ${confirmDeleteIds.length} messages`
                : "ce message"}{" "}
              ?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Cette action est définitive. Les messages sélectionnés seront
              retirés de la boîte de réception.
            </p>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setConfirmDeleteIds(null)}
                className="rounded-md border border-line-strong px-4 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-md bg-brand-red px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
