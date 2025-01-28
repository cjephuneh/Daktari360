"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Stethoscope } from "lucide-react"

const DoctorHero = () => {
  return (
    <div className="relative overflow-hidden bg-indigo-900 py-20 sm:py-32">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
          alt="Doctor using digital tablet"
          className="h-full w-full object-cover opacity-20"
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center lg:justify-start">
              <Stethoscope className="h-8 w-8 text-indigo-400" />
              <h2 className="ml-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Daktari360 for Doctors
              </h2>
            </div>
            <p className="mt-3 text-base text-indigo-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Expand your practice, reach more patients, and revolutionize healthcare delivery across Africa with our
              cutting-edge telemedicine platform.
            </p>
            <div className="mt-8 sm:mt-12">
              <Button size="lg" className="group">
                Join Daktari360
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
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white text-indigo-600 hover:bg-indigo-50"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Button>
              <img
                className="w-full rounded-lg"
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Doctor using Daktari360 platform"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DoctorHero

