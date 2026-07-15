import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

// Mock de framer-motion pour éviter les erreurs d'animation dans les tests
vi.mock('framer-motion', () => {
  const React = require('react');
  // On filtre les props d'animation pour ne pas polluer le DOM (warnings React)
  const filterProps = (props) => {
    const { whileInView, whileHover, whileTap, initial, animate, exit, transition, viewport, variants, ...validProps } = props;
    return validProps;
  };
  
  return {
    motion: {
      div: React.forwardRef((props, ref) => <div ref={ref} {...filterProps(props)} />),
      a: React.forwardRef((props, ref) => <a ref={ref} {...filterProps(props)} />),
      button: React.forwardRef((props, ref) => <button ref={ref} {...filterProps(props)} />),
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

describe('Composant Footer', () => {
  it('doit afficher le texte des droits d\'auteur avec l\'année en cours', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    const copyrightText = screen.getByText(new RegExp(year.toString(), 'i'));
    expect(copyrightText).toBeInTheDocument();
  });

  it('doit afficher un lien vers GitHub', () => {
    render(<Footer />);
    const githubLink = screen.getByLabelText(/github/i);
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href');
  });
});
