import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDb } from "@/lib/mongodb";
import { ContactSubmissionsDashboard } from "@/components/dashboard/contact-submissions-dashboard";

const COLLECTION = "contact_submissions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const db = await getDb();
  const rows = await db
    .collection(COLLECTION)
    .find({}, { sort: { createdAt: -1 }, limit: 500 })
    .toArray();

  const data = rows.map((r: any) => ({
    _id: r._id?.toString?.() ?? String(r._id),
    firstName: r.firstName ?? "",
    lastName: r.lastName ?? "",
    email: r.email ?? "",
    organizationName: r.organizationName ?? "",
    jobTitle: r.jobTitle ?? "",
    numberOfEmployees: r.numberOfEmployees ?? "",
    location: r.location ?? "",
    phoneNumber: r.phoneNumber ?? "",
    message: r.message ?? "",
    services: Array.isArray(r.services) ? r.services : [],
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : new Date().toISOString(),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-brand-pink shadow-[0_0_0_6px_rgba(255,75,145,0.10)]" />
            <span className="text-sm font-semibold text-gray-900">ishuu Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <form action="/api/admin/logout" method="post">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Logout
              </button>
            </form>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={16} className="!text-gray-600 !stroke-gray-600" />
              Back to site
            </Link>
          </div>
        </div>
      </header>

      <ContactSubmissionsDashboard initialData={data} />
    </div>
  );
}

