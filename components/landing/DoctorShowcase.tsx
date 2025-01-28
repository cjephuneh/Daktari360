"use client"

import { motion } from "framer-motion"

const doctors = [
  {
    name: "Dr. Amina Kimani",
    specialty: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Dr. Kwame Osei",
    specialty: "Pediatrician",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Dr. Zainab Ademola",
    specialty: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
]

const DoctorShowcase = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Meet Our Expert African Doctors</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img className="h-48 w-full object-cover" src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                <p className="mt-2 text-gray-600">{doctor.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorShowcase

