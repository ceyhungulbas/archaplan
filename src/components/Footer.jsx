import { Link } from "react-scroll";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="relative bg-dark border-t border-silver/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img src={logo} alt="Archaplan" className="h-14 w-auto mb-5" />
            <p className="text-silver text-sm leading-relaxed max-w-xs">
              Anahtar Teslim İnşaat, İç Mimari Tasarım & Uygulama ve Çelik
              Yapılar alanlarında profesyonel çözümler sunuyoruz.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://wa.me/905456400497"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaWhatsapp className="text-lg" />
              </a>
              <a
                href="https://instagram.com/archaplandesign"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-sm">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-3">
              {[
                { to: "hero", label: "Ana Sayfa" },
                { to: "services", label: "Hizmetler" },
                { to: "projects", label: "Projeler" },
                { to: "transformations", label: "Dönüşümler" },
                { to: "about", label: "Hakkımızda" },
                { to: "contact", label: "İletişim" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={800}
                    offset={-80}
                    className="text-silver hover:text-primary text-sm cursor-pointer transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-sm">
              Bize Ulaşın
            </h4>
            <ul className="space-y-3 text-silver text-sm">
              <li>
                <a
                  href="tel:+905456400497"
                  className="hover:text-primary transition-colors"
                >
                  📞 0545 640 04 97
                </a>
              </li>
              <li>
                <a
                  href="mailto:archaplan35@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  📩 archaplan35@gmail.com
                </a>
              </li>
              <li>📍 İzmir, Türkiye</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-silver/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-silver/50 text-sm">
            ARCHAPLAN DESIGN &copy; {new Date().getFullYear()}. Tüm Hakları
            Saklıdır.
          </p>
          <p className="text-silver/30 text-xs">Ceyhun Gülbaş</p>
        </div>
      </div>
    </footer>
  );
}
