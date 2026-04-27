"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Row = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  organizationName?: string;
  jobTitle?: string;
  numberOfEmployees?: string;
  location?: string;
  phoneNumber?: string;
  message?: string;
  services?: string[];
  createdAt: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ContactSubmissionsDashboard({ initialData }: { initialData: Row[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return initialData;

    return initialData.filter((r) => {
      const hay = [
        r.firstName,
        r.lastName,
        r.email,
        r.organizationName,
        r.jobTitle,
        r.location,
        r.phoneNumber,
        r.message,
        ...(r.services || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }, [initialData, q]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-10 md:py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-pink">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-brand-red">
            Contact submissions
          </h1>
          <p className="mt-2 text-gray-600">
            Review and respond to inbound requests in one place.
          </p>
        </div>

        <div className="relative w-full md:w-[360px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, company, message..."
            className="pl-9 bg-white"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{initialData.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Showing</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{filtered.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Latest</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {filtered[0]?.createdAt ? formatDate(filtered[0].createdAt) : "—"}
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-3 border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
          <div className="col-span-4">Person</div>
          <div className="col-span-3">Company</div>
          <div className="col-span-3">Services</div>
          <div className="col-span-2 text-right">Received</div>
        </div>

        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-500">No submissions found.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((r) => {
              const name = `${r.firstName} ${r.lastName}`.trim();
              const services = (r.services || []).slice(0, 3);
              const more = (r.services || []).length - services.length;

              return (
                <div key={r._id} className="px-5 py-4">
                  <div className="grid grid-cols-12 gap-3 items-start">
                    <div className="col-span-12 md:col-span-4">
                      <p className="font-semibold text-gray-900">{name || "—"}</p>
                      <p className="mt-1 text-sm text-gray-600">{r.email}</p>
                      {(r.phoneNumber || r.location) && (
                        <p className="mt-1 text-xs text-gray-500">
                          {[r.phoneNumber, r.location].filter(Boolean).join(" • ")}
                        </p>
                      )}
                    </div>

                    <div className="col-span-12 md:col-span-3">
                      <p className="text-sm font-medium text-gray-900">{r.organizationName || "—"}</p>
                      <p className="mt-1 text-xs text-gray-500">{r.jobTitle || ""}</p>
                    </div>

                    <div className="col-span-12 md:col-span-3">
                      <div className="flex flex-wrap gap-2">
                        {services.length === 0 ? (
                          <span className="text-sm text-gray-500">—</span>
                        ) : (
                          services.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-xs font-medium text-brand-red"
                            >
                              {s}
                            </span>
                          ))
                        )}
                        {more > 0 && (
                          <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600">
                            +{more}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-2 md:text-right">
                      <p className="text-sm text-gray-600">{formatDate(r.createdAt)}</p>
                    </div>
                  </div>

                  {r.message && (
                    <div className={cn("mt-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700")}>
                      {r.message}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

