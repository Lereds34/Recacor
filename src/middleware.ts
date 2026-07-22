import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET est manquant dans les variables d'environnement");
}
const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const BRIEFING_PREFIX = "/briefings/";
const PL_ALIAS_DESTINATION = "/pneus-utilitaires-pl";
const PL_ALIASES = new Set([
  "/pneus-utilitaire-pl",
  "/pneus-utilitaires-pl/",
  "/pneus–utilitaire–pl",
  "/pneus—utilitaire—pl",
  "/pneus–utilitaires–pl",
  "/pneus—utilitaires—pl",
]);

function applyBriefingHeaders(response: NextResponse) {
  response.headers.set(
    "X-Robots-Tag",
    "noindex, nofollow, noarchive, nosnippet, noimageindex, max-snippet:0, max-image-preview:none, max-video-preview:0",
  );
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const decodedPath = (() => {
    try {
      return decodeURIComponent(path);
    } catch {
      return path;
    }
  })();
  const normalizedPath = decodedPath.toLowerCase();

  if (PL_ALIASES.has(normalizedPath) && normalizedPath !== PL_ALIAS_DESTINATION) {
    const url = req.nextUrl.clone();
    url.pathname = PL_ALIAS_DESTINATION;
    url.search = "";
    return NextResponse.redirect(url, { status: 301 });
  }

  // Supprimer les params UTM des pages publiques (évite l'indexation d'URLs dupliquées)
  if (!path.startsWith("/admin") && !path.startsWith("/api/")) {
    const hasUtm = UTM_PARAMS.some((p) => req.nextUrl.searchParams.has(p));
    if (hasUtm) {
      const url = req.nextUrl.clone();
      UTM_PARAMS.forEach((p) => url.searchParams.delete(p));
      const response = NextResponse.redirect(url, { status: 301 });
      return path.startsWith(BRIEFING_PREFIX) ? applyBriefingHeaders(response) : response;
    }
  }

  // Routes publiques (login + API auth)
  if (path === "/admin/login" || path.startsWith("/api/admin/auth/")) {
    return NextResponse.next();
  }

  if (!path.startsWith("/admin") && !path.startsWith("/api/admin")) {
    const response = NextResponse.next();
    return path.startsWith(BRIEFING_PREFIX) ? applyBriefingHeaders(response) : response;
  }

  const token = req.cookies.get("recacor_session")?.value;
  if (!token) {
    if (path.startsWith("/api/")) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", path);
    return NextResponse.redirect(url);
  }

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch {
    if (path.startsWith("/api/")) {
      return NextResponse.json({ error: "session expired" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    // Pages publiques (exclut fichiers statiques Next.js)
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json)$).*)",
  ],
};
