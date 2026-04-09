/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Facebook, Twitter, Youtube } from 'lucide-react';
import BookingForm from './components/BookingForm';

const heroSlides = [
  'https://www.tjztransports.com/wp-content/uploads/2025/10/cape-town-south-africa.jpg',
  'https://www.tjztransports.com/wp-content/uploads/2025/10/aerial-view-of-cape-town-south-africa-2023-11-27-05-00-33-utc-1.jpg',
  'https://www.tjztransports.com/wp-content/uploads/2025/10/GettyImages-104329693-5a27e55e980207003656238e.jpg',
  'https://www.tjztransports.com/wp-content/uploads/2025/10/hermanus.jpg',
];

const whyChooseUs = [
  {
    title: '24/7 Customer Support',
    description: "We're here for you anytime, day or night — ready to help whenever you need us.",
  },
  {
    title: 'Millions of reviews',
    description: 'Trusted by travelers worldwide—with millions of real reviews to guide your journey.',
  },
  {
    title: 'Plan your way',
    description: 'Enjoy flexible travel options tailored to you. Adventure, relaxation, or discovery—you choose, we deliver.',
  },
  {
    title: 'Best Price Guarantee',
    description: 'Book with confidence knowing you’re getting the best deal.',
  },
  {
    title: 'Unforgettable Experiences',
    description: 'Handpicked tours and activities designed to make every moment count.',
  },
];

const footerMenuLinks = [
  { label: 'Tours & Safari', href: 'https://tjztransports.com/tours-safari/' },
  { label: 'Destinations', href: 'https://tjztransports.com/destinations/' },
  { label: 'Transport', href: 'https://tjztransports.com/transport-solution/' },
  { label: 'About', href: 'https://tjztransports.com/about/' },
  { label: 'Terms', href: 'https://tjztransports.com/terms/' },
  { label: 'FAQ', href: 'https://tjztransports.com/faq/' },
  { label: 'Contact', href: 'https://tjztransports.com/contact/' },
];

const footerDestinationLinks = [
  { label: 'Nature', href: 'https://tjztransports.com/destinations/nature/' },
];

const footerSupportLinks = [
  { label: 'Help Center', href: '#' },
  { label: 'Help Center for Suppliers', href: '#' },
  { label: 'Terms & Conditions', href: 'https://tjztransports.com/terms-conditions-2/' },
  { label: 'Privacy Policy', href: '#' },
];

const featuredTours = [
  {
    title: '10 Days Luxury Honeymoon Safari Tour Across South Africa',
    image:
      'https://www.tjztransports.com/wp-content/uploads/elementor/thumbs/private-granite-suites_lr-rctg2n4hj6o62yz1lcvfhvy5vcwtzjbvrjzb1yk1ls.jpg',
    duration: '10 hours',
    price: 'From USD $6650.00',
  },
  {
    title: '5 Days Garden Route, Mosselbay, Knysna, Plettenberg Bay, Oudtshoorn, Route 6',
    image:
      'https://www.tjztransports.com/wp-content/uploads/elementor/thumbs/Mossel-Bay-Point-rctfhjmw51shi1m8s8kvj7lpw0w983krj4uzadu59c.jpg',
    duration: '5 hours',
    price: 'From USD $2450.00',
  },
  {
    title: 'VIP Day Experience in Cape Town : Hidden Gems & Diamond Shops',
    image:
      'https://www.tjztransports.com/wp-content/uploads/elementor/thumbs/beautiful-view-of-table-mountain-and-camps-bay-beach-in-cape-town-south-africa-rctez32zx6irhqfjkrbn2datwlvr23ajbrmozr7hgg.jpeg',
    duration: '10 hours',
    price: 'From USD $450.00',
  },
  {
    title: 'Full-Day Private Cape Town Helicopter and Winelands Stellenbosch Tour',
    image:
      'https://www.tjztransports.com/wp-content/uploads/elementor/thumbs/Hopper-helicopter-tour-cape-town-1-rcte2bfjo3nwr411x3eun4zce1e3py7ehkwbphskdc.jpg',
    duration: '8 hours',
    price: 'From USD $425.00',
  },
  {
    title: 'Full-Day Private Tour: Cape of Good Hope and Penguin Boulders Beach',
    image:
      'https://www.tjztransports.com/wp-content/uploads/2025/10/Cape-Town-City-Cape-Peninsula.webp',
    duration: '8 hours',
    price: 'From USD $166.00',
  },
  {
    title: 'Full-Day Cape Town Private Transfers and Chauffeur Services',
    image:
      'https://www.tjztransports.com/wp-content/uploads/2025/10/ChatGPT-Image-Oct-7-2025-01_03_28-PM.webp',
    duration: '10 hours',
    price: 'From USD $165.00',
  },
  {
    title: 'Full-Day Private: The Best of Cape Town in One Day Tour',
    image:
      'https://www.tjztransports.com/wp-content/uploads/2025/10/ChatGPT-Image-Oct-7-2025-12_57_54-PM.webp',
    duration: '10 hours',
    price: 'From USD $156.00',
  },
  {
    title: 'Full-Day Private Tour: Robben Island, City Tour, and Township Tour of Langa',
    image:
      'https://www.tjztransports.com/wp-content/uploads/2025/10/Tourists-on-a-guided-township-tour-in-Langa-Cape-Town-South-Africa.webp',
    duration: '4 hours',
    price: 'From USD $140.00',
  },
];

