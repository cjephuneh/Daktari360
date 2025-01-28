"use client"

import { motion } from "framer-motion"
import { Calendar, Users, TrendingUp, Shield, VideoIcon, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    name: "Flexible Scheduling",
    description: "Manage your availability and appointments with ease.",
    icon: Calendar,
  },
  {
    name: "Expanded Patient Base",
    description: "Reach patients across Africa through our platform.",
    icon: Users,
  },
  {
    name: "Increased Revenue",
    description: "Grow your practice with our telemedicine solutions.",
    icon: TrendingUp,
  },
  {
    name: "Secure Platform",
    description: "Conduct consultations on our HIPAA-compliant platform.",
    icon: Shield,
  },
  {
    name: "Video Consultations",
    description: "Provide face-to-face care from anywhere.",
    icon: VideoIcon,
  },
  {
    name: "Instant Messaging",
    description: "Communicate efficiently with patients and colleagues.",
    icon: MessageSquare,
  },
]

const DoctorFeatures = () => {
  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to grow your practice
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Daktari360 provides you with cutting-edge tools to revolutionize your healthcare delivery
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <feature.icon className="h-6 w-6 text-indigo-600 mr-2" />
                    {feature.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorFeatures

