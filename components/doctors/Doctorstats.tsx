"use client"

import { motion } from "framer-motion"
import { Users, Clock, Globe } from "lucide-react"

const stats = [
  { name: "Patients Reached", value: "100,000+", icon: Users },
  { name: "Available 24/7", value: "365 days", icon: Clock },
  { name: "Countries Served", value: "20+", icon: Globe },
]

const DoctorStats = () => {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by doctors across Africa
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Join a growing community of healthcare professionals making a difference
          </p>
        </div>
      </div>
      <div className="mt-10 bg-white pb-12 sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-50" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.name}
                    className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">{stat.name}</dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                      <div className="flex items-center justify-center">
                        <stat.icon className="h-8 w-8 mr-2" />
                        {stat.value}
                      </div>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorStats

