import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { contactSubmissionSchema } from "@/lib/contact-submission";

const COLLECTION = "contact_submissions";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = contactSubmissionSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid form data", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const db = await getDb();
    const now = new Date();

    const userAgent = req.headers.get("user-agent") || "";
    const forwardedFor = req.headers.get("x-forwarded-for") || "";

    const doc = {
      ...parsed.data,
      createdAt: now,
      meta: {
        userAgent,
        forwardedFor,
      },
    };

    const result = await db.collection(COLLECTION).insertOne(doc);

    return NextResponse.json({
      ok: true,
      id: result.insertedId.toString(),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limitRaw = searchParams.get("limit") || "200";
    const limit = Math.max(1, Math.min(500, Number.parseInt(limitRaw, 10) || 200));

    const db = await getDb();
    const rows = await db
      .collection(COLLECTION)
      .find({}, { sort: { createdAt: -1 }, limit })
      .toArray();

    const data = rows.map((r) => ({
      _id: (r._id as ObjectId).toString(),
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

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

