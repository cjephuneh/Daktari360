"use client"

import { motion } from "framer-motion"
import { UserPlus, Video, Clipboard, Pill } from "lucide-react"

const steps = [
  { name: "Sign Up", description: "Create your Daktari360 account in minutes", icon: UserPlus },
  { name: "Book Consultation", description: "Choose a doctor and schedule your appointment", icon: Video },
  { name: "Receive Diagnosis", description: "Get professional medical advice and diagnosis", icon: Clipboard },
  { name: "Get Treatment", description: "Receive prescriptions and treatment plans digitally", icon: Pill },
]

const UserHowItWorks = () => {
  return (
    <div className="bg-gradient-to-b from-white to-teal-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How It Works</h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Get the care you need in four simple steps
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-teal-500 text-white">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-2 text-lg font-medium leading-6 text-gray-900">{step.name}</p>
                <p className="mt-2 text-base text-gray-500">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="absolute top-6 right-0 hidden h-0.5 w-full transform bg-teal-300 md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHowItWorks

