import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext.jsx';
import { Layout } from '../components/Layout.jsx';
import { HeroSection } from '../components/sections/HeroSection.jsx';
import { AboutSection } from '../components/sections/AboutSection.jsx';
import { MenuSection } from '../components/sections/MenuSection.jsx';
import { ReservationSection } from '../components/sections/ReservationSection.jsx';
import { ContactSection } from '../components/sections/ContactSection.jsx';

const Index = () => {
  return (
    <LanguageProvider>
      <Layout>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <ReservationSection />
        <ContactSection />
      </Layout>
    </LanguageProvider>
  );
};

export default Index;