const destinationHighlights = [
  { name: 'City Tours', tours: '39 tours', image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/Cape-Town-City-Cape-Peninsula.webp' },
  { name: 'Cape Town', tours: '60 tours', image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/cape-town-south-africa.jpg' },
  { name: 'Safari', tours: '65 tours', image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/GettyImages-104329693-5a27e55e980207003656238e.jpg' },
  { name: 'Nature', tours: '30 tours', image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/hermanus.jpg' },
  { name: 'Location', tours: '79 tours', image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/146-1.jpg' },
  { name: 'Beaches Tours', image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/aerial-view-of-cape-town-south-africa-2023-11-27-05-00-33-utc-1.jpg' },
];

const interestTours = [
  {
    title: 'Full-Day Small Group Shared Tour: Table Mountain, Cape of Good Hope, Cape Point & Penguins Boulders Beach',
    image:
      'https://www.tjztransports.com/wp-content/uploads/elementor/thumbs/free-walking-tours-cape-town-480x320-1-rcq1jvgnggntvxuzds165xgna910amvvca0u4mg3ds.jpg',
    duration: '9 hours',
    price: 'From USD $65.00',
  },
  {
    title: 'Full-Day Private Tour: Cape Winelands to Stellenbosch and Franschhoek',
    image:
      'https://www.tjztransports.com/wp-content/uploads/elementor/thumbs/delaire-graff-estate-dylan-lewis-cheetah-sculpture-rctctighwebvc93zjq71sg0d0u88tcc0btf46o84yo.jpg',
    duration: '9 hours',
    price: 'From USD $105.00',
  },
  {
    title: 'Cape Town Township Half-Day Tour and District Six Museum',
    image:
      'https://www.tjztransports.com/wp-content/uploads/elementor/thumbs/District-Six-Museum_GettyImages-523958281-rctgng9uu55p46qv2up374wjbgcdeaxyajxajhp9uo.webp',
    duration: '4 hours',
    price: 'From USD $45.00',
  },
];

const services = [
  {
    number: '01',
    title: 'Group Tour Planning',
    description: 'From start to finish, we handle all the details so your group can simply enjoy the journey.',
    image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/ChatGPT-Image-Oct-7-2025-01_03_28-PM.webp',
  },
  {
    number: '02',
    title: 'Reliable Transport Solutions',
    description: 'Your journey matters. Count on us for punctual and professional transport.',
    image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/ChatGPT-Image-Oct-7-2025-12_57_54-PM.webp',
  },
  {
    number: '03',
    title: 'We Help You Find the Perfect Stay',
    description: 'From cozy rooms to luxury hotels — We help you find the perfect stay.',
    image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/ChatGPT-Image-Oct-7-2025-12_46_33-PM.webp',
  },
];

const testimonials = [
  {
    name: 'tresor milambo',
    time: '12:09 17 Oct 25',
    text: 'We visit so differences place the was good....',
    rating: '★★★★★',
  },
  {
    name: 'YANNICK WANDJA',
    time: '13:38 16 Oct 25',
    text:
      'That was the experience for year 2025. Robben Island and City tour. Visiting the former Nelson Mandela prison, also how South African rural area called: location looks like. I mean the beaty of african.',
    rating: '★★★★★',
  },
];

const journeyHighlights = [
  {
    kicker: 'Unforgettable Journeys',
    title: 'Explore Cape Town',
    image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/cape-town-south-africa.jpg',
  },
  {
    kicker: 'City Tours',
    title: 'Popular Destinations',
    image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/Cape-Town-City-Cape-Peninsula.webp',
  },
  {
    kicker: 'Unforgettable Journeys',
    title: 'Explore Beaches Tours',
    image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/aerial-view-of-cape-town-south-africa-2023-11-27-05-00-33-utc-1.jpg',
  },
  {
    kicker: 'Explore Nature',
    title: 'Cape Town Destinations',
    image: 'https://www.tjztransports.com/wp-content/uploads/2025/10/hermanus.jpg',
  },
];

const experienceStats = [
  { label: 'Happy Travelers', value: '2,500+' },
  { label: 'Dream Destinations', value: '120+' },
  { label: 'Years of Experience', value: '12+' },
  { label: 'Support & Guidance', value: '4.9/5' },
];

const galleryImages = [
  'https://www.tjztransports.com/wp-content/uploads/2025/06/g1.jpg',
  'https://www.tjztransports.com/wp-content/uploads/2025/06/g2.jpg',
  'https://www.tjztransports.com/wp-content/uploads/2025/06/g3.jpg',
  'https://www.tjztransports.com/wp-content/uploads/2025/06/g4.jpg',
  'https://www.tjztransports.com/wp-content/uploads/2025/06/g5.jpg',
  'https://www.tjztransports.com/wp-content/uploads/2025/06/g6.jpg',
];

const footerSocialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/tjztransports',
    icon: Facebook,
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/tjztransports',
    icon: Twitter,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@tjztransports',
    icon: Youtube,
  },
];

export default function HomePage() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="w-full bg-white text-[#1A1E39]">
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <img
            src="https://www.tjztransports.com/wp-content/uploads/elementor/thumbs/trans-logo-rd1vsuh5k0rys7m81qi2czw0foflmh2ddwv8uga318.png"
            alt="TJZ Transports Logo"
            className="h-11 w-auto"
          />
          <div className="hidden items-center gap-6 md:flex">
            <a href="#tours" className="text-sm font-medium hover:text-[#3166DB]">
              Destination
            </a>
            <a href="#services" className="text-sm font-medium hover:text-[#3166DB]">
              Services
            </a>
            <a href="#gallery" className="text-sm font-medium hover:text-[#3166DB]">
              Gallery
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-[#3166DB]">
              Contact
            </a>
          </div>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="rounded-full bg-[#3166DB] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#234fb0]"
          >
            Get Order
          </button>
        </div>
      </nav>

      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img
          src={heroSlides[currentHeroSlide]}
          alt="TJZ Transports hero"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F7DC58]">
            Get up to 20% off your first order
          </p>
          <h1 className="mb-4 max-w-5xl text-4xl font-extrabold md:text-6xl">Begin Your Adventure Today</h1>
          <p className="mb-8 max-w-3xl text-base md:text-xl">
            Discover the best Cape Town tour packages, carefully curated to deliver unforgettable experiences.
            Explore the city&apos;s highlights with ease, comfort, and style.
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="rounded-full bg-[#3166DB] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#234fb0]"
          >
            Explore Now
          </button>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/25 p-2 text-white hover:bg-white/40"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/25 p-2 text-white hover:bg-white/40"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentHeroSlide(i)}
              className={`h-2 w-2 rounded-full ${i === currentHeroSlide ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="bg-[#f5f7fb] px-4 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-5 text-3xl font-bold md:text-5xl">Cape Town Tour Packages for Every Budget</h2>
          <p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg">
            Discover the best of Cape Town with our expertly curated, top-rated tour packages. Whether you&apos;re
            seeking adventure, culture, or breathtaking scenery, we have something for everyone. Explore iconic
            landmarks like Table Mountain, Cape Point, and Boulders Beach with experienced guides.
          </p>
        </div>
      </section>

      <section className="bg-[#3166DB] px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Why Choose Us</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-xl border border-white/25 bg-white/10 p-5 text-center"
              >
                <p className="mb-2 font-semibold">{item.title}</p>
                <p className="text-sm text-white/90">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="tours" className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">Popular Destinations</h2>
          <p className="mb-10 text-center text-gray-600">Cape Town Destinations &amp; Beyond</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredTours.map((tour, index) => (
              <motion.article
                key={tour.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="relative h-56">
                  <img src={tour.image} alt={tour.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#1A1E39]">
                    {tour.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-3 text-sm font-semibold leading-6">{tour.title}</h3>
                  <p className="mt-3 text-sm font-bold text-[#3166DB]">{tour.price}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1A1E39] px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Unforgettable Journeys</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {journeyHighlights.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative h-64 overflow-hidden rounded-2xl"
              >
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/45 p-5" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#F7DC58]">{item.kicker}</p>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fc] px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <img
            src="https://www.tjztransports.com/wp-content/uploads/2025/10/Cape-Town-City-Cape-Peninsula.webp"
            alt="Cape Town Destinations and Beyond"
            className="h-[320px] w-full rounded-2xl object-cover md:h-[420px]"
          />
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#3166DB]">
              Cape Town Destinations &amp; Beyond
            </p>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Let us tailor your next luxury holiday destinations</h2>
            <ul className="mb-6 space-y-2 text-gray-700">
              <li>✓ Connect with nature</li>
              <li>✓ Experience other cultures</li>
              <li>✓ Create unforgettable memories</li>
            </ul>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="rounded-full bg-[#3166DB] px-7 py-3 font-semibold text-white transition hover:bg-[#234fb0]"
            >
              Explore Now
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">Based on your interest in Cape Town</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {interestTours.map((tour, index) => (
              <motion.article
                key={tour.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.09 }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <div className="relative">
                  <img src={tour.image} alt={tour.title} className="h-56 w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#1A1E39]">
                    {tour.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-3 text-sm font-semibold leading-6">{tour.title}</h3>
                  <p className="mt-3 text-sm font-bold text-[#3166DB]">{tour.price}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {destinationHighlights.map((item, index) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group relative h-44 overflow-hidden rounded-xl"
              >
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                  {item.tours && <p className="mt-1 text-xs text-white/90">{item.tours}</p>}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7DC58] px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#1A1E39]"
            >
              Plan with a local
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mb-4 text-3xl font-bold md:text-5xl"
            >
              Plan with a local Experience the real South Africa
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.45 }}
              className="mb-6 text-gray-800"
            >
              Let a local expert craft your dream trip.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.6 }}
              href="https://tjztransports.com/tour-list-5/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1A1E39] px-7 py-3 font-semibold text-[#F7DC58] transition hover:bg-[#0f1328]"
            >
              <ArrowUpRight className="h-4 w-4" />
              Get Started
            </motion.a>
          </div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            src="https://www.tjztransports.com/wp-content/uploads/2025/10/Cape-Town-City-Cape-Peninsula.webp"
            alt="Plan with a local"
            className="h-[320px] w-full rounded-2xl object-cover md:h-[420px]"
          />
        </div>
      </section>

      <section id="services" className="bg-[#1A1E39] px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Discover What We Provide</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group relative h-[420px] overflow-hidden rounded-2xl"
              >
                <img src={service.image} alt={service.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/45 p-6" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="mb-2 text-5xl font-black text-[#F7DC58]">{service.number}</p>
                  <h3 className="mb-2 text-2xl font-bold">{service.title}</h3>
                  <p className="text-sm text-white/95">{service.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
          <div className="mb-10 text-center text-gray-600">
            <p className="font-semibold text-[#1A1E39]">Tjztransports Travel &amp; Tours</p>
            <p className="mt-1 text-xl font-bold text-[#3166DB]">5.0</p>
            <p className="mt-1 text-sm">Based on 3 reviews • powered by Google</p>
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJWVpE9z9DzB0RaPOyjmGA7ok"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#3166DB] bg-white px-5 py-2 text-sm font-semibold text-[#3166DB] transition hover:bg-[#3166DB] hover:text-white"
            >
              <img
                src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png"
                alt="Google logo"
                className="h-5 w-5"
              />
              Review us on Google
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#3166DB]">{testimonial.name}</p>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">{testimonial.time}</p>
                <p className="mb-3 text-sm leading-6 text-gray-700">&quot;{testimonial.text}&quot;</p>
                <p className="text-sm text-[#F4B400]">{testimonial.rating}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fc] px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
            We’re here to take you to the places you&apos;ll love
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {experienceStats.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center"
              >
                <p className="text-sm font-medium text-gray-600">{item.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-[#3166DB]">{item.value}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#f5f7fb] px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Follow our journey on gallery</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <motion.img
                key={image}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                src={image}
                alt={`Gallery ${index + 1}`}
                className="h-56 w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="mb-3 text-2xl font-bold">Our Amazing Partner in Tech!</h2>
          <p className="text-gray-700">
            NEXTRiX Technologies delivers innovative IT solutions, specializing in web design, WordPress development, eCommerce, SEO, and digital marketing. They help businesses grow online with reliable, tailored services designed to meet modern digital needs.
          </p>
          <a
            href="https://nextrixtech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center"
          >
            <img
              src="https://nextrixtech.com/wp-content/uploads/2025/07/nextrixtech-logo.png"
              alt="NEXTRiX Technologies logo"
              className="h-16 w-auto rounded-lg border border-gray-200 bg-white p-2 shadow-sm"
            />
          </a>
        </div>
      </section>

      <section id="contact" className="bg-[#3166DB] px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">Contact</h2>
          <div className="mx-auto mb-8 max-w-3xl space-y-2 text-center">
            <p>7 Enchor Road, Diep River, South Africa | Cape Town.</p>
            <p>Tel : +(27) 73 799 7744 • bookings@tjztransports.com</p>
            <p>Monday - Friday : 08:00 - 22:00</p>
            <p>Saturday - Sunday : 07:00 - 21:00</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-center">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="rounded-full bg-white px-8 py-3 font-semibold text-[#3166DB] transition hover:bg-gray-100"
            >
              Get Order
            </button>
            <a
              href="https://api.whatsapp.com/send/?phone=27739879291"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=27611700945"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp 2
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#111827] text-gray-300">
        <div className="border-y border-white/10 px-4 py-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45 }}
            className="text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#F7DC58]"
          >
            Get Up to 20% Off Your First Order
          </motion.p>
        </div>

        <div className="px-4 py-12">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
              <p className="text-sm text-gray-300">7 Enchor Road, Diep River, South Africa | Cape Town.</p>
              <p className="mt-3 text-sm text-gray-300">Tel : +(27) 73 799 7744 bookings@tjztransports.com</p>
              <p className="mt-3 text-sm text-gray-300">Monday - Friday : 08:00 - 22:00</p>
              <p className="text-sm text-gray-300">Saturday - Sunday : 07:00 - 21:00</p>
              <a
                href="https://api.whatsapp.com/send/?phone=27611700945&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full border border-[#25d366] bg-[#25d366] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                WhatsApp
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-white">Menu</h3>
              <ul className="space-y-2 text-sm">
                {footerMenuLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-300 transition hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.16 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-white">Destination</h3>
              <ul className="space-y-2 text-sm">
                {footerDestinationLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-300 transition hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-3">
                {footerSocialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="rounded-full border border-gray-600 p-2 text-gray-200 transition hover:scale-105 hover:border-white hover:text-white"
                  >
                    <item.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.24 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-white">Support</h3>
              <ul className="space-y-2 text-sm">
                {footerSupportLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-300 transition hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-sm md:flex-row md:justify-between">
            <p>© 2025 Tjztransports Travel &amp; Tours . All Rights Reserved</p>
            <p>
              Developed by{' '}
              <a href="https://nextrixtech.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                NEXTRiX Technologies
              </a>
            </p>
            <a href="#" className="opacity-90 transition hover:opacity-100">
              <img
                src="https://tjztransports.com/wp-content/uploads/2025/05/bank.png"
                alt="Payment partners"
                className="h-5 w-auto"
              />
            </a>
          </div>
        </div>
      </footer>

      {isBookingOpen && <BookingForm onClose={() => setIsBookingOpen(false)} />}
    </div>
  );
}
