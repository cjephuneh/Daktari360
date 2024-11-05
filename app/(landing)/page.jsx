'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MessageCircleIcon, PhoneIcon, ShieldCheckIcon, UserIcon, VideoIcon, MenuIcon, XIcon, CheckCircleIcon, StarIcon, SearchIcon, HeartPulseIcon, BrainIcon, EyeIcon, LungsIcon } from 'lucide-react'

const MotionLink = motion(Link)

const specialties = [
  { name: "Cardiology", icon: HeartPulseIcon },
  { name: "Neurology", icon: BrainIcon },
  { name: "Ophthalmology", icon: EyeIcon },
  { name: "Pulmonology", icon: LungsIcon },
  { name: "Dermatology", icon: UserIcon },
  { name: "Psychiatry", icon: MessageCircleIcon },
  { name: "Pediatrics", icon: UserIcon },
  { name: "Orthopedics", icon: UserIcon },
]

const doctors = [
  { name: "Dr. Emily Chen", specialty: "Cardiology", rating: 4.9, image: "/placeholder.svg?height=400&width=400", availability: "Available Now" },
  { name: "Dr. Michael Johnson", specialty: "Neurology", rating: 4.8, image: "/placeholder.svg?height=400&width=400", availability: "Next Available: 2 PM" },
  { name: "Dr. Sarah Thompson", specialty: "Ophthalmology", rating: 4.7, image: "/placeholder.svg?height=400&width=400", availability: "Available Now" },
  { name: "Dr. David Lee", specialty: "Pulmonology", rating: 4.9, image: "/placeholder.svg?height=400&width=400", availability: "Next Available: 3:30 PM" },
  { name: "Dr. Rachel Green", specialty: "Dermatology", rating: 4.8, image: "/placeholder.svg?height=400&width=400", availability: "Available Now" },
  { name: "Dr. James Wilson", specialty: "Psychiatry", rating: 4.7, image: "/placeholder.svg?height=400&width=400", availability: "Next Available: Tomorrow" },
]

