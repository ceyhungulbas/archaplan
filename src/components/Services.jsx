import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiOfficeBuilding, HiColorSwatch, HiCube } from "react-icons/hi";

const services = [
  {
    icon: HiOfficeBuilding,
    title: "Anahtar Teslim İnşaat",
    description:
      "Projelendirmeden teslimata kadar tüm süreçleri yönetiyor, hayalinizdeki yapıları kusursuz bir şekilde hayata geçiriyoruz.",
    features: ["Konut Projeleri", "Ticari Yapılar", "Endüstriyel Tesisler"],
  },
  {
    icon: HiColorSwatch,
    title: "İç Mimari Tasarım & Uygulama",
    description:
      "Modern ve estetik iç mekân tasarımlarıyla yaşam alanlarınızı size özel fonksiyonel ve şık mekânlara dönüştürüyoruz.",
    features: ["Konsept Tasarım", "3D Görselleştirme", "Mobilya Seçimi"],
  },
  {
    icon: HiCube,
    title: "Çelik Yapılar",
    description:
      "Dayanıklı, ekonomik ve hızlı montaj avantajlarıyla çelik yapı çözümlerimizle projelerinize değer katıyoruz.",
    features: ["Çelik Konstrüksiyon", "Prefabrik Yapılar", "Depo & Hangar"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="relative py-28 bg-dark-lighter">
      {/* Top Glow Line */}
      <div className="line-glow w-full absolute top-0" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Hizmetlerimiz
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Neler <span className="text-gradient">Yapıyoruz</span>
          </h2>
          <p className="text-silver text-lg max-w-2xl mx-auto">
            Mimari tasarımdan uygulamaya, projelerinizi eksiksiz ve profesyonel
            bir anlayışla hayata geçiriyoruz.
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="glass-card rounded-2xl p-8 group hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="text-3xl text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-silver text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-silver/70 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
