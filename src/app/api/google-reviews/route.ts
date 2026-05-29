import { NextResponse } from "next/server";

export const revalidate = 86400; // 24h cache

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
}

export interface PlaceData {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_NAME = "Recacor Le Crès";

async function findPlaceId(): Promise<string | null> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json");
  url.searchParams.set("input", PLACE_NAME);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id");
  url.searchParams.set("key", API_KEY!);

  const res = await fetch(url.toString());
  const json = await res.json();
  return json.candidates?.[0]?.place_id ?? null;
}

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "GOOGLE_PLACES_API_KEY manquant" }, { status: 500 });
  }

  try {
    const placeId = await findPlaceId();
    if (!placeId) {
      return NextResponse.json({ error: "Place introuvable" }, { status: 502 });
    }

    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "rating,user_ratings_total,reviews");
    url.searchParams.set("language", "fr");
    url.searchParams.set("key", API_KEY);

    const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
    const json = await res.json();

    if (json.status !== "OK") {
      console.error("[google-reviews]", json.status, json.error_message);
      return NextResponse.json({ error: json.status }, { status: 502 });
    }

    const data: PlaceData = {
      rating: json.result.rating,
      user_ratings_total: json.result.user_ratings_total,
      reviews: (json.result.reviews ?? []).filter((r: GoogleReview) => r.text?.trim()),
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
  } catch (e) {
    console.error("[google-reviews]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
