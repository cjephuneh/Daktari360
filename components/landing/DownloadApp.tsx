"use client"

import { motion } from "framer-motion"

const DownloadApp = () => {
  return (
    <div id="download" className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Get our mobile app</h2>
            <p className="mt-4 text-lg text-gray-500">
              Download the Daktari360 app for easy access to healthcare on the go. Available now on Google Play Store.
            </p>
            <motion.div className="mt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 20.269v-9.941c0-.891 1.077-1.337 1.707-.707l5.683 5.685c.39.39.39 1.024 0 1.414l-5.683 5.685c-.63.63-1.707.184-1.707-.707zm10.284-4.121l7.416-4.284c.783-.452.783-1.575 0-2.027l-7.416-4.284c-.783-.452-1.763.075-1.763.947v8.986c0 .872.98 1.399 1.763.947z" />
                </svg>
                Download on Google Play
              </a>
            </motion.div>
          </div>
          <div className="mt-10 lg:mt-0 lg:ml-10">
            <motion.img
              className="mx-auto lg:mx-0 h-96 w-auto"
              src="/placeholder.svg?height=384&width=192"
              alt="Daktari360 mobile app"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadApp

