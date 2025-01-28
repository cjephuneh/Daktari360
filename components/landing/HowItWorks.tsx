"use client"

import { motion } from "framer-motion"
import { UserPlus, Video, Clipboard, Calendar } from "lucide-react"

const steps = [
  { name: "Sign Up", description: "Create your account in minutes", icon: UserPlus },
  { name: "Book a Consultation", description: "Choose a doctor and schedule your appointment", icon: Calendar },
  { name: "Video Call", description: "Connect with your doctor via secure video call", icon: Video },
  { name: "Get Your Prescription", description: "Receive your prescription digitally if needed", icon: Clipboard },
]

const HowItWorks = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple steps to better health
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Getting the care you need has never been easier. Follow these simple steps to start your journey with
            Daktari360.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex flex-wrap justify-center">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                className="m-4 p-6 bg-white rounded-lg shadow-lg max-w-xs"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900 text-center">{step.name}</h3>
                <p className="mt-2 text-base text-gray-500 text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks

