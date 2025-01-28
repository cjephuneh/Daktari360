"use client"

import { motion } from "framer-motion"
import { Video, Calendar, MessageCircle, Pill, UserPlus, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    name: "Video Consultations",
    description: "Connect with doctors face-to-face from the comfort of your home.",
    icon: Video,
  },
  {
    name: "Easy Scheduling",
    description: "Book appointments at your convenience, 24/7.",
    icon: Calendar,
  },
  {
    name: "Secure Messaging",
    description: "Communicate with your healthcare providers securely.",
    icon: MessageCircle,
  },
  {
    name: "Prescription Management",
    description: "Manage and refill your prescriptions with ease.",
    icon: Pill,
  },
  {
    name: "Find Specialists",
    description: "Easily find and connect with specialists across various fields.",
    icon: UserPlus,
  },
  {
    name: "Medical Records",
    description: "Access your medical history and test results anytime.",
    icon: FileText,
  },
]

const UserFeatures = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Features designed for your health needs
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Daktari360 offers a range of features to make healthcare accessible and convenient for you.
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
                    <feature.icon className="h-6 w-6 text-teal-600 mr-2" />
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

export default UserFeatures

