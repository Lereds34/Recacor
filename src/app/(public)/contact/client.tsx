"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { ContactSimpleForm } from "@/components/forms/contact-simple";
import { BgParticles } from "@/components/bg-particles";
import { AvisSection } from "@/components/avis-section";
import { BreadcrumbJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY, ADDRESS } from "@/lib/tracking";

export function ContactClient({ heroImage }: { heroImage?: string }) {

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://recacor.fr" },
        { name: "Contact", url: "https://recacor.fr/contact" },
      ]} />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6">Contact</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Contactez Recacor<br />
            <span className="text-purple-glow">Garage Pneus Le Crès</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Une question, un devis ? On vous répond sous 24h en jours ouvrés.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-muted to-transparent" />
      </section>

      {/* Coordonnées */}
      <section className="relative py-20 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-black tracking-tight mb-8 text-center">
            Nos coordonnées <span className="text-gradient-purple">et horaires</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Phone, label: "Téléphone", value: PHONE_DISPLAY, link: true },
              { icon: Mail, label: "Email", value: "contact@recacor.fr" },
              { icon: MapPin, label: "Adresse", value: ADDRESS, mapHref: "https://maps.google.com/?q=1240+Route+de+Nîmes+34920+Le+Crès" },
              { icon: Clock, label: "Horaires", value: "Lun–Ven 8h–17h · Sam 8h–12h" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-white p-6">
                <div className="w-11 h-11 rounded-xl bg-purple-bright/[0.08] flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-purple-bright" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-bright mb-1">{item.label}</p>
                {item.link ? (
                  <PhoneLink location="page" className="font-semibold text-sm hover:text-purple-bright transition-colors block">
                    {item.value}
                  </PhoneLink>
                ) : item.mapHref ? (
                  <a
                    href={item.mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm hover:text-purple-bright transition-colors block"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-semibold text-sm">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maps */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight mb-8 text-center">
            Accès et <span className="text-gradient-purple">stationnement</span>
          </h2>
          <div className="rounded-3xl overflow-hidden border border-border aspect-[16/9] bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.5!2d3.9!3d43.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLe+Cr%C3%A8s!5e0!3m2!1sfr!2sfr!4v1"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Recacor Le Crès"
            />
          </div>
        </div>
      </section>

      {/* Formulaire contact simple */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {heroImage && (
            <div className="w-full rounded-2xl overflow-hidden mb-8 aspect-[16/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImage} alt="Garage Recacor" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tight">
              Envoyez-nous <span className="text-gradient-purple">un message</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Pour toute demande, remplissez le formulaire. Pour un devis chiffré,
              rendez-vous sur la page du service concerné.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
            <ContactSimpleForm />
          </div>
        </div>
      </section>

      <AvisSection />
    </>
  );
}
