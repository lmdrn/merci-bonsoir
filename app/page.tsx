"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Nav from "@/components/Nav";
import StreamingLinks, { LA_FLEMME_PLATFORMS, REVEIL_TARD_PLATFORMS } from "@/components/StreamingLinks";

const PillsCanvas = dynamic(() => import("@/components/PillsCanvas"), {
  ssr: false,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

export default function Home() {
  return (
    <main className="bg-black text-[#f0ede8]">
      {/* Pills fixed background — visible across the whole page */}
      <PillsCanvas />

      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">


        <motion.div
          className="relative z-10 flex flex-col items-center text-center px-8"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Image
              src="/images/logo-white.png"
              alt="Merci Bonsoir"
              width={520}
              height={160}
              className="w-[300px] md:w-[500px] h-auto"
              priority
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-xs tracking-[0.35em] uppercase opacity-50 font-medium"
          >
            Nouveau single — La flemme
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex gap-5">
            <a
              href="#music"
              className="px-8 py-3.5 bg-white text-black rounded-full text-sm font-bold tracking-widest uppercase hover:bg-[#f0ede8] transition-colors duration-200"
            >
              Écouter
            </a>
            <Link
              href="/press"
              className="px-8 py-3.5 border border-white/30 rounded-full text-sm font-bold tracking-widest uppercase hover:border-white/70 hover:bg-white/5 transition-all duration-200"
            >
              Press Kit
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-8 bg-white origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ─── MUSIC ─── */}
      <section id="music" className="w-full py-32 md:py-40">
        <div className="max-w-5xl mx-auto px-8 md:px-16 flex flex-col gap-24">

          {/* La flemme */}
          <motion.div
            className="grid md:grid-cols-2 gap-16 md:gap-24 items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-white/5 to-white/10 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <Image
                src="/images/pochette_2.jpeg"
                alt="La flemme — Merci Bonsoir"
                width={500}
                height={500}
                className="relative rounded-2xl w-full max-w-sm mx-auto md:max-w-full shadow-2xl"
              />
            </motion.div>

            <motion.div variants={stagger} className="flex flex-col gap-8">
              <motion.div variants={fadeUp}>
                <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-3">Single</p>
                <h2 className="text-5xl md:text-6xl font-bold leading-none" style={{ fontFamily: "var(--font-bricolage)" }}>
                  La flemme
                </h2>
              </motion.div>

              <motion.p variants={fadeUp} className="text-[#f0ede8]/60 leading-relaxed text-base">
                Disponible sur toutes les plateformes de streaming.
              </motion.p>

              <motion.div variants={fadeUp}>
                <StreamingLinks platforms={LA_FLEMME_PLATFORMS} />
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="h-px bg-white/10" />

          {/* Réveil Tard */}
          <motion.div
            className="grid md:grid-cols-2 gap-16 md:gap-24 items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-white/5 to-white/10 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <Image
                src="/images/pochette.png"
                alt="Réveil Tard — Merci Bonsoir"
                width={500}
                height={500}
                className="relative rounded-2xl w-full max-w-sm mx-auto md:max-w-full shadow-2xl"
              />
            </motion.div>

            <motion.div variants={stagger} className="flex flex-col gap-8">
              <motion.div variants={fadeUp}>
                <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-3">Single</p>
                <h2 className="text-5xl md:text-6xl font-bold leading-none" style={{ fontFamily: "var(--font-bricolage)" }}>
                  Réveil Tard
                </h2>
              </motion.div>

              <motion.p variants={fadeUp} className="text-[#f0ede8]/60 leading-relaxed text-base">
                Disponible sur toutes les plateformes de streaming.
              </motion.p>

              <motion.div variants={fadeUp}>
                <StreamingLinks platforms={REVEIL_TARD_PLATFORMS} />
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* divider */}
      <div className="max-w-5xl mx-auto px-8 md:px-16">
        <div className="h-px bg-white/10" />
      </div>

      {/* ─── VIDEO ─── */}
      <section id="video" className="w-full py-32 md:py-40">
        <div className="max-w-5xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-4">Clip officiel</p>
            <h2 className="text-5xl md:text-6xl font-bold leading-none mb-14" style={{ fontFamily: "var(--font-bricolage)" }}>
              Réveil Tard
            </h2>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white/5">
              <iframe
                src="https://www.youtube.com/embed/EbNOsHRgyqU?si=wc2af7dGR4eKULf0"
                title="Merci Bonsoir — Réveil Tard (clip officiel)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/10 py-12 px-8 md:px-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-40 tracking-wider uppercase">
          <span>© {new Date().getFullYear()} Merci Bonsoir</span>
          <Link href="/press" className="hover:opacity-100 transition-opacity tracking-[0.2em]">
            Press Kit
          </Link>
        </div>
      </footer>
    </main>
  );
}
