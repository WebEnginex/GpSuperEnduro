"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Ticket,
  Mail,
  LogOut,
  LayoutDashboard,
  ExternalLink,
} from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/cn";

const tabs = [
  {
    href: "/admin",
    label: "Vue",
    icon: LayoutDashboard,
    exact: true,
    activeClass: "text-sky-300",
    ringClass: "ring-sky-500/50",
    bgClass: "bg-sky-500/10",
  },
  {
    href: "/admin/billets",
    label: "Billets",
    icon: Ticket,
    activeClass: "text-amber-300",
    ringClass: "ring-amber-500/50",
    bgClass: "bg-amber-500/10",
  },
  {
    href: "/admin/messages",
    label: "Messages",
    icon: Mail,
    activeClass: "text-violet-300",
    ringClass: "ring-violet-500/50",
    bgClass: "bg-violet-500/10",
  },
] as const;

function isTabActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({
  children,
  adminName,
}: {
  children: React.ReactNode;
  adminName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="relative min-h-[100dvh] bg-background text-foreground">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(227,6,19,0.05),_transparent_45%),radial-gradient(ellipse_at_bottom_right,_rgba(56,189,248,0.05),_transparent_40%)]"
        aria-hidden="true"
      />

      <div className="relative flex min-h-[100dvh] flex-col">
        <header className="theme-dark sticky top-0 z-40 border-b border-white/10 bg-black/95 backdrop-blur-xl shadow-lg">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-red">
                Admin
              </p>
              <p className="truncate text-sm text-zinc-300">{adminName}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-950 px-2.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white sm:px-3"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Voir le site</span>
                <span className="sm:hidden">Site</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-2 text-xs font-medium text-zinc-500 transition-colors hover:border-white/20 hover:text-white sm:px-3"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>

          <nav
            className="mx-auto hidden max-w-5xl px-4 sm:px-6 md:block"
            aria-label="Admin"
          >
            <ul className="flex gap-1.5 pb-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = isTabActive(
                  pathname,
                  tab.href,
                  "exact" in tab ? tab.exact : false
                );
                return (
                  <li key={tab.href}>
                    <Link
                      href={tab.href}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                        active
                          ? cn(
                              "bg-zinc-900 text-white ring-1",
                              tab.ringClass,
                              tab.bgClass
                            )
                          : "text-zinc-500 hover:bg-zinc-950 hover:text-zinc-200"
                      )}
                    >
                      <Icon
                        size={16}
                        strokeWidth={active ? 2.4 : 2}
                        className={active ? tab.activeClass : undefined}
                      />
                      {tab.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-5 sm:px-6 sm:py-8 pb-28 md:pb-10">
          {children}
        </main>

        <nav
          className="theme-dark fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 backdrop-blur-xl md:hidden safe-pb"
          aria-label="Admin mobile"
        >
          <ul className="mx-auto grid max-w-5xl grid-cols-3 gap-1 px-2 py-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = isTabActive(
                pathname,
                tab.href,
                "exact" in tab ? tab.exact : false
              );
              return (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-2.5 text-[11px] font-medium uppercase tracking-wider transition-colors",
                      active
                        ? cn(
                            "text-white ring-1 ring-inset",
                            tab.ringClass,
                            tab.bgClass
                          )
                        : "text-zinc-500 hover:text-zinc-300"
                    )}
                  >
                    <Icon
                      size={20}
                      strokeWidth={active ? 2.4 : 2}
                      className={active ? tab.activeClass : undefined}
                    />
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
