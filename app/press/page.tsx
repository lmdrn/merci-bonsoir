"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";

const photos = [
  "still-title.jpg",
  "portrait-above.jpg",
  "portrait-sit.jpg",
  "portrait-skate.jpg",
  "portrait-amp.jpg",
  "still-lamps.jpg",
  "still-clouds-bw.jpg",
  "still-clouds-color.jpg",
  "eric.jpg",
  "lea-clouds.jpg",
  "lea-eric.jpg",
  "plateau-clip.jpg",
];

const bio = `Merci Bonsoir fait vibrer la nouvelle scène romande avec « Réveil tard », premier morceau du projet. La voix portée par Léa déroule une mélodie entraînante et un refrain accrocheur, sur un texte autobiographique et sincère, adouci par une énergie entre Stromae et Christine and the Queens. À la production, Eric Anderson façonne les textures, tandis que Stéphane Chapelle en assure la réalisation, inscrivant le morceau dans une recherche esthétique autour de la transformation du quotidien en matière sonore. Merci Bonsoir ouvre ainsi un univers à la fois intime et fédérateur, où la production électro-pop met en valeur la force narrative du texte.`;

export default function PressPage() {
  const handlePrint = () => window.print();

  return (
    <main className="bg-black text-[#f0ede8] min-h-screen">
      <Nav />

      <div className="max-w-5xl mx-auto px-8 md:px-16 pt-40 pb-28">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-4">Dossier de presse</p>
            <Image
              src="/images/logo-white.png"
              alt="Merci Bonsoir"
              width={280}
              height={90}
              className="h-14 w-auto"
            />
          </div>

          <button
            onClick={handlePrint}
            className="no-print flex items-center gap-2 px-7 py-3.5 border border-white/30 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-200 self-start md:self-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2v-5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Télécharger PDF
          </button>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="h-px bg-white/10 origin-left mb-20"
        />

        {/* Bio + Pochette */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="grid md:grid-cols-2 gap-14 md:gap-20 items-start mb-24"
        >
          <div>
            <h2 className="text-xs tracking-[0.3em] uppercase opacity-40 mb-6">Biographie</h2>
            <p className="text-[#f0ede8]/80 leading-relaxed text-base">{bio}</p>

            <div className="mt-10 flex flex-col gap-3 text-sm opacity-50">
              <p><span className="opacity-70 mr-2">Paroles, mélodie, interprétation :</span>Léa</p>
              <p><span className="opacity-70 mr-2">Production, composition, arrangement et mixage :</span>Eric Anderson, Stéphane Chapelle</p>
              <p><span className="opacity-70 mr-2">Single :</span>Réveil Tard (2024)</p>
            </div>
          </div>

          <div>
            <h2 className="text-xs tracking-[0.3em] uppercase opacity-40 mb-6">Single</h2>
            <Image
              src="/images/pochette.png"
              alt="Réveil Tard — Merci Bonsoir"
              width={400}
              height={400}
              className="rounded-2xl w-full shadow-2xl"
            />
          </div>
        </motion.section>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-20" />

        {/* Photo gallery */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xs tracking-[0.3em] uppercase opacity-40 mb-10">Photos de presse</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <motion.div
                key={photo}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                className="group relative aspect-square overflow-hidden rounded-xl bg-white/5"
              >
                <Image
                  src={`/images/photos/${photo}`}
                  alt={`Merci Bonsoir — photo de presse ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <a
                  href={`/images/photos/${photo}`}
                  download
                  className="no-print absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label={`Télécharger photo ${i + 1}`}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>

          <p className="mt-6 text-xs opacity-30 tracking-wide">
            Survolez une photo pour la télécharger individuellement.
          </p>
        </motion.section>

        {/* Divider */}
        <div className="h-px bg-white/10 mt-20 mb-12" />

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs opacity-40 tracking-wider uppercase">
          <span>© {new Date().getFullYear()} Merci Bonsoir — Tous droits réservés</span>
          <Link href="/" className="no-print hover:opacity-100 transition-opacity tracking-[0.2em]">
            ← Retour au site
          </Link>
        </div>
      </div>
    </main>
  );
}
