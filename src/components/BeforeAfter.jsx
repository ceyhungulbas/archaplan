import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiHome,
  HiRefresh,
  HiSun,
  HiDesktopComputer,
} from "react-icons/hi";

import oncesiMustakil from "../assets/oncesisonrasi_oncesi_mustakil.jpg";
import sonrasiMustakil from "../assets/oncesisonrasi_sonrasi_mustakil.jpg";
import oncesiMust from "../assets/oncesisonrasi_oncesi_must.jpg";
import sonrasiMust from "../assets/oncesisonrasi_sonrasi_must.jpg";
import oncesiAmerikan from "../assets/oncesisonrasi_oncesi_amerikan.jpg";
import sonrasiAmerikan from "../assets/oncesisonrasi_sonrasi_amerikan.jpg";
import oncesiOfis from "../assets/oncesisonrasi_oncesi_ofis.jpg";
import sonrasiOfis from "../assets/oncesisonrasi_sonrasi_ofis.jpg";
import mutfakCombined from "../assets/oncesisonrasi_mutfak.jpg";
import modernCombined from "../assets/oncesisonrasi_modern.jpg";

const transformations = [
  {
    id: "mustakil",
    icon: HiHome,
    label: "Müstakil Ev",
    title: "Müstakil Ev Dönüşümü",
    description:
      "Yıpranmış cephe; modern doğrama, aydınlatma tasarımı ve peyzaj ile baştan aşağı yenilendi.",
    before: oncesiMustakil,
    after: sonrasiMustakil,
  },
  {
    id: "tas-ev",
    icon: HiRefresh,
    label: "Taş Ev Restorasyonu",
    title: "Geleneksel Taş Ev Restorasyonu",
    description:
      "Terk edilmiş köy evi; taş dokusu korunarak modern detaylarla yaşayan bir eve dönüştürüldü.",
    before: oncesiMust,
    after: sonrasiMust,
  },
  {
    id: "bahce",
    icon: HiSun,
    label: "Bahçe & Peyzaj",
    title: "Bahçe & Peyzaj Düzenlemesi",
    description:
      "Bakımsız arka bahçe; kademeli teraslar, oturma alanları ve aydınlatma ile sosyal bir yaşam alanına dönüştü.",
    before: oncesiAmerikan,
    after: sonrasiAmerikan,
  },
  {
    id: "ofis",
    icon: HiDesktopComputer,
    label: "Home Ofis",
    title: "Home Ofis Tasarımı",
    description:
      "Sıradan bir çalışma odası; ahşap lambri, gizli aydınlatma ve özel mobilyalarla prestijli bir ofise dönüştü.",
    before: oncesiOfis,
    after: sonrasiOfis,
  },
];

const showcases = [
  {
    image: mutfakCombined,
    title: "Mutfak Yenileme",
    subtitle: "Komple iç mekân dönüşümü",
  },
  {
    image: modernCombined,
    title: "Modern Villa",
    subtitle: "Kaba inşaattan anahtar teslime",
  },
];

function CompareSlider({ before, after, title }) {
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const [pos, setPos] = useState(50);

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, x)));
  }, []);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    containerRef.current.setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  };

  const onPointerMove = (e) => {
    if (draggingRef.current) updatePos(e.clientX);
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      role="slider"
      aria-label={`${title} öncesi sonrası karşılaştırma`}
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      className="relative w-full h-full overflow-hidden rounded-2xl cursor-ew-resize select-none touch-none focus:outline-none focus:ring-2 focus:ring-primary/60"
    >
      {/* After (base layer) */}
      <img
        src={after}
        alt={`${title} — sonrası`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        loading="lazy"
      />

      {/* Before (clipped layer) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${title} — öncesi`}
          className="w-full h-full object-cover"
          draggable={false}
          loading="lazy"
        />
      </div>

      {/* Divider & Handle */}
      <div
        className="absolute top-0 bottom-0 z-10 w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]"
        style={{ left: `calc(${pos}% - 1px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-xl">
          <span className="flex items-center gap-[3px] text-dark">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold tracking-wider uppercase pointer-events-none">
        Öncesi
      </span>
      <span className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-sm text-white text-xs font-semibold tracking-wider uppercase pointer-events-none">
        Sonrası
      </span>
    </div>
  );
}

export default function BeforeAfter() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [active, setActive] = useState(transformations[0].id);
  const activeItem = transformations.find((t) => t.id === active);

  return (
    <section id="transformations" className="relative py-28 bg-dark-lighter">
      <div className="line-glow w-full absolute top-0" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Öncesi & Sonrası
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Gerçek <span className="text-gradient">Dönüşümler</span>
          </h2>
          <p className="text-silver text-lg max-w-2xl mx-auto">
            Tamamladığımız projelerin öncesi ve sonrasını sürgüyü kaydırarak
            keşfedin.
          </p>
        </motion.div>

        {/* Tabs + Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center"
        >
          {/* Tab List */}
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            {transformations.map((item) => {
              const isActive = item.id === active;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`glass-card rounded-2xl p-5 text-left transition-all duration-300 cursor-pointer group ${
                    isActive
                      ? "!border-primary/50 shadow-lg shadow-primary/10"
                      : "hover:border-primary/30 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary group-hover:bg-primary/20"
                      }`}
                    >
                      <item.icon className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">
                        {item.title}
                      </h3>
                      <p
                        className={`text-silver text-sm leading-relaxed transition-all duration-300 ${
                          isActive ? "" : "hidden lg:block lg:line-clamp-1"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Slider Panel */}
          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="aspect-[3/4] max-h-[640px] mx-auto w-full max-w-[480px]"
              >
                <CompareSlider
                  before={activeItem.before}
                  after={activeItem.after}
                  title={activeItem.title}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Featured Showcases */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="block w-12 h-[1px] bg-primary" />
            <h3 className="text-white text-xl md:text-2xl font-bold">
              Öne Çıkan Dönüşümler
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {showcases.map((item) => (
              <div
                key={item.title}
                className="glass-card rounded-2xl overflow-hidden group hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-white font-bold">{item.title}</h4>
                  <p className="text-silver text-sm mt-1">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
