import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Recacor",
  description: "Privacy policy for Recacor. Data collected via web forms and Meta Lead Ads.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Recacor",
    description: "Privacy policy for Recacor. Data collected via web forms and Meta Lead Ads.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-lg">
        <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>

        <p>
          Recacor (&quot;we&quot;, &quot;us&quot;) is committed to protecting your personal data in
          accordance with the General Data Protection Regulation (GDPR — EU 2016/679).
        </p>
        <p>
          <strong>Data Controller:</strong> Recacor — 1240 RN 113, 34920 Le Crès, France —
          contact@recacor.fr
        </p>

        <h2>Data We Collect</h2>
        <p>
          We collect the following data through our online contact forms and through Meta advertising
          (Facebook / Instagram Lead Ads):
        </p>
        <ul>
          <li>First and last name</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>Postal code</li>
          <li>Vehicle type and service requested</li>
        </ul>

        <h2>How We Use Your Data</h2>
        <p>
          Your data is used exclusively to respond to your quote request and to contact you about
          our services (tyres, oil change, wheel alignment). We never sell your data to third
          parties.
        </p>

        <h2>Data Collected via Meta (Facebook / Instagram)</h2>
        <p>
          We use Meta Lead Ads as part of our advertising campaigns on Facebook and Instagram. Data
          submitted through these forms is transmitted to Recacor via the Meta API, stored in our
          internal lead management system, and used solely to follow up on your request.
        </p>
        <p>
          Recacor acts as the data controller for data collected through Meta Lead Ads. This data is
          not shared with other advertisers or commercial partners.
        </p>
        <p>
          Meta&apos;s privacy policy:{" "}
          <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">
            https://www.facebook.com/privacy/policy
          </a>
        </p>

        <h2>Data Retention</h2>
        <p>
          Your data is retained for a maximum of 3 years from your last interaction with Recacor.
        </p>

        <h2>Your Rights</h2>
        <p>
          Under the GDPR, you have the right to access, rectify, delete, object to, and port your
          data. To exercise these rights or request deletion of your data, contact us at:{" "}
          <a href="mailto:contact@recacor.fr">contact@recacor.fr</a>
        </p>
        <p>
          You may also file a complaint with the CNIL (French data protection authority):{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>
        </p>

        <h2>Cookies</h2>
        <p>
          This website uses audience measurement cookies (Google Analytics) and advertising pixels
          (Meta, TikTok). You can manage your preferences via the cookie banner displayed on your
          first visit.
        </p>

        <p>
          <em>Last updated: May 2026</em>
        </p>
      </div>
    </section>
  );
}
