import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Projects from "./components/Projects";
import BeforeAfter from "./components/BeforeAfter";
import Stats from "./components/Stats";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <BeforeAfter />
      <Stats />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
