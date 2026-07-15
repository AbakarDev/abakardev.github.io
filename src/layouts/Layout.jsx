import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import CustomCursor from '../components/CustomCursor';
import SEO from '../components/SEO';

/**
 * Layout – Structure principale de l'application.
 * Contient la navigation, le contenu de la page et le footer.
 */
export default function Layout() {
  return (
    <>
      <SEO />
      <CustomCursor />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
