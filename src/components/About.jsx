import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="relative py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center" ref={ref}>
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                alt="Archaplan Mimari"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-primary/30 rounded-2xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-2xl blur-xl" />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              Hakkımızda
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Vizyonumuz & <span className="text-gradient">Misyonumuz</span>
            </h2>
            <p className="text-silver text-base leading-relaxed mb-6">
              Archaplan Design olarak İzmir merkezli çalışmalarımızla, anahtar
              teslim inşaat, iç mimari tasarım ve çelik yapı alanlarında
              projelerinizi hayata geçiriyoruz. Mühendislik mükemmelliği ve
              estetik anlayışımızla, her projemizde fark yaratıyoruz.
            </p>
            <p className="text-silver text-base leading-relaxed mb-8">
              Müşterilerimizin hayallerini gerçeğe dönüştürürken, en yüksek
              kalite standartlarını koruyarak zamanında ve bütçeye uygun
              teslimat yapmayı ilke ediniyoruz. Modern mimari ile
              fonksiyonelliği bir arada sunarak yaşam alanlarına değer
              katıyoruz.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "100%", label: "Müşteri Memnuniyeti" },
                { number: "A+", label: "Kalite Standartları" },
                { number: "724", label: "Destek Hattı" },
                { number: "ISO", label: "Sertifikalı Süreçler" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {item.number}
                  </div>
                  <span className="text-silver text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
