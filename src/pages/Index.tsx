import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { MenuSection } from '@/components/sections/MenuSection';
import { ReservationSection } from '@/components/sections/ReservationSection';
import { ContactSection } from '@/components/sections/ContactSection';

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
