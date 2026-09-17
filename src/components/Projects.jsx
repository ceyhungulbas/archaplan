import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import tasarim1 from "../assets/tasarim1.jpg";

const projects = [
  {
    title: "Villa Konsept Tasarımı",
    subtitle: "3D Mimari Görselleştirme",
    year: "2025",
    image: tasarim1,
  },
  {
    title: "Modern Villa Projesi",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    title: "Çelik Yapı Fabrika",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
  {
    title: "Ofis İç Mimari Tasarım",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    title: "Lüks Residence",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
];

function ProjectRow({ project, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-8 md:gap-16`}
    >
      {/* Image */}
      <div className="w-full md:w-3/5 overflow-hidden rounded-lg">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full aspect-[4/3] object-cover"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6 }}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div
        className={`w-full md:w-2/5 flex flex-col ${
          isEven ? "md:items-start" : "md:items-end"
        } gap-3`}
      >
        <div
          className={`flex items-center gap-3 ${
            isEven ? "" : "md:flex-row-reverse"
          }`}
        >
          <span className="block w-12 h-[1px] bg-primary" />
          <span className="text-primary text-sm font-medium tracking-wide">
            {project.year}
          </span>
        </div>
        <h3 className="text-white text-2xl md:text-3xl font-bold">
          {project.title}
        </h3>
        {project.subtitle && (
          <p
            className={`text-silver text-sm md:text-base ${
              isEven ? "" : "md:text-right"
            }`}
          >
            {project.subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="relative py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="mb-24"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Portfolyo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Son <span className="text-gradient">Projeler</span>
          </h2>
        </motion.div>

        {/* Projects Zigzag */}
        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
