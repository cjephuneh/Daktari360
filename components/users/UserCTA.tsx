"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const UserCTA = () => {
  return (
    <div className="bg-teal-700">
      <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to take control of your health?</span>
          <span className="block">Join Daktari360 today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-teal-200">
          Get instant access to doctors, manage your prescriptions, and take charge of your health journey.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="lg" className="mt-8 group" variant="secondary">
            Sign Up Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default UserCTA

