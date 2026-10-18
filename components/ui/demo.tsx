import React, { useState, useEffect } from 'react';
import FlowArt, { FlowSection } from './story-scroll.tsx';
import Logo from './logo.tsx';
import { MapPin, ExternalLink, Phone, Mail, Globe, AlertCircle } from 'lucide-react';

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ThreadsIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.8 11.4c-.2 1.9-1.6 3.1-3.6 3.1-2.2 0-3.9-1.6-3.9-3.9 0-2.4 1.8-4 4.1-4 1.5 0 2.8.7 3.3 1.8" />
    <path d="M15.5 10.5v3.2c0 2.2-1.3 3.6-3.3 3.6" />
  </svg>
);

interface Hamper {
  id: string;
  name: string;
  sense: string;
  tagline: string;
  price: string;
  image: string;
  overview: string;
  products: string[];
  idealFor: string;
}

const hampers: Hamper[] = [
  {
    id: '01',
    name: 'DRISHTI',
    sense: 'The Sight',
    tagline: 'Illumination & Aesthetic Radiance',
    price: '₹700 – ₹1,350',
    image: '/hampers/Sensori%20Drishti%20Diwali%20Hamper.png',
    overview:
      'A visual celebration designed around the sense of vision, capturing Diwali’s divine triumph of light with hand-poured festive illumination, sculpted metallic diyas, and golden accents.',
    products: [
      'Handcrafted artisan brass & terracotta festive diyas',
      'Sculpted metallic floating tea-lights & votives',
      'Gold-accented festive candle holders',
      'Artisanal matchbox with brass wick trimmer',
      'Bespoke gold-embossed festive greeting card',
    ],
    idealFor: 'Festive desk sets, festive greetings, family celebrations & illumination rituals.',
  },
  {
    id: '02',
    name: 'SHRUTI',
    sense: 'The Sound',
    tagline: 'Harmonious Cadence & Auspicious Chimes',
    price: '₹1,000 – ₹1,750',
    image: '/hampers/Sensori%20Shruti%20Diwali%20Hamper.png',
    overview:
      'Crafted around auditory serenity, celebrating the peaceful chants, auspicious temple bells, and festive acoustic cadence that herald blessings into every festive home.',
    products: [
      'Pure solid brass pooja temple bell with ornate handle',
      'Artisanal metallic harmony chime with melodic resonance',
      'Handcrafted brass festive ceremonial accessories',
      'Gourmet roasted dry fruit pairing in glass jars',
      'Hand-lettered calligraphy blessing note card',
    ],
    idealFor: 'Pooja gifting, home blessings, cherished elder relations & spiritual mindfulness.',
  },
  {
    id: '03',
    name: 'GANDH',
    sense: 'The Smell',
    tagline: 'Artisanal Fragrance in Maroon & Gold',
    price: '₹1,000 – ₹1,600',
    image: '/hampers/Diwali%20Fragrance%20Hamper%20in%20Maroon%20and%20Gold.png',
    overview:
      'An olfactory journey blending sacred floral notes, pure essential oils, and royal botanicals, encased in Sensori’s signature maroon and gold luxury festive presentation.',
    products: [
      'Luxury hand-poured soy wax candle in maroon and gold glass jar',
      'Natural botanical dhoop cones with pure herbal resins',
      'Handcrafted organic incense sticks with brass holder',
      'Festive essential oil room aroma mist & reed diffusers',
      'Aromatic festive dried botanicals & potpourri pouch',
    ],
    idealFor: 'Luxury living rooms, wellness enthusiasts, executive desk gifts & aroma lovers.',
  },
  {
    id: '04',
    name: 'RASA',
    sense: 'The Taste',
    tagline: 'Gourmet Festive Confections & Dry Fruits',
    price: '₹1,300 – ₹1,900',
    image: '/hampers/RASA%20Diwali%20Gourmet%20Hamper.png',
    overview:
      'An exquisite culinary feast celebrating the festive palate, featuring farm-fresh roasted nuts, pure organic preserves, and handcrafted festive delicacies.',
    products: [
      'Jumbo California almonds & roasted cashews in airtight glass jars',
      'Organic raw forest honey with saffron infusion',
      'Artisanal handcrafted Indian sweets / festive gourmet treats',
      'Roasted salted pistachios & exotic berry trail mix',
      'Gold-plated festive dessert spoon & serving tongs',
    ],
    idealFor: 'Food connoisseurs, festive dinner hosts, corporate client appreciation.',
  },
  {
    id: '05',
    name: 'SPARSH',
    sense: 'The Touch',
    tagline: 'Tactile Warmth & Handcrafted Textures',
    price: '₹1,600 – ₹2,300',
    image: '/hampers/Sensori%20Sparsh%20Diwali%20Hamper.png',
    overview:
      'Dedicated to the sense of touch, combining handwoven textiles, hand-hammered metals, and plush textures designed to delight hands and warm the heart.',
    products: [
      'Handwoven luxury festive stole / silk-blend ceremonial scarf',
      'Hand-hammered brass coasters with non-scratch velvet base',
      'Cold-pressed botanical luxury herbal bath soap bars',
      'Textured ceremonial brass keepsake box',
      'Velvet-touch custom printed festive greeting card',
    ],
    idealFor: 'VIP patrons, luxury lifestyle gifting, partners & intimate celebrations.',
  },
  {
    id: '06',
    name: 'PANCHTATTVA',
    sense: 'The Complete Experience',
    tagline: 'All Five Senses in Sovereign Harmony',
    price: '₹2,300 – ₹3,000',
    image: '/hampers/Sensori%20Panchatattva%20Diwali%20Hamper.png',
    overview:
      'The crown jewel of the Sensori collection. A master ensemble that unites Sight, Sound, Smell, Taste, and Touch into one opulent festive experience.',
    products: [
      'Sight: Handcrafted brass diya & metallic floating candles',
      'Sound: Auspicious brass ceremonial bell & harmonic chimes',
      'Smell: Signature soy wax fragrance candle & botanical incense',
      'Taste: Premium gourmet dry fruits & artisanal confections',
      'Touch: Handcrafted brass artifact & tactile luxury keepsakes',
      'Presentation: Deluxe Burgundy rigid gift box with gold-foil embossing',
    ],
    idealFor: 'High-net-worth relationships, flagship corporate gifting, supreme family tribute.',
  },
];

