"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote: "Daktari360 has been a lifesaver. I was able to get medical advice quickly without leaving my home.",
  },
  {
    name: "Dr. Michael Lee",
    role: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    quote: "As a doctor, I appreciate how Daktari360 allows me to reach more patients and provide timely care.",
  },
  {
    name: "Emily Rodriguez",
    role: "Working Mom",
    image:
      "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    quote:
      "The convenience of Daktari360 is unmatched. I can consult with doctors for my family without disrupting our busy schedule.",
  },
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">What our users say</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-xl rounded-lg overflow-hidden"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                  />
                  <div className="ml-4">
                    <div className="text-lg font-medium text-gray-900">{testimonials[currentIndex].name}</div>
                    <div className="text-base font-medium text-gray-500">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
                <p className="mt-4 text-lg text-gray-500">"{testimonials[currentIndex].quote}"</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-1/2 transform -translate-y-1/2 left-0 -ml-4">
            <button
              onClick={prevTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 -mr-4">
            <button
              onClick={nextTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials

