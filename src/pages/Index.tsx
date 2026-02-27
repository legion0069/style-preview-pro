import { useState } from 'react';

import BarberDashboard from '@/components/BarberDashboard';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Scissors } from 'lucide-react';
import heroImage from '@/assets/hero-barber.jpg';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <BarberDashboard onLogout={() => setIsLoggedIn(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-dark overflow-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Logo size="md" />
          <Button variant="gold" onClick={() => setIsLoggedIn(true)}>
            Try Demo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Hairstyle Preview</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              See the Style{' '}
              <span className="text-gradient-gold">Before</span>{' '}
              the Cut
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Looksy AI is a demo prototype that uses artificial intelligence to preview 
              hairstyles on real photos — helping barbers and customers visualize the 
              result before a single cut is made.
            </p>

            <Button variant="hero" size="xl" onClick={() => setIsLoggedIn(true)}>
              Try the Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden gold-glow animate-float">
              <img
                src={heroImage}
                alt="Luxury Barber Shop"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 card-elevated p-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Scissors className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">AI Hair Analysis</p>
                  <p className="text-sm text-muted-foreground">Instant results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A simple 4-step process that transforms consultations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Upload Photos',
              description: 'Capture 6 photos of your customer from different angles',
              icon: '📸',
            },
            {
              step: '02',
              title: 'AI Analysis',
              description: 'Our AI analyzes hair type, density, and suitability',
              icon: '🧠',
            },
            {
              step: '03',
              title: 'Choose Style',
              description: 'Browse eligible hairstyles matched to customer',
              icon: '✂️',
            },
            {
              step: '04',
              title: 'Preview Result',
              description: 'See the hairstyle on customer before cutting',
              icon: '✨',
            },
          ].map((feature, index) => (
            <div
              key={feature.step}
              className="card-elevated p-6 text-center space-y-4 group hover:border-primary/50 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl">{feature.icon}</div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Step {feature.step}
              </div>
              <h3 className="font-serif text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              © 2026 Looksy AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