export default function FlowArtDefaultDemo() {
  const [activeHamperIndex, setActiveHamperIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHamper, setModalHamper] = useState<(typeof hampers)[0] | null>(null);
  const [, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScrollProgress = (e: Event) => {
      const customEvent = e as CustomEvent<{ progress: number }>;
      const progress = customEvent.detail?.progress;
      if (typeof progress === 'number') {
        const newIndex = Math.min(5, Math.max(0, Math.floor(progress * 5.999)));
        setActiveHamperIndex(newIndex);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('collection-scroll-progress', handleScrollProgress);
    return () => {
      window.removeEventListener('collection-scroll-progress', handleScrollProgress);
    };
  }, []);

  // Update active hamper index on mobile scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observers: IntersectionObserver[] = [];
    hampers.forEach((_, idx) => {
      const el = document.getElementById(`mobile-service-${idx}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHamperIndex(idx);
            }
          });
        },
        { rootMargin: '-20% 0px -50% 0px', threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToHamper = (idx: number) => {
    setActiveHamperIndex(idx);

    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const el = document.getElementById(`mobile-service-${idx}`);
      if (el) {
        const yOffset = -55;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        return;
      }
    }

    const trigger = (window as unknown as { __collectionScrollTrigger?: { start: number; end: number } }).__collectionScrollTrigger;
    if (trigger && typeof trigger.start === 'number' && typeof trigger.end === 'number') {
      const targetProgress = idx / 5;
      const targetY = trigger.start + targetProgress * (trigger.end - trigger.start);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const handleNextHamper = () => {
    if (activeHamperIndex < hampers.length - 1) {
      scrollToHamper(activeHamperIndex + 1);
    } else {
      // Once the user has seen all 6 services, advance to Section 03 (Customised Plan)
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        const el = document.getElementById('customised-plan-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      const trigger = (window as unknown as { __collectionScrollTrigger?: { end: number } }).__collectionScrollTrigger;
      if (trigger && typeof trigger.end === 'number') {
        window.scrollTo({ top: trigger.end + window.innerHeight * 0.95, behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  const handlePrevHamper = () => {
    if (activeHamperIndex > 0) {
      scrollToHamper(activeHamperIndex - 1);
    } else {
      // Return to Section 01 (Hero)
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const trigger = (window as unknown as { __collectionScrollTrigger?: { start: number } }).__collectionScrollTrigger;
      if (trigger && typeof trigger.start === 'number') {
        window.scrollTo({ top: Math.max(0, trigger.start - window.innerHeight * 0.95), behavior: 'smooth' });
      } else {
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  const currentHamper = hampers[activeHamperIndex];

  return (
    <FlowArt aria-label="Sensori by Sensora — Diwali 2026 Collection">
      {/* 01 — HERO SECTION */}
      <FlowSection aria-label="Sensori Diwali 2026" style={{ backgroundColor: '#ffffff', color: '#800000', paddingTop: '1.25rem' }} className="overflow-y-auto sm:overflow-hidden">
        {/* Top of Hero Section */}
        <div className="flex items-center gap-3">
          <Logo size={32} className="text-[#800000]" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#800000] leading-none">
              Sensori • Powered by Sensora
            </p>
            <p className="text-[11px] font-semibold tracking-wider text-[#800000]/70 uppercase mt-1">
              DIWALI 2026 COLLECTION
            </p>
          </div>
        </div>

        {/* WIDE HERO BANNER - RESPONSIVE MOBILE & DESKTOP */}
        <div className="relative -mx-[4vw] w-[calc(100%+8vw)] -mt-2 sm:-mt-3 sm:mb-auto overflow-hidden border-y border-[#800000]/30 bg-white">
          {/* Visual Container: full aspect ratio on mobile, min-height on desktop */}
          <div className="relative w-full aspect-[2048/768] sm:aspect-auto sm:min-h-[520px] lg:min-h-[580px] flex items-end justify-center">
            {/* Background Image - Uncropped on mobile, Cover on desktop */}
            <img
              src="/sensori-diwali-corporate-gifting-collection.png"
              alt="Sensori Diwali Corporate Gifting Collection — India's Premier Five Senses Festive Hampers"
              className="absolute inset-0 w-full h-full object-contain sm:object-cover object-center"
            />

            {/* Desktop Action Buttons: Anchored at Bottom of Image (Preserves current desktop view) */}
            <div className="hidden sm:flex relative z-10 flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 pb-6 sm:pb-8">
              <a
                href="https://wa.me/918356918580?text=Hi%20Sensori%2C%20I%20would%20like%20to%20know%20more%20about%20the%20Diwali%202026%20Hampers"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider bg-white text-[#800000] rounded hover:bg-amber-50 transition-all shadow-lg border border-[#800000]"
              >
                Order via WhatsApp +91 83569 18580
              </a>
              <a
                href="#collection"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHamper(0);
                }}
                className="px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#800000] text-white rounded hover:bg-[#800000]/90 transition-all shadow-lg border border-white/50 cursor-pointer"
              >
                Explore Six Hampers ↓
              </a>
            </div>
          </div>

          {/* Mobile Action Buttons: Sits cleanly below image so the photo is 100% visible on phones */}
          <div className="flex sm:hidden flex-col items-center gap-2 px-4 py-2.5 bg-white border-t border-[#800000]/15">
            <a
              href="https://wa.me/918356918580?text=Hi%20Sensori%2C%20I%20would%20like%20to%20know%20more%20about%20the%20Diwali%202026%20Hampers"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#800000] text-white rounded shadow-sm"
            >
              Order via WhatsApp +91 83569 18580
            </a>
            <a
              href="#collection"
              onClick={(e) => {
                e.preventDefault();
                scrollToHamper(0);
              }}
              className="w-full text-center px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white text-[#800000] border border-[#800000]/30 rounded cursor-pointer"
            >
              Explore Six Hampers ↓
            </a>
          </div>
        </div>

        {/* COMPREHENSIVE MOBILE SEO CONTENT BLOCK (Seamlessly fills mobile viewport with rich copy) */}
        <div className="flex sm:hidden flex-col justify-between gap-2 py-2 my-auto text-[#800000] border-t border-b border-[#800000]/15 w-full max-w-full overflow-hidden">
          {/* Eyebrow & Title */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
              <span className="text-[9px] font-black uppercase tracking-wider text-[#800000]">
                FIVE SENSES LUXURY FESTIVE STUDIO
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#800000] bg-white border border-[#800000]/30 px-1.5 py-0.2 rounded">
                MOQ: 30
              </span>
            </div>
            <h1 className="text-sm font-black uppercase tracking-tight text-[#800000] leading-tight">
              India’s First Five Senses Corporate Diwali Hampers
            </h1>
            <p className="text-[11px] leading-relaxed text-[#800000]/85 mt-1 font-medium">
              Sensori by Sensora curates multi-sensory luxury corporate Diwali gifts across Mumbai, Bengaluru, Delhi NCR, Hyderabad, Chennai, and Pan-India. Every hamper is thoughtfully architected around the 5 senses — sight, sound, scent, taste, and touch.
            </p>
          </div>

          {/* 5 Senses Inclusion Guide */}
          <div className="border-t border-[#800000]/15 pt-1.5">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#800000] mb-0.5">
              The Five Senses Inclusions:
            </p>
            <p className="text-[10px] leading-relaxed text-[#800000]/85">
              <strong className="text-[#800000]">Sight:</strong> Brass diyas • <strong className="text-[#800000]">Sound:</strong> Temple chimes • <strong className="text-[#800000]">Scent:</strong> Soy candles • <strong className="text-[#800000]">Taste:</strong> Saffron sweets • <strong className="text-[#800000]">Touch:</strong> Brass keepsakes • <strong className="text-[#800000]">Panchtattva:</strong> 5-in-1 grand box
            </p>
          </div>

          {/* Corporate B2B Features Grid */}
          <div className="grid grid-cols-2 gap-2 text-[10px] text-[#800000] border-t border-[#800000]/15 pt-1.5">
            <div>
              <p className="font-bold uppercase tracking-wider text-[#800000]">Custom Branding</p>
              <p className="text-[#800000]/75 leading-tight text-[9px] mt-0.5">Gold foil logo, ribbon & cards</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-[#800000]">Tiered Budgets</p>
              <p className="text-[#800000]/75 leading-tight text-[9px] mt-0.5">₹700 to ₹3,000+ (Min. 30 Qty)</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-[#800000]">Pan-India Logistics</p>
              <p className="text-[#800000]/75 leading-tight text-[9px] mt-0.5">19,000+ pin codes delivery</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-[#800000]">Eco-Keepsake</p>
              <p className="text-[#800000]/75 leading-tight text-[9px] mt-0.5">Reusable plastic-free rigid boxes</p>
            </div>
          </div>

          {/* Quick Hamper Shortcut Buttons */}
          <div className="pt-1 border-t border-[#800000]/15 flex flex-wrap items-center gap-1 text-[9px] font-bold uppercase tracking-wider">
            <span className="text-[#800000]/70">Explore:</span>
            {['Drishti', 'Shruti', 'Gandh', 'Rasa', 'Sparsh', 'Panchtattva'].map((s, idx) => (
              <button
                key={s}
                onClick={() => scrollToHamper(idx)}
                className="bg-white border border-[#800000]/30 px-1.5 py-0.5 rounded text-[#800000] hover:bg-[#800000] hover:text-white transition-all cursor-pointer font-bold"
              >
                #{s}
              </button>
            ))}
          </div>
        </div>

        {/* MAROON MOVING MARQUEE — FLASH SALE TICKER WITH MATCHING WEBSITE FONTS */}
        <div className="relative -mx-[4vw] w-[calc(100%+8vw)] overflow-hidden bg-[#800000] text-white py-2.5 sm:py-3 border-y border-[#800000] shadow-md select-none my-1 font-sans">
          <div className="animate-marquee flex items-center whitespace-nowrap font-sans">
            {[0, 1].map((copyIndex) => (
              <div key={copyIndex} className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8 font-sans">
                <span className="text-base sm:text-lg lg:text-xl font-bold uppercase tracking-wider text-white font-sans">
                  DIWALI 2026 FLASH SALE
                </span>
                <span className="text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-wider text-[#fde68a] font-sans">
                  UP TO 25% OFF ON EARLY CORPORATE BOOKINGS
                </span>
                <span className="text-xs sm:text-sm text-white/50 font-bold">•</span>
                <span className="text-base sm:text-lg lg:text-xl font-bold uppercase tracking-wider text-white font-sans">
                  FIVE SENSES LUXURY HAMPERS FROM ₹700
                </span>
                <span className="text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-wider text-[#fde68a] font-sans">
                  LIMITED SLOTS: BESPOKE LOGO PRINTING
                </span>
                <span className="text-xs sm:text-sm text-white/50 font-bold">•</span>
                <span className="text-base sm:text-lg lg:text-xl font-bold uppercase tracking-wider text-white font-sans">
                  FREE PAN-INDIA EXPRESS SHIPPING ON BULK ORDERS
                </span>
                <span className="text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-wider text-[#fde68a] font-sans">
                  WHATSAPP ORDERS: +91 83569 18580
                </span>
                <span className="text-xs sm:text-sm text-white/50 font-bold">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status / Links Bar on Solid White */}
        <div className="flex flex-wrap items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#800000] pt-2 pb-1 border-t border-[#800000]/20">
          <div className="flex items-center gap-4">
            <a href="https://www.sensora.co.in" target="_blank" rel="noopener noreferrer" className="hover:underline">
              www.sensora.co.in
            </a>
            <span>•</span>
            <a href="https://www.gifting.sensora.co.in" target="_blank" rel="noopener noreferrer" className="hover:underline">
              www.gifting.sensora.co.in
            </a>
          </div>
          <span className="font-bold">Sensori by Sensora • Diwali 2026</span>
          <span className="hidden sm:inline">Scroll down to explore hampers ↓</span>
        </div>
      </FlowSection>

      {/* 02 — THE COLLECTION (DETAILED SHOWCASE WITH BIGGER IMAGES) */}
      <FlowSection id="collection-section" aria-label="The Collection" isCollection style={{ backgroundColor: '#ffffff', color: '#800000' }}>
        {/* Background Watermark Logo with explicit 4% opacity */}
        <Logo
          size={520}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.035,
            pointerEvents: 'none',
            zIndex: 0,
            maxWidth: '80vw',
            maxHeight: '75vh',
          }}
          className="text-[#800000] select-none"
        />

        {/* DESKTOP VIEW (hidden lg:flex): Pinned interactive showcase */}
        <div className="hidden lg:flex relative z-10 flex-col justify-between min-h-full flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 pt-6 sm:pt-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#800000]">
                02 — The Six Hampers Collection
              </p>
              <p className="text-[11px] font-semibold text-[#800000]/70 uppercase tracking-wider mt-0.5">
                Smooth scroll to explore all six services • Service {activeHamperIndex + 1} of 06
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#800000] bg-[#800000]/5 px-2.5 py-1 rounded border border-[#800000]/15">
                Service {currentHamper.id} of 06 • {currentHamper.name}
              </span>
            </div>
          </div>

          {/* Smooth Scroll Navigation Progress Bar */}
          <div className="w-full bg-[#800000]/10 h-1.5 rounded-full overflow-hidden my-1.5" title="Smooth scroll progress through the six services">
            <div
              className="bg-[#800000] h-full transition-all duration-300 ease-out"
              style={{ width: `${((activeHamperIndex + 1) / 6) * 100}%` }}
            />
          </div>

          <hr className="my-[0.25vw] border-none border-t border-[#800000]/20" />

          {/* Sense Switcher Tabs — Clean Typographic Underline (No Maroon Rectangles / No Boxes) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 my-1.5 border-b border-[#800000]/15 pb-1">
            {hampers.map((hamper, idx) => (
              <button
                key={hamper.id}
                onClick={() => scrollToHamper(idx)}
                className={`pb-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeHamperIndex === idx
                    ? 'text-[#800000] border-b-2 border-[#800000]'
                    : 'text-[#800000]/45 hover:text-[#800000] border-b-2 border-transparent'
                }`}
              >
                {hamper.id} {hamper.name}
              </button>
            ))}
          </div>

          {/* Featured Hamper Large Showcase — Seamless Borderless Layout with Animated Transition */}
          <div
            key={currentHamper.id}
            className="animate-fadeInHamper bg-white py-2 my-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* Large Image Column (Takes 6 of 12 columns for well-proportioned display) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div
                onClick={() => {
                  setModalHamper(currentHamper);
                  setIsModalOpen(true);
                }}
                className="relative w-full max-w-[420px] lg:max-w-[480px] max-h-[46vh] aspect-square bg-white overflow-hidden flex items-center justify-center cursor-zoom-in group"
              >
                <img
                  src={currentHamper.image}
                  alt={`${currentHamper.name} Diwali Hamper`}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 right-2 bg-white/90 border border-[#800000]/20 text-[#800000] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                  🔍 Click to Enlarge
                </span>
              </div>
              <p className="text-[11px] text-[#800000]/60 mt-1 font-medium text-center">
                {currentHamper.name} • {currentHamper.sense}
              </p>
            </div>

            {/* Product Explanation & Details Column (Takes 6 of 12 columns — Seamless, No Outlines) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#800000]">
                    Sense #{currentHamper.id} • {currentHamper.sense}
                  </span>
                  <span className="text-xs font-semibold text-[#800000]/65">
                    — {currentHamper.tagline}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#800000] uppercase tracking-tight mt-1.5">
                  {currentHamper.name}
                </h3>

                <div className="flex items-baseline gap-3 mt-1.5 pb-2 border-b border-[#800000]/15">
                  <span className="text-2xl sm:text-3xl font-black text-[#800000]">{currentHamper.price}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#800000]/70">
                    per hamper • Customised volume
                  </span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#800000]/85 font-medium">
                {currentHamper.overview}
              </p>

              {/* List of Products Explaining the Hamper — Clean & Seamless (No Outlines) */}
              <div className="pt-1 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#800000]">
                  Curated Products & Inclusions:
                </p>
                <ul className="space-y-1.5 text-xs text-[#800000]/90">
                  {currentHamper.products.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-[#800000] text-sm leading-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-[#800000]/80 pt-1">
                <strong className="text-[#800000]">Ideal For:</strong> {currentHamper.idealFor}
              </div>

              {/* Action Bar — High-Contrast Clean Styling (No Maroon Blocks) */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={`https://wa.me/918356918580?text=Hi%20Sensori%2C%20I%20am%20interested%20in%20ordering%20the%20${currentHamper.name}%20(${currentHamper.sense})%20Hamper`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-white text-[#800000] border-2 border-[#800000] rounded hover:bg-[#800000] hover:text-white transition-all shadow-sm"
                >
                  Inquire on WhatsApp
                </a>

                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    onClick={handlePrevHamper}
                    className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider bg-white text-[#800000] border border-[#800000]/25 rounded hover:border-[#800000] cursor-pointer"
                    title={activeHamperIndex === 0 ? "Back to Section 01 (Hero)" : "Previous Service"}
                  >
                    {activeHamperIndex === 0 ? '↑ Hero' : '← Prev'}
                  </button>
                  <button
                    onClick={handleNextHamper}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#800000] text-white rounded hover:bg-[#800000]/90 transition-all cursor-pointer shadow-sm"
                    title={activeHamperIndex === hampers.length - 1 ? "Advance to 03 — Customised Plan" : "Next Service"}
                  >
                    {activeHamperIndex === hampers.length - 1 ? 'Next Page (03) ↓' : 'Next →'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation Bar for All 6 Hampers — Seamless Strip */}
          <div className="grid grid-cols-6 gap-2 my-2 pt-2 border-t border-[#800000]/15">
            {hampers.map((hamper, idx) => (
              <button
                key={hamper.id}
                onClick={() => scrollToHamper(idx)}
                className={`p-1.5 text-left flex flex-col sm:flex-row items-center gap-2 transition-all cursor-pointer bg-white ${
                  activeHamperIndex === idx
                    ? 'border-b-2 border-[#800000] opacity-100'
                    : 'border-b-2 border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={hamper.image}
                  alt={hamper.name}
                  className="w-10 h-10 object-contain p-0.5"
                />
                <div className="hidden sm:block">
                  <p className="text-[10px] font-bold uppercase text-[#800000] leading-tight">
                    {hamper.name}
                  </p>
                  <p className="text-[9px] text-[#800000]/70 font-semibold">{hamper.price}</p>
                </div>
              </button>
            ))}
          </div>

          <hr className="my-[0.5vw] border-none border-t border-[#800000]/20" />

          <div className="mt-auto flex flex-wrap items-center justify-between text-xs text-[#800000] font-medium pb-2">
            <span>Catalog pricing confirmed upon order volume</span>
            <span className="font-bold">Portal: www.gifting.sensora.co.in</span>
          </div>
        </div>

        {/* MOBILE VIEW (block lg:hidden): Natural, complete smooth scroll through all 6 services with all details shown */}
        <div className="block lg:hidden relative z-10 w-full space-y-5 pt-3 pb-8">
          {/* Section 02 Mobile Header */}
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#800000]">
              02 — The Six Hampers Collection
            </p>
            <h2 className="text-2xl font-black uppercase text-[#800000] tracking-tight">
              Diwali 2026 Luxury Sensory Hampers
            </h2>
            <p className="text-xs text-[#800000]/75 font-medium leading-relaxed">
              Explore the full curated details, handcrafted inclusions, and corporate gifting specifications for each of our six signature services below.
            </p>
          </div>

          {/* Sticky Sense Navigation Pill Bar */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md py-2.5 -mx-[4vw] px-[4vw] border-y border-[#800000]/20 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#800000]/60 shrink-0">
              Services:
            </span>
            {hampers.map((hamper, idx) => (
              <button
                key={hamper.id}
                onClick={() => scrollToHamper(idx)}
                className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer border ${
                  activeHamperIndex === idx
                    ? 'bg-[#800000] text-white border-[#800000] shadow-xs'
                    : 'bg-white text-[#800000]/75 border-[#800000]/25 hover:border-[#800000] hover:text-[#800000]'
                }`}
              >
                {hamper.id} {hamper.name}
              </button>
            ))}
          </div>

          {/* All 6 Services Rendered in Complete Sequential Detail */}
          <div className="space-y-8">
            {hampers.map((hamper, idx) => (
              <article
                key={hamper.id}
                id={`mobile-service-${idx}`}
                className="scroll-mt-16 pt-3 pb-8 border-b-2 border-[#800000]/15 last:border-b-0 space-y-4"
              >
                {/* Service Tag & Sense */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#800000] bg-[#800000]/5 px-2.5 py-1 rounded border border-[#800000]/20">
                    Service {hamper.id} of 06 • {hamper.sense}
                  </span>
                  <span className="text-[11px] font-semibold text-[#800000]/70">
                    {hamper.tagline}
                  </span>
                </div>

                {/* Service Title & Pricing */}
                <div>
                  <h3 className="text-3xl font-extrabold text-[#800000] uppercase tracking-tight">
                    {hamper.name}
                  </h3>
                  <div className="flex items-baseline gap-2.5 mt-1 pb-2 border-b border-[#800000]/15">
                    <span className="text-2xl font-black text-[#800000]">{hamper.price}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#800000]/70">
                      per hamper • Volume discounts available
                    </span>
                  </div>
                </div>

                {/* Hamper Image with Tap to Enlarge */}
                <div className="flex flex-col items-center">
                  <div
                    onClick={() => {
                      setModalHamper(hamper);
                      setIsModalOpen(true);
                    }}
                    className="relative w-full max-w-[320px] aspect-square bg-white flex items-center justify-center cursor-zoom-in group"
                  >
                    <img
                      src={hamper.image}
                      alt={`${hamper.name} Diwali Hamper`}
                      className="w-full h-full object-contain p-2"
                    />
                    <span className="absolute bottom-2 right-2 bg-white/95 border border-[#800000]/25 text-[#800000] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                      🔍 Tap to Enlarge
                    </span>
                  </div>
                  <p className="text-[11px] text-[#800000]/60 mt-1 font-medium text-center">
                    {hamper.name} • {hamper.sense}
                  </p>
                </div>

                {/* Overview Paragraph */}
                <p className="text-xs sm:text-sm leading-relaxed text-[#800000]/90 font-medium">
                  {hamper.overview}
                </p>

                {/* Curated Products & Inclusions List */}
                <div className="p-3.5 bg-[#800000]/[0.025] rounded border border-[#800000]/15 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#800000]">
                      Curated Products & Inclusions:
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#800000] bg-[#800000]/10 px-2 py-0.5 rounded">
                      {hamper.products.length} Items
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#800000]/90">
                    {hamper.products.map((item, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <span className="font-bold text-[#800000] text-sm leading-none mt-0.5">•</span>
                        <span className="leading-relaxed font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For */}
                <div className="text-xs text-[#800000]/80">
                  <strong className="text-[#800000]">Ideal For:</strong> {hamper.idealFor}
                </div>

                {/* WhatsApp Order & Navigation Action Buttons */}
                <div className="space-y-2 pt-2">
                  <a
                    href={`https://wa.me/918356918580?text=Hi%20Sensori%2C%20I%20am%20interested%20in%20ordering%20the%20${hamper.name}%20(${hamper.sense})%20Hamper`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-2.5 text-xs font-bold uppercase tracking-wider bg-white text-[#800000] border-2 border-[#800000] rounded hover:bg-[#800000] hover:text-white transition-all shadow-xs"
                  >
                    Inquire for {hamper.name} on WhatsApp
                  </a>

                  {idx < 5 ? (
                    <button
                      onClick={() => scrollToHamper(idx + 1)}
                      className="w-full text-center py-2 text-[11px] font-bold uppercase tracking-wider text-[#800000]/75 hover:text-[#800000] flex items-center justify-center gap-1.5 cursor-pointer bg-[#800000]/5 rounded border border-[#800000]/15"
                    >
                      <span>Scroll to Next Service: 0{idx + 2} {hampers[idx + 1].name} ({hampers[idx + 1].price})</span>
                      <span>↓</span>
                    </button>
                  ) : (
                    <div className="pt-4 border-t border-[#800000]/20 text-center space-y-3">
                      <div className="bg-[#800000]/5 border border-[#800000]/15 p-3 rounded text-center">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#800000]">
                          ✓ All 6 Sensory Hampers Explored
                        </p>
                        <p className="text-[11px] text-[#800000]/75 mt-0.5">
                          Continue scrolling to view bespoke customisation & bulk orders
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const el = document.getElementById('customised-plan-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full block py-2.5 text-xs font-bold uppercase tracking-wider bg-[#800000] text-white rounded shadow-sm cursor-pointer"
                      >
                        03 — Customised Plan & Pricing ↓
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </FlowSection>

      {/* 03 — CUSTOMISED PLAN */}
      <FlowSection id="customised-plan-section" aria-label="Customised Plan" style={{ backgroundColor: '#ffffff', color: '#800000' }}>
        {/* Background Watermark Logo with explicit 3.5% opacity */}
        <Logo
          size={520}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.035,
            pointerEvents: 'none',
            zIndex: 0,
            maxWidth: '80vw',
            maxHeight: '75vh',
          }}
          className="text-[#800000] select-none"
        />

        {/* VERTICAL MAROON MOVING MARQUEE ON RIGHT SIDE OF PAGE — HAPPY DIWALI */}
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-12 lg:w-14 bg-[#800000] text-white overflow-hidden z-20 flex justify-center py-2 select-none border-l-2 border-[#800000] shadow-md">
          <div
            className="animate-marquee-vertical select-none font-sans"
            style={{
              writingMode: 'vertical-rl',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              lineHeight: 1,
            }}
          >
            {[0, 1].map((copyIndex) => (
              <span key={copyIndex} className="inline-block py-6 font-sans">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#fde68a] font-sans px-3">
                  HAPPY DIWALI
                </span>
                <span className="text-xs text-white/50 font-bold px-1">•</span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white font-sans px-3">
                  HAPPY DIWALI 2026
                </span>
                <span className="text-xs text-white/50 font-bold px-1">•</span>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#fde68a] font-sans px-3">
                  HAPPY DIWALI
                </span>
                <span className="text-xs text-white/50 font-bold px-1">•</span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white font-sans px-3">
                  SENSORI BY SENSORA
                </span>
                <span className="text-xs text-white/50 font-bold px-1">•</span>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#fde68a] font-sans px-3">
                  HAPPY DIWALI
                </span>
                <span className="text-xs text-white/50 font-bold px-1">•</span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white font-sans px-3">
                  CUSTOMISED LUXURY HAMPERS
                </span>
                <span className="text-xs text-white/50 font-bold px-1">•</span>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#fde68a] font-sans px-3">
                  HAPPY DIWALI
                </span>
                <span className="text-xs text-white/50 font-bold px-1">•</span>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white font-sans px-3">
                  WHATSAPP: +91 83569 18580
                </span>
                <span className="text-xs text-white/50 font-bold px-1">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Content Container (Offset cleanly to give room for right vertical marquee) */}
        <div className="relative z-10 pr-12 sm:pr-14 lg:pr-16 flex flex-col justify-between min-h-full flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 pt-10 sm:pt-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#800000]">
                03 — Customised Plan • Bespoke Corporate Diwali Gifting 2026
              </p>
              <p className="text-[11px] font-semibold text-[#800000]/70 uppercase tracking-wider mt-0.5">
                Bespoke Luxury Hampers Tailored to Your Brand, Budget & Volume
              </p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#800000]/70">
              Sensori by Sensora • Pan-India Delivery
            </p>
          </div>

          <hr className="my-[1vw] border-none border-t border-[#800000]/20" />

          {/* Heading & High-Intent SEO Introduction */}
          <div className="space-y-3">
            <h2 className="text-[clamp(1.85rem,4.2vw,4.25rem)] font-bold leading-[0.95] uppercase tracking-tight text-[#800000]">
              Your Gifting.
              <br />
              Designed
              <br />
              Around You.
            </h2>
            <p className="text-xs sm:text-sm text-[#800000]/85 leading-relaxed max-w-4xl font-medium">
              Sensori by Sensora is India’s premier luxury festive gifting studio architected around the Five Senses — 
              <strong> Sight (Drishti)</strong>, <strong>Sound (Shruti)</strong>, <strong>Smell (Gandha)</strong>, 
              <strong> Taste (Rasa)</strong>, and <strong>Touch (Sparsh)</strong>. Whether curating 30 VIP executive hampers (Minimum Order Quantity: 30) or 
              deploying 5,000 custom corporate employee gifts across India, our bespoke concierge designs tailored Diwali gifting 
              solutions engineered to your exact brand aesthetics, timeline, and budgetary framework (₹700 to ₹3,000+).
            </p>
          </div>

          <hr className="my-[1vw] border-none border-t border-[#800000]/20" />

          {/* 4 Pillars — Completely Seamless, Editorial Typography (No Rectangle Outlier Blocks) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 my-2">
            <div className="border-t border-[#800000]/25 pt-3.5 space-y-1.5">
              <span className="text-xs font-black tracking-widest text-[#800000] uppercase block">
                01 / SENSE ARCHITECTURE
              </span>
              <h3 className="text-sm font-bold uppercase text-[#800000] tracking-wide">
                Mix & Match All 5 Senses
              </h3>
              <p className="text-xs leading-relaxed text-[#800000]/80">
                Blend handcrafted brass diyas (Sight), auspicious ceremonial bell chimes (Sound), hand-poured botanical soy candles (Smell), 
                gourmet dry fruits & saffron confections (Taste), and brass keepsake artifacts (Touch) into one custom ensemble.
              </p>
            </div>

            <div className="border-t border-[#800000]/25 pt-3.5 space-y-1.5">
              <span className="text-xs font-black tracking-widest text-[#800000] uppercase block">
                02 / BUDGET OPTIMIZATION
              </span>
              <h3 className="text-sm font-bold uppercase text-[#800000] tracking-wide">
                Engineered to Your Budget
              </h3>
              <p className="text-xs leading-relaxed text-[#800000]/80">
                Tiered curation across price brackets: Employee Desk Hampers (₹700–₹1,000), Associate & Team Rewards (₹1,000–₹1,750), 
                Executive Partner Gifts (₹1,750–₹2,500), and C-Suite Flagship Panchtattva Sets (₹2,500–₹3,000+).
              </p>
            </div>

            <div className="border-t border-[#800000]/25 pt-3.5 space-y-1.5">
              <span className="text-xs font-black tracking-widest text-[#800000] uppercase block">
                03 / BESPOKE BRANDING
              </span>
              <h3 className="text-sm font-bold uppercase text-[#800000] tracking-wide">
                Custom Logo & Gold Foil
              </h3>
              <p className="text-xs leading-relaxed text-[#800000]/80">
                Metallic gold-foil logo embossing on Burgundy rigid keepsake boxes, corporate satin ribbons, custom festive greeting cards 
                with your personalized corporate message, and 24-hour digital approval proofs.
              </p>
            </div>

            <div className="border-t border-[#800000]/25 pt-3.5 space-y-1.5">
              <span className="text-xs font-black tracking-widest text-[#800000] uppercase block">
                04 / PAN-INDIA LOGISTICS
              </span>
              <h3 className="text-sm font-bold uppercase text-[#800000] tracking-wide">
                Multi-City Doorstep Delivery
              </h3>
              <p className="text-xs leading-relaxed text-[#800000]/80">
                End-to-end logistics covering 19,000+ pin codes including Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Pune, 
                and Ahmedabad. Bulk delivery to office hubs or individual direct-to-home doorstep dispatch.
              </p>
            </div>
          </div>

          <hr className="my-[1vw] border-none border-t border-[#800000]/20" />

          {/* MAKE IT PERSONAL — BESPOKE PERSONALISATION SERVICE (SEAMLESS, NO OUTLIER BLOCKS) */}
          <div className="space-y-2.5 py-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-black tracking-widest text-[#800000] uppercase">
                  MAKE IT PERSONAL • ADD-ON SERVICE
                </span>
                <span className="text-xs text-[#800000]/50">•</span>
                <span className="text-xs font-bold text-[#800000]">
                  ₹500 PER BATCH ADD-ON
                </span>
              </div>
              <p className="text-[11px] text-[#800000]/70 uppercase tracking-wider font-semibold">
                Available across every hamper in the Sensori collection
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs text-[#800000]">
              <div className="border-t border-[#800000]/20 pt-2 space-y-1">
                <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">
                  01 / Recipient or Family Name
                </p>
                <p className="text-[#800000]/80 leading-relaxed text-xs">
                  Custom printed directly on the festive note card for a deeply personal, intimate unboxing tribute.
                </p>
              </div>
              <div className="border-t border-[#800000]/20 pt-2 space-y-1">
                <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">
                  02 / Bespoke Festive Greeting
                </p>
                <p className="text-[#800000]/80 leading-relaxed text-xs">
                  Your heartfelt custom festive message or executive company letter in place of standard greetings.
                </p>
              </div>
              <div className="border-t border-[#800000]/20 pt-2 space-y-1">
                <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">
                  03 / Corporate Branding & Logo
                </p>
                <p className="text-[#800000]/80 leading-relaxed text-xs">
                  Precision company logo printing with metallic gold foil embossing for branded corporate gifting.
                </p>
              </div>
              <div className="border-t border-[#800000]/20 pt-2 space-y-1">
                <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">
                  04 / 24-Hour Approval Proof
                </p>
                <p className="text-[#800000]/80 leading-relaxed text-xs">
                  High-resolution digital proof shared for your review and sign-off before commencing final print runs.
                </p>
              </div>
            </div>
          </div>

          <hr className="my-[1vw] border-none border-t border-[#800000]/20" />

          {/* Comprehensive SEO Feature Grid — Clean Minimalist Data (No Outlier Blocks) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-1 text-xs text-[#800000]">
            <div>
              <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">Order Volume (MOQ)</p>
              <p className="text-[#800000]/80 text-[11px] mt-0.5">From 10 units to 5,000+ enterprise scale</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">GST Input Tax Credit</p>
              <p className="text-[#800000]/80 text-[11px] mt-0.5">100% compliant corporate B2B tax invoices</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">Early Corporate Booking</p>
              <p className="text-[#800000]/80 text-[11px] mt-0.5">Up to 25% off on confirmed pre-orders</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">Dedicated Concierge</p>
              <p className="text-[#800000]/80 text-[11px] mt-0.5">Direct WhatsApp support & dispatch updates</p>
            </div>
          </div>

          <hr className="my-[1vw] border-none border-t border-[#800000]/20" />

          {/* Action Footer */}
          <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-tight text-[#800000]">
                Ready to curate your custom Diwali 2026 hampers?
              </p>
              <p className="text-xs text-[#800000]/70">
                Share your estimated quantity, target budget, and occasion — our team prepares your tailored proposal within hours.
              </p>
            </div>
            <a
              href="https://wa.me/918356918580?text=Hi%20Sensori%2C%20I%20would%20like%20to%20discuss%20a%20Customised%20Diwali%20Gifting%20Plan%20for%20our%20company"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-white text-[#800000] border-2 border-[#800000] rounded hover:bg-[#800000] hover:text-white transition-all shadow-sm shrink-0"
            >
              Request Custom Plan on WhatsApp
            </a>
          </div>
        </div>
      </FlowSection>

      {/* 04 — CORPORATE TESTIMONIALS */}
      <FlowSection aria-label="Corporate Testimonials" style={{ backgroundColor: '#ffffff', color: '#800000' }}>
        {/* Background Watermark Logo with explicit 3.5% opacity */}
        <Logo
          size={520}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.035,
            pointerEvents: 'none',
            zIndex: 0,
            maxWidth: '80vw',
            maxHeight: '75vh',
          }}
          className="text-[#800000] select-none"
        />

        <div className="relative z-10 flex flex-col justify-between min-h-full flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 pt-10 sm:pt-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#800000]">
                04 — Client Testimonials • Trusted by Leading Enterprises
              </p>
              <p className="text-[11px] font-semibold text-[#800000]/70 uppercase tracking-wider mt-0.5">
                Real Reviews from HR Directors, Procurement Heads & CXOs Across India
              </p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#800000]/70">
              Sensori by Sensora • Verified B2B Orders
            </p>
          </div>

          <hr className="my-[1vw] border-none border-t border-[#800000]/20" />

          {/* Heading & Trust Overview */}
          <div className="space-y-2">
            <h2 className="text-[clamp(1.85rem,4.2vw,4.25rem)] font-bold leading-[0.95] uppercase tracking-tight text-[#800000]">
              Trusted by Leaders.
              <br />
              Celebrated
              <br />
              by Teams.
            </h2>
            <p className="text-xs sm:text-sm text-[#800000]/85 leading-relaxed max-w-4xl font-medium">
              Over 35,000 corporate festive hampers delivered across 150+ enterprises in India. From bespoke C-Suite tributes 
              to large-scale Pan-India workforce distributions, discover why top organizations trust Sensori for their flagship Diwali celebrations.
            </p>
          </div>

          <hr className="my-[1vw] border-none border-t border-[#800000]/20" />

          {/* 4 Realtime Corporate Testimonials — Seamless Editorial Typography (No Outlier Blocks) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 my-2">
            {/* Testimonial 1 */}
            <div className="border-t border-[#800000]/25 pt-3.5 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black tracking-widest text-[#800000]">★★★★★ 5.0</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#800000]/70 bg-white border border-[#800000]/25 px-1.5 py-0.5 rounded">
                    Verified B2B Order
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[#800000]/85 italic">
                  “The Five Senses concept completely redefined our corporate gifting. Our Ultra-HNI wealth clients specifically called to compliment the auspicious brass ceremonial bell and the exquisite gold-foil logo embossing on the Burgundy box. Flawless execution across Mumbai and Pune.”
                </p>
              </div>
              <div className="pt-2 border-t border-[#800000]/15">
                <p className="text-xs font-bold uppercase text-[#800000] leading-tight">
                  Vikram Malhotra
                </p>
                <p className="text-[11px] text-[#800000]/70 font-medium">
                  Head of Procurement • Wealth Advisory
                </p>
                <p className="text-[10px] text-[#800000]/60 mt-0.5">
                  Nariman Point, Mumbai • 650 Panchtattva VIP Hampers
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="border-t border-[#800000]/25 pt-3.5 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black tracking-widest text-[#800000]">★★★★★ 5.0</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#800000]/70 bg-white border border-[#800000]/25 px-1.5 py-0.5 rounded">
                    Verified B2B Order
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[#800000]/85 italic">
                  “Managing festive gifting for 2,400 remote employees across 14 cities seemed daunting until Sensori stepped in. Every single hamper arrived on schedule with zero transit breakage. The eco-friendly, plastic-free presentation was widely celebrated across our internal Slack channels.”
                </p>
              </div>
              <div className="pt-2 border-t border-[#800000]/15">
                <p className="text-xs font-bold uppercase text-[#800000] leading-tight">
                  Pooja Sundaram
                </p>
                <p className="text-[11px] text-[#800000]/70 font-medium">
                  Senior VP, People & Culture • SaaS Enterprise
                </p>
                <p className="text-[10px] text-[#800000]/60 mt-0.5">
                  Whitefield, Bengaluru • 2,400 Drishti & Gandh Hampers
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="border-t border-[#800000]/25 pt-3.5 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black tracking-widest text-[#800000]">★★★★★ 5.0</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#800000]/70 bg-white border border-[#800000]/25 px-1.5 py-0.5 rounded">
                    Verified B2B Order
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[#800000]/85 italic">
                  “The craftsmanship in the hand-hammered brass coasters and the gourmet saffron treats was unmatched. Sensori delivered digital approval proofs within 12 hours and met our strict delivery deadline without any delay. It set a new gold standard for our executive gifting in NCR.”
                </p>
              </div>
              <div className="pt-2 border-t border-[#800000]/15">
                <p className="text-xs font-bold uppercase text-[#800000] leading-tight">
                  Ananya Deshmukh
                </p>
                <p className="text-[11px] text-[#800000]/70 font-medium">
                  Director of Operations • Strategic Consulting
                </p>
                <p className="text-[10px] text-[#800000]/60 mt-0.5">
                  Cyber City, Gurugram • 420 Sparsh & Rasa Hampers
                </p>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="border-t border-[#800000]/25 pt-3.5 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black tracking-widest text-[#800000]">★★★★★ 5.0</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#800000]/70 bg-white border border-[#800000]/25 px-1.5 py-0.5 rounded">
                    Verified B2B Order
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[#800000]/85 italic">
                  “Our international healthcare delegates and hospital partners were deeply impressed by the sensory narrative. The dedicated WhatsApp concierge gave us live parcel dispatch updates until every parcel was safely delivered. We have already confirmed our Diwali 2026 pre-order.”
                </p>
              </div>
              <div className="pt-2 border-t border-[#800000]/15">
                <p className="text-xs font-bold uppercase text-[#800000] leading-tight">
                  K. Rajeshwar Rao
                </p>
                <p className="text-[11px] text-[#800000]/70 font-medium">
                  Head of Global Alliances • Life Sciences
                </p>
                <p className="text-[10px] text-[#800000]/60 mt-0.5">
                  HITEC City, Hyderabad • 800 Bespoke Sensory Hampers
                </p>
              </div>
            </div>
          </div>

          <hr className="my-[1vw] border-none border-t border-[#800000]/20" />

          {/* Corporate Trust & Performance Metrics Bar (Borderless) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-1 text-xs text-[#800000]">
            <div>
              <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">4.9 / 5.0 Rating</p>
              <p className="text-[#800000]/80 text-[11px] mt-0.5">Over 150+ verified corporate client reviews</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">35,000+ Hampers</p>
              <p className="text-[#800000]/80 text-[11px] mt-0.5">Successfully dispatched across Pan-India</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">99.8% On-Time</p>
              <p className="text-[#800000]/80 text-[11px] mt-0.5">Guaranteed delivery before Diwali Lakshmi Puja</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">Zero Plastic</p>
              <p className="text-[#800000]/80 text-[11px] mt-0.5">100% recyclable & reusable keepsake packaging</p>
            </div>
          </div>

          <hr className="my-[1vw] border-none border-t border-[#800000]/20" />

          {/* Action Footer */}
          <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-tight text-[#800000]">
                Experience Five Senses luxury for your corporate gifting
              </p>
              <p className="text-xs text-[#800000]/70">
                Connect directly with our corporate team for catalog requests, custom sample boxes, and volume quotation RFPs.
              </p>
            </div>
            <a
              href="https://wa.me/918356918580?text=Hi%20Sensori%2C%20I%20would%20like%20to%20request%20a%20Corporate%20Sample%20and%20Quotation%20for%20Diwali%202026"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-white text-[#800000] border-2 border-[#800000] rounded hover:bg-[#800000] hover:text-white transition-all shadow-sm shrink-0"
            >
              Request Corporate Sample on WhatsApp
            </a>
          </div>
        </div>
      </FlowSection>

      {/* 05 — READY TO GIFT / ORDER */}
      <FlowSection aria-label="Order Diwali Hampers" style={{ backgroundColor: '#ffffff', color: '#800000' }} className="overflow-y-auto">
        {/* Background Watermark Logo with explicit 3.5% opacity */}
        <Logo
          size={520}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.035,
            pointerEvents: 'none',
            zIndex: 0,
            maxWidth: '80vw',
            maxHeight: '75vh',
          }}
          className="text-[#800000] select-none"
        />

        <div className="relative z-10 flex flex-col justify-between min-h-full flex-1">
          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-12 sm:pt-14">
            <div className="flex items-center gap-2.5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#800000]">05 — Ready to Gift?</p>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#800000] border border-[#800000]/30 px-2 py-0.5 rounded bg-white">
                Minimum Order: 30 Quantity
              </span>
            </div>
            <Logo size={32} className="text-[#800000]" />
          </div>

          <hr className="my-[1vw] border-none border-t border-[#800000]/20" />

          {/* Heading */}
          <div>
            <h2 className="text-[clamp(2.5rem,7.5vw,8.5rem)] font-bold leading-[0.88] uppercase tracking-tight text-[#800000]">
              Five Senses.
              <br />
              One Diwali.
            </h2>
            <p className="text-xs sm:text-sm text-[#800000]/80 mt-2 max-w-2xl leading-relaxed">
              Curated artisanal Diwali collections designed around sight, sound, scent, taste, and touch. Minimum order quantity of 30 hampers with Pan-India corporate delivery guaranteed for Diwali.
            </p>
          </div>

          <hr className="my-[1vw] border-none border-t border-[#800000]/20" />

          {/* 3 Step Ordering Process (Borderless Luxury Editorial) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-1">
            <div className="border-t border-[#800000]/25 pt-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#800000]/60">Step 01</span>
              <h3 className="text-base font-extrabold uppercase text-[#800000] mt-0.5">Choose Your Hamper</h3>
              <p className="text-xs text-[#800000]/80 mt-1 leading-relaxed">
                Select from Drishti, Shruti, Gandh, Rasa, Sparsh, or the master Panchtattva grand box.
              </p>
            </div>

            <div className="border-t border-[#800000]/25 pt-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#800000]/60">Step 02</span>
              <h3 className="text-base font-extrabold uppercase text-[#800000] mt-0.5">Quantity & Customisation</h3>
              <p className="text-xs text-[#800000]/80 mt-1 leading-relaxed">
                Minimum order of 30 hampers (scalable to 5,000+ units) with custom company logo gold foil branding, personalised greeting cards, and bespoke ribbons.
              </p>
            </div>

            <div className="border-t border-[#800000]/25 pt-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#800000]/60">Step 03</span>
              <h3 className="text-base font-extrabold uppercase text-[#800000] mt-0.5">Pan-India Doorstep Dispatch</h3>
              <p className="text-xs text-[#800000]/80 mt-1 leading-relaxed">
                Guaranteed zero-breakage delivery to residences or corporate offices with live WhatsApp tracking updates.
              </p>
            </div>
          </div>

          <hr className="my-[1vw] border-none border-t border-[#800000]/20" />

          {/* Comprehensive Footer Grid: Contact, Maps, Socials, CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-2 text-xs text-[#800000]">
            {/* Column 1: Office & Google Maps */}
            <div className="space-y-2">
              <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[#800000]" />
                Location & Studio
              </p>
              <div>
                <p className="font-semibold text-[#800000] leading-tight">Sensora Inc</p>
                <p className="text-[#800000]/75 text-[11px] mt-0.5 leading-relaxed">
                  Mumbai, Maharashtra, India
                </p>
                <p className="text-[#800000]/60 text-[10px] font-mono mt-0.5">
                  19.231165° N, 72.855308° E
                </p>
              </div>
              <div className="pt-1">
                <a
                  href="https://www.google.com/maps/place/Sensora+Inc/@19.2311698,72.8527333,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7b1c6357ff225:0xee09551fe8f5e0b5!8m2!3d19.2311648!4d72.8553082!16s%2Fg%2F11p1t8fc83"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[10px] text-[#800000] border-b border-[#800000] pb-0.5 hover:text-[#800000]/70 hover:border-[#800000]/70 transition-all"
                >
                  <span>Open on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-[10px] text-[#800000]/60 leading-tight">
                Hub deliveries to Nariman Point, BKC, Lower Parel, Whitefield, Cyber City & Pan-India.
              </p>
            </div>

            {/* Column 2: Direct Contact & Portals */}
            <div className="space-y-2">
              <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 shrink-0 text-[#800000]" />
                Direct Concierge
              </p>
              <div className="space-y-1">
                <p className="text-[#800000]/80 text-[11px]">
                  Phone:{' '}
                  <a href="tel:+918356918580" className="font-bold text-[#800000] hover:underline">
                    +91 83569 18580
                  </a>
                </p>
                <p className="text-[#800000]/80 text-[11px]">
                  WhatsApp:{' '}
                  <a
                    href="https://wa.me/918356918580?text=Hi%20Sensori%2C%20I%20am%20interested%20in%20Diwali%20Hampers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#800000] hover:underline"
                  >
                    +91 83569 18580
                  </a>
                </p>
                <p className="text-[#800000]/80 text-[11px]">
                  Email:{' '}
                  <a href="mailto:hello@sensora.co.in" className="font-bold text-[#800000] hover:underline">
                    hello@sensora.co.in
                  </a>
                </p>
              </div>
              <div className="pt-1 flex flex-col gap-0.5 text-[11px]">
                <a
                  href="https://www.sensora.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#800000] hover:underline"
                >
                  <Globe className="w-3 h-3 shrink-0" /> www.sensora.co.in
                </a>
                <a
                  href="https://www.gifting.sensora.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#800000] hover:underline"
                >
                  <Globe className="w-3 h-3 shrink-0" /> www.gifting.sensora.co.in
                </a>
              </div>
            </div>

            {/* Column 3: Official Social Links */}
            <div className="space-y-2">
              <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">
                Connect & Follow
              </p>
              <div className="space-y-1.5">
                <a
                  href="https://www.instagram.com/sensora.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[11px] text-[#800000] hover:underline font-medium"
                >
                  <InstagramIcon className="w-3.5 h-3.5 shrink-0 text-[#800000]" />
                  <span>Instagram • @sensora.official</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/sensoramarketing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[11px] text-[#800000] hover:underline font-medium"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 shrink-0 text-[#800000]" />
                  <span>LinkedIn • Sensora Inc</span>
                </a>
                <a
                  href="https://www.threads.com/@sensora.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[11px] text-[#800000] hover:underline font-medium"
                >
                  <ThreadsIcon className="w-3.5 h-3.5 shrink-0 text-[#800000]" />
                  <span>Threads • @sensora.official</span>
                </a>
              </div>
              <p className="text-[10px] text-[#800000]/60 leading-tight pt-1">
                Follow our official accounts for hamper reveals, unboxing videos, and festive stories.
              </p>
            </div>

            {/* Column 4: Quick Order CTAs */}
            <div className="space-y-2.5 flex flex-col justify-between">
              <div>
                <p className="font-bold uppercase tracking-wider text-[11px] text-[#800000]">
                  Immediate Booking
                </p>
                <p className="text-[11px] text-[#800000]/75 mt-0.5 leading-tight">
                  Minimum Order: 30 Hampers. Connect with our team to lock your festive production slot.
                </p>
              </div>
              <div className="space-y-2">
                <a
                  href="https://wa.me/918356918580?text=Hi%20Sensori%2C%20I%20am%20ready%20to%20order%20Diwali%20Hampers%20(Min.%2030%20Qty)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block text-center py-2 px-3 text-xs font-bold uppercase tracking-wider bg-[#800000] text-white rounded hover:bg-[#800000]/90 transition-all shadow-sm"
                >
                  Order on WhatsApp (Min. 30)
                </a>
                <a
                  href="tel:+918356918580"
                  className="w-full inline-block text-center py-2 px-3 text-xs font-bold uppercase tracking-wider bg-white border border-[#800000] text-[#800000] rounded hover:bg-[#800000]/5 transition-all"
                >
                  Call +91 83569 18580
                </a>
              </div>
            </div>
          </div>

          {/* Disclaimer Message */}
          <div className="mt-2 py-2 border-t border-[#800000]/20 flex items-start gap-2 text-[11px] text-[#800000]/80 leading-relaxed">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#800000] mt-0.5" />
            <p>
              <strong className="text-[#800000] uppercase font-bold tracking-wide">Disclaimer:</strong>{' '}
              Product color, artisanal brass finishes, and gift packaging/ribbon presentation might be a little different than shown in picture due to bespoke handcrafted production, natural raw material variations, and photographic studio lighting. Every hamper is individually checked to preserve our five-senses luxury hallmark.
            </p>
          </div>

          {/* Copyright & Bottom Bar */}
          <div className="border-t border-[#800000]/15 pt-2 pb-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[#800000]/60 uppercase tracking-wider">
            <p>© 2026 Sensora Inc. / Sensori Gifting. All rights reserved.</p>
            <p>Five Senses Luxury Diwali Hampers • Designed in Mumbai • Delivered Across India</p>
          </div>
        </div>
      </FlowSection>

      {/* FULL-SCREEN IMAGE MODAL FOR HIGH-RES INSPECTION */}
      {isModalOpen && (() => {
        const activeModalHamper = modalHamper || currentHamper;
        return (
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 bg-white p-4 sm:p-8 flex flex-col items-center justify-center cursor-zoom-out"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-2 border-[#800000] rounded-lg max-w-4xl w-full p-4 sm:p-6 shadow-2xl flex flex-col items-center"
            >
              <div className="w-full flex items-center justify-between pb-3 border-b border-[#800000]/20 mb-4">
                <div>
                  <h4 className="text-xl font-extrabold uppercase text-[#800000]">
                    {activeModalHamper.id} {activeModalHamper.name} — {activeModalHamper.sense}
                  </h4>
                  <p className="text-xs text-[#800000]/70 font-semibold">{activeModalHamper.price}</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-bold uppercase bg-white border border-[#800000] text-[#800000] rounded hover:bg-[#800000] hover:text-white transition-all cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              <div className="w-full max-h-[70vh] flex items-center justify-center overflow-hidden bg-white">
                <img
                  src={activeModalHamper.image}
                  alt={activeModalHamper.name}
                  className="max-h-[68vh] max-w-full object-contain"
                />
              </div>

              <div className="w-full mt-4 pt-3 border-t border-[#800000]/20 flex flex-wrap items-center justify-between gap-3 text-xs text-[#800000]">
                <div className="flex flex-col">
                  <span className="font-semibold">{activeModalHamper.overview}</span>
                  <span className="text-[10px] text-[#800000]/70 font-bold uppercase tracking-wider mt-0.5">
                    Minimum Order Quantity: 30 Hampers
                  </span>
                </div>
                <a
                  href={`https://wa.me/918356918580?text=Hi%20Sensori%2C%20I%20want%20to%20order%20the%20${activeModalHamper.name}%20Hamper%20(Min.%2030%20Qty)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 font-bold uppercase bg-white border-2 border-[#800000] text-[#800000] rounded hover:bg-[#800000] hover:text-white transition-all"
                >
                  Order this Hamper (Min. 30)
                </a>
              </div>
            </div>
          </div>
        );
      })()}
    </FlowArt>
  );
}
