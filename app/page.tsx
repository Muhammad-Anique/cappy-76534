'use client';

import { useRef } from 'react';
import Hero from '@/components/Hero';
import DesignGrid from '@/components/DesignGrid';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-cappy-black">
      <Hero onJoinWaitlist={scrollToForm} />
      <DesignGrid />
      <LeadForm formRef={formRef} />
      <Footer />
    </main>
  );
}