import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-scroll";

const slides = [
  {
    title: "Modern Villa",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
  },
  {
    title: "Çelik Yapı",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
  },
  {
    title: "İç Mimari",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
  },
  {
    title: "Lüks Residence",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
  },
];

const COLS = 6;
const ROWS = 4;
const TILE_DELAY = 60; // ms of stagger per diagonal step
const TILE_DURATION = 450; // ms reveal duration of a single tile
const MAX_DIST = ROWS - 1 + (COLS - 1);
const OVERLAY = "rgba(0,0,0,0.35)"; // must match the base layer overlay

/*
 * Her karo, konteyner boyutunda cover-ölçekli bir iç katman taşır.
 * Böylece karolar, geçiş bittiğinde görünen object-cover'lı <img> ile
 * piksel piksel aynı hizada olur — geçiş sonunda boyut sıçraması olmaz.
 */
function MosaicTransition({ image, onComplete }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setRevealed(true))
    );
    const total = MAX_DIST * TILE_DELAY + TILE_DURATION + 100;
    const timer = setTimeout(() => onComplete?.(), total);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [image, onComplete]);

  return (
    <div
      className="absolute inset-0 z-10 grid"
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
    >
      {Array.from({ length: ROWS * COLS }).map((_, i) => {
        const r = Math.floor(i / COLS);
        const c = i % COLS;
        // Sağ-alt köşeden başlayarak çapraz dalga halinde açılır
        const dist = ROWS - 1 - r + (COLS - 1 - c);
        return (
          <div
            key={i}
            className="relative overflow-hidden"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "scale(1)" : "scale(0.6)",
              transition: `opacity ${TILE_DURATION}ms ease-out, transform ${TILE_DURATION}ms ease-out`,
              transitionDelay: `${dist * TILE_DELAY}ms`,
            }}
          >
            <div
              className="absolute bg-cover bg-center"
              style={{
                width: `${COLS * 100}%`,
                height: `${ROWS * 100}%`,
                left: `${-c * 100}%`,
                top: `${-r * 100}%`,
                backgroundImage: `url(${image})`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: OVERLAY }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null);
  const currentRef = useRef(0);
  const nextRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Tüm slayt görsellerini önden yükle — geçiş sırasında boş karo kalmasın
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  const goTo = useCallback((indexOrFn) => {
    if (nextRef.current !== null) return; // geçiş sürüyor
    const target =
      typeof indexOrFn === "function"
        ? indexOrFn(currentRef.current)
        : indexOrFn;
    if (target === currentRef.current) return;
    nextRef.current = target;
    setNext(target);
  }, []);

  const handleMosaicComplete = useCallback(() => {
    if (nextRef.current !== null) {
      currentRef.current = nextRef.current;
      setCurrent(nextRef.current);
    }
    nextRef.current = null;
    setNext(null);
  }, []);

  const startAutoPlay = useCallback(() => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      goTo((prev) => (prev + 1) % slides.length);
    }, 6000);
  }, [goTo]);

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, [startAutoPlay]);

  const handlePrev = () => {
    startAutoPlay();
    goTo((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    startAutoPlay();
    goTo((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[current];

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden select-none"
    >
      {/* Base Layer */}
      <div className="absolute inset-0">
        <img
          src={activeSlide.image}
          alt={activeSlide.title}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: OVERLAY }}
        />
      </div>

      {/* Mosaic Transition Layer */}
      {next !== null && (
        <MosaicTransition
          image={slides[next].image}
          onComplete={handleMosaicComplete}
        />
      )}

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/90 text-sm md:text-base tracking-[0.3em] uppercase mb-4">
              Yaşayan Projeler
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-wide mb-8">
              {activeSlide.title}
            </h1>
            <Link
              to="projects"
              smooth
              duration={800}
              offset={-80}
              className="inline-block px-8 py-3 border border-white/60 text-white text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-dark transition-all duration-300 cursor-pointer"
            >
              Projeyi Görüntüle
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
        aria-label="Önceki proje"
      >
        <HiChevronLeft className="text-4xl md:text-5xl" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
        aria-label="Sonraki proje"
      >
        <HiChevronRight className="text-4xl md:text-5xl" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              startAutoPlay();
              goTo(i);
            }}
            className={`h-[3px] rounded-full transition-all duration-500 cursor-pointer ${
              i === (next ?? current) ? "w-10 bg-white" : "w-6 bg-white/40"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
