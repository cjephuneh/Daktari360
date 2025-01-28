import Header from '@/components/doctors/header'
import Footer from '@/components/doctors/footer'
import DoctorHero from '@/components/doctors/DoctorHero'
import DoctorFeatures from '@/components/doctors/DoctorFeatures'
import DoctorTestimonials from '@/components/doctors/DoctorTestimonials'
import DoctorCTA from '@/components/doctors/DoctorCTA'

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />
      <main>
        <DoctorHero />
        <DoctorFeatures />
        <DoctorTestimonials />
        <DoctorCTA />
      </main>
      <Footer />
    </div>
  )
}