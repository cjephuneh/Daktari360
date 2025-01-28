"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart } from "lucide-react"

const UserHero = () => {
  return (
    <div className="relative overflow-hidden bg-teal-900 py-20 sm:py-32 ">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
          alt="Doctor consulting with patient"
          className="h-full w-full object-cover opacity-20"
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center lg:justify-start">
              <Heart className="h-8 w-8 text-teal-400" />
              <h2 className="ml-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Your Health, Our Priority
              </h2>
            </div>
            <p className="mt-3 text-base text-teal-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Access quality healthcare anytime, anywhere. Connect with certified African doctors and take control of
              your health journey with Daktari360.
            </p>
            <div className="mt-8 sm:mt-12">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="relative mt-12 sm:mt-16 lg:col-span-6 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <img
                className="w-full rounded-lg"
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Patient using Daktari360 app"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default UserHero

