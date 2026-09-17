import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import logo from "../assets/logo.svg";

const navLinks = [
  { to: "hero", label: "Ana Sayfa" },
  { to: "services", label: "Hizmetler" },
  { to: "projects", label: "Projeler" },
  { to: "transformations", label: "Dönüşümler" },
  { to: "about", label: "Hakkımızda" },
  { to: "contact", label: "İletişim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark/90 backdrop-blur-xl shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="hero"
          smooth
          duration={800}
          className="cursor-pointer flex items-center gap-3"
        >
          <img src={logo} alt="Archaplan" className="h-12 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={800}
              offset={-80}
              spy
              activeClass="!text-primary"
              className="text-silver hover:text-white text-sm font-medium tracking-wider uppercase cursor-pointer transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="contact"
            smooth
            duration={800}
            offset={-80}
            className="ml-4 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/30"
          >
            Bize Ulaşın
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white text-2xl"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-dark-lighter/95 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 border-b border-primary/20" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={800}
              offset={-80}
              onClick={() => setMobileOpen(false)}
              className="text-silver hover:text-white text-sm font-medium tracking-wider uppercase cursor-pointer transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
