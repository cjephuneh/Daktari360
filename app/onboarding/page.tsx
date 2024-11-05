'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { Loader2, Upload, CheckCircle } from 'lucide-react'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/Footer'


const steps = [
  { id: 'login', title: 'Login' },
  { id: 'personal-info', title: 'Personal Information' },
  { id: 'documents', title: 'Document Upload' },
  { id: 'verification', title: 'Verification' },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    specialization: '',
    license: null,
    certification: null,
    agreeTos: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Login to Your Account</CardTitle>
              <CardDescription>Enter your email and password to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="doctor@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
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
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Please provide your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Select name="specialization" onValueChange={(value) => handleInputChange({ target: { name: 'specialization', value } } as React.ChangeEvent<HTMLSelectElement>)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="psychiatry">Psychiatry</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="urology">Urology</SelectItem>
                    <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                    <SelectItem value="endocrinology">Endocrinology</SelectItem>
                    <SelectItem value="hematology">Hematology</SelectItem>
                    <SelectItem value="immunology">Immunology</SelectItem>
                    <SelectItem value="infectious diseases">Infectious Diseases</SelectItem>
                    <SelectItem value="nephrology">Nephrology</SelectItem>
                    
                  </SelectContent>
                </Select>
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
              <CardDescription>Please upload your medical license and board certification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="license">Medical License</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="license"
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'license')}
                    className="hidden"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="license" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload License
                    </label>
                  </Button>
                  {formData.license && <span className="text-sm text-muted-foreground">{formData.license.name}</span>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="certification">Board Certification</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="certification"
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'certification')}
                    className="hidden"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="certification" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Certification
                    </label>
                  </Button>
                  {formData.certification && <span className="text-sm text-muted-foreground">{(formData.certification as { name: string }).name}</span>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTos"
                  name="agreeTos"
                  checked={formData.agreeTos}
                  onCheckedChange={(checked: boolean) => handleInputChange({ target: { name: 'agreeTos', type: 'checkbox', checked } })}
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
              <Button type="submit" className="w-full" disabled={!formData.license || !formData.certification || !formData.agreeTos}>
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
              <Button variant="outline" onClick={() => window.location.href = '/'}>Return to Home</Button>
            </CardFooter>
          </Card>
        )
    }
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">

        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-black">Doctor Onboarding</h2>
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
        <AnimatePresence mode="wait">
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
        </AnimatePresence>
      </div>
    </div>
    <Footer />
    </>
  )
}