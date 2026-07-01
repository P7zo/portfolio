import { ContentProvider } from './context/ContentContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import TopControls from './components/TopControls.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ScrollTop from './components/ScrollTop.jsx'

export default function App() {
  return (
    <ContentProvider>
      <LanguageProvider>
        <TopControls />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <ScrollTop />
      </LanguageProvider>
    </ContentProvider>
  )
}