const ParallaxText = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  )
}

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSpecialty, setActiveSpecialty] = useState("All")
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const navItems = ['How It Works', 'Specialties', 'Doctors', 'Testimonials', 'FAQ', 'Contact']

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="sticky top-0 z-50 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="relative w-10 h-10"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Image src="/placeholder.svg" alt="TeleMed Logo" layout="fill" className="rounded-full" />
            </motion.div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">TeleMed</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <MotionLink
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </MotionLink>
            ))}
          </nav>
          <div className="hidden md:flex space-x-4">
            <Button variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none">Log In</Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Sign Up</Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </Button>
        </div>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden flex flex-col items-center py-4 bg-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => (
              <MotionLink
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </MotionLink>
            ))}
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none">Log In</Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Sign Up</Button>
            </div>
          </motion.nav>
        )}
      </header>

      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)`,
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                className="md:w-1/2 mb-10 md:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h1
                  className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Your Health, Reimagined
                </motion.h1>
                <motion.p
                  className="text-xl mb-8 text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Experience cutting-edge telemedicine with TeleMed. Connect with top-rated specialists anytime, anywhere.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mr-4">
                    Start Your Journey
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                className="md:w-1/2 relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 rounded-full filter blur-3xl opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Telemedicine Illustration"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-2xl relative z-10"
                />
                <motion.div
                  className="absolute -bottom-10 -left-10 bg-white p-4 rounded-lg shadow-xl z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <p className="text-sm font-semibold">Active Doctors</p>
                  <p className="text-2xl font-bold text-blue-600">500+</p>
                </motion.div>
                <motion.div
                  className="absolute -top-10 -right-10 bg-white p-4 rounded-lg shadow-xl z-20"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <p className="text-sm font-semibold">Patient Satisfaction</p>
                  <p className="text-2xl font-bold text-purple-600">98%</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white overflow-hidden">
          <ParallaxText baseVelocity={-5}>Cardiology • Neurology • Ophthalmology • Pulmonology • Dermatology • Psychiatry • Pediatrics • Orthopedics</ParallaxText>
          <ParallaxText baseVelocity={5}>24/7 Care • Expert Doctors • Secure Consultations • Prescription Services • Follow-up Care • Health Records</ParallaxText>
        </section>

        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <motion.div
                className="absolute top-1/2 left-0 w-full h-1  bg-gradient-to-r from-blue-300 to-purple-300"
                style={{ scaleX }}
              />
              {[
                { icon: UserIcon, title: "Create Your Profile", description: "Sign up and fill in your medical history for personalized care." },
                { icon: SearchIcon, title: "Choose Your Specialist", description: "Browse our network of certified doctors and select your preferred expert." },
                { icon: VideoIcon, title: "Start Your Consultation", description: "Connect via high-quality video call and receive expert care instantly." },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-xl z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-full mb-6 inline-block">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="specialties" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Our Specialties</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {specialties.map((specialty, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer transition-all duration-300 hover:shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSpecialty(specialty.name)}
                >
                  <specialty.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-lg font-semibold">{specialty.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="doctors" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Meet Our Expert Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors
                .filter(doctor => activeSpecialty === "All" || doctor.specialty === activeSpecialty)
                .map((doctor, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-blue-100 to-purple-100 p-1 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="bg-white p-6 rounded-lg h-full">
                    <div className="relative mb-4">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={200}
                        height={200}
                        className="rounded-full mx-auto"
                      />
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {doctor.availability}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">{doctor.name}</h3>
                    <p className="text-gray-600 text-center mb-2">{doctor.specialty}</p>
                    <div className="flex items-center justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`h-5 w-5 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-2 text-gray-600">{doctor.rating}</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">Book Appointment</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">What Our Patients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Sarah L.", quote: "TeleMed has been a lifesaver. I got expert medical advice without leaving my home!", rating: 5 },
                { name: "John D.", quote: "The doctors are incredibly knowledgeable and caring. Best healthcare experience ever!", rating: 5 },
                { name: "Emma W.", quote: "Quick, efficient, and professional. TeleMed is the future of healthcare.", rating: 4 },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{testimonial.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Healthcare Experience?</h2>
            <p className="text-xl mb-8">Join thousands of satisfied patients and experience the future of medicine today.</p>
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
              Create Your Account
            </Button>
          </div>
        </section>

        <section id="faq" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Frequently Asked Questions</h2>
            <Tabs defaultValue="general" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="general" className="text-lg">General</TabsTrigger>
                <TabsTrigger value="appointments" className="text-lg">Appointments</TabsTrigger>
                <TabsTrigger value="billing" className="text-lg">Billing</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {[
                        { q: "What is TeleMed?", a: "TeleMed is a cutting-edge telemedicine platform that connects patients with licensed healthcare providers for virtual consultations, offering a wide range of medical services remotely." },
                        { q: "Is TeleMed available 24/7?", a: "Yes, TeleMed offers round-the-clock access to healthcare professionals for urgent care needs. For specialized services, availability may vary based on the doctor's schedule." },
                      ].map((item, index) => (
                        <div key={index}>
                          <h3 className="font-semibold mb-2">{item.q}</h3>
                          <p className="text-gray-600">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="appointments">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {[
                        { q: "How do I schedule an appointment?", a: "You can easily schedule an appointment through our website or mobile app. Simply choose your preferred doctor, select an available time slot, and confirm your booking." },
                        { q: "Can I choose my own doctor?", a: "You can browse our network of qualified doctors, view their profiles and specialties, and select the one that best fits your needs." },
                      ].map((item, index) => (
                        <div key={index}>
                          <h3 className="font-semibold mb-2">{item.q}</h3>
                          <p className="text-gray-600">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="billing">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {[
                        { q: "How much does a TeleMed consultation cost?", a: "The cost varies depending on the type of consultation and your insurance coverage. We offer competitive rates for both insured and self-pay patients. You'll always know the cost upfront before your appointment." },
                        { q: "Does TeleMed accept insurance?", a: "Yes, TeleMed accepts many major insurance plans. We also offer affordable self-pay options for those without insurance coverage. Check our website or contact our support team for a list of accepted insurance providers." },
                      ].map((item, index) => (
                        <div key={index}>
                          <h3 className="font-semibold mb-2">{item.q}</h3>
                          <p className="text-gray-600">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Get in Touch</h2>
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input placeholder="First Name" className="bg-white" />
                      <Input placeholder="Last Name" className="bg-white" />
                    </div>
                    <Input type="email" placeholder="Email Address" className="bg-white" />
                    <Input placeholder="Subject" className="bg-white" />
                    <textarea
                      className="w-full p-3 border rounded-md bg-white"
                      rows={4}
                      placeholder="Your Message"
                    ></textarea>
                    <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About TeleMed</h3>
              <p className="text-gray-400">Revolutionizing healthcare through innovative telemedicine solutions. Experience the future of medical consultations.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['How It Works', 'Specialties', 'Doctors', 'FAQ'].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                  <Link key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">{social}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 TeleMed. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}