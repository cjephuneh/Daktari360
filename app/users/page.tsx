import Header from "@/components/users/Header"
import Footer from "@/components/doctors/footer"
import UserHero from "@/components/users/Hero"
import UserFeatures from "@/components/users/UserFeatures"
import UserHowItWorks from "@/components/users/UserHowItWorks"
import UserTestimonials from "@/components/users/UserTestimonials"
import UserCTA from "@/components/users/UserCTA"

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-teal-50">
      <Header />
      <main>
        <UserHero />
        <UserFeatures />
        <UserHowItWorks />
        <UserTestimonials />
        <UserCTA />
      </main>
      <Footer />
    </div>
  )
}

