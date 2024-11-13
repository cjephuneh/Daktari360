'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { Loader2, Upload, CheckCircle, PillIcon } from 'lucide-react'
// import Navbar from '@/components/ui/navbar'
// import Footer from '@/components/ui/Footer'

const steps = [
  { id: 'personal-info', title: 'Personal Information' },
  { id: 'pharmacy-info', title: 'Pharmacy Information' },
  { id: 'documents', title: 'Document Upload' },
  { id: 'verification', title: 'Verification' },
]

export default function PharmacistOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    pharmacyName: '',
    pharmacyAddress: '',
    pharmacyLicense: null,
    pharmacistLicense: null,
    agreeTos: false,
  })
  const router = useRouter()

  const handleInputChange = (e ) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData)
      toast({
        title: "Onboarding Complete",
        description: "Your information has been submitted for verification.",
      })
      // Redirect to dashboard after a delay
      setTimeout(() => router.push('/pharmacy/dashboard'), 2000)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Please provide your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Continue</Button>
            </CardFooter>
          </Card>
        )
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Pharmacy Information</CardTitle>
              <CardDescription>Tell us about your pharmacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pharmacyName">Pharmacy Name</Label>
                <Input
                  id="pharmacyName"
                  name="pharmacyName"
                  value={formData.pharmacyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pharmacyAddress">Pharmacy Address</Label>
                <Input
                  id="pharmacyAddress"
                  name="pharmacyAddress"
                  value={formData.pharmacyAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Continue</Button>
            </CardFooter>
          </Card>
        )
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>Please upload your pharmacy and pharmacist licenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pharmacyLicense">Pharmacy License</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="pharmacyLicense"
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'pharmacyLicense')}
                    className="hidden"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="pharmacyLicense" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Pharmacy License
                    </label>
                  </Button>
                  {formData.pharmacyLicense && <span className="text-sm text-muted-foreground">{formData.pharmacyLicense.name}</span>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pharmacistLicense">Pharmacist License</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="pharmacistLicense"
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'pharmacistLicense')}
                    className="hidden"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="pharmacistLicense" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Pharmacist License
                    </label>
                  </Button>
                  {formData.pharmacistLicense && <span className="text-sm text-muted-foreground">{formData.pharmacistLicense.name}</span>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTos"
                  name="agreeTos"
                  checked={formData.agreeTos}
                  onCheckedChange={(checked) => handleInputChange({ target: { name: 'agreeTos', type: 'checkbox', checked } })}
                />
                <label
                  htmlFor="agreeTos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms of service and privacy policy
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={!formData.pharmacyLicense || !formData.pharmacistLicense || !formData.agreeTos}>
                Submit for Verification
              </Button>
            </CardFooter>
          </Card>
        )
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Verification in Progress</CardTitle>
              <CardDescription>We're reviewing your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <p className="text-xl font-semibold">Thank you for submitting your information</p>
              <p className="text-muted-foreground">
                Our team is reviewing your documents. This process typically takes 1-3 business days.
                We'll notify you by email once your account is verified.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" onClick={() => router.push('/PhamarcyDashboard')}>Go to Dashboard</Button>
            </CardFooter>
          </Card>
        )
    }
  }

  return (
    <>
    {/* <Navbar /> */}
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 mt-14">
        <div className="text-center">
          <PillIcon className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-black">Pharmacist Onboarding</h2>
          <p className="mt-2 text-sm text-muted-foreground">Complete the following steps to set up your account</p>
        </div>
        <nav aria-label="Progress">
          <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {steps.map((step, index) => (
              <li key={step.id} className="md:flex-1">
                {index < currentStep ? (
                  <div className="flex items-center text-sm font-medium text-primary">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                      <CheckCircle className="h-4 w-4" />
                    </span>
                    <span className="ml-2">{step.title}</span>
                  </div>
                ) : index === currentStep ? (
                  <div className="flex items-center text-sm font-medium text-primary" aria-current="step">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary">
                      <span className="text-primary">{index + 1}</span>
                    </span>
                    <span className="ml-2">{step.title}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-sm font-medium text-muted-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300">
                      <span>{index + 1}</span>
                    </span>
                    <span className="ml-2">{step.title}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <motion.form
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
        >
          {renderStep()}
        </motion.form>
      </div>
    </div>
    {/* <Footer /> */}
    </>
  )
}