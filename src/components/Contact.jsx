import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const contactInfo = [
  {
    icon: HiPhone,
    title: "Telefon",
    value: "0545 640 04 97",
    href: "tel:+905456400497",
  },
  {
    icon: HiMail,
    title: "E-mail",
    value: "archaplan35@gmail.com",
    href: "mailto:archaplan35@gmail.com",
  },
  {
    icon: HiLocationMarker,
    title: "Adres",
    value: "İzmir, Türkiye",
    href: null,
  },
];

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="relative py-28 bg-dark-lighter">
      {/* Top Glow Line */}
      <div className="line-glow w-full absolute top-0" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            İletişim
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Yeni Projeler İçin{" "}
            <span className="text-gradient">Bizimle İletişime Geçin!</span>
          </h2>
          <p className="text-silver text-lg max-w-2xl mx-auto">
            Projeleriniz hakkında konuşmak için bize ulaşın. Size en kısa sürede
            dönüş yapacağız.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className="glass-card rounded-xl p-8 flex flex-col items-center text-center gap-4 hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <info.icon className="text-3xl text-primary" />
              </div>
              <div>
                <p className="text-silver/60 text-sm uppercase tracking-wider mb-1">
                  {info.title}
                </p>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-white font-semibold text-lg hover:text-primary transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-white font-semibold text-lg">{info.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-5"
        >
          <a
            href="https://wa.me/905456400497"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
          >
            <FaWhatsapp className="text-2xl" />
            WhatsApp&apos;tan Yaz
          </a>
          <a
            href="https://instagram.com/archaplandesign"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
          >
            <FaInstagram className="text-2xl" />
            Instagram&apos;da Takip Et
          </a>
        </motion.div>
      </div>
    </section>
  );
}
