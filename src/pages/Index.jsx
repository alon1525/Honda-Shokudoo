import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { MenuSection } from '@/components/sections/MenuSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ReservationSection } from '@/components/sections/ReservationSection';

const Index = () => {
  return (
    <LanguageProvider>
      <Layout>
        <HeroSection />
        <MenuSection />
        <GallerySection />
        <ContactSection />
        <ReservationSection />
      </Layout>
    </LanguageProvider>
  );
};

export default Index;