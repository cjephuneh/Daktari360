import Header from "@/components/landing/navbar"
import Hero from "@/components/landing/Hero"
import Features from "@/components/landing/features"
import HowItWorks from "@/components/landing/HowItWorks"
import Testimonials from "@/components/landing/testimony" 
import CTA from "@/components/landing/cta"
import Footer from "@/components/landing/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

