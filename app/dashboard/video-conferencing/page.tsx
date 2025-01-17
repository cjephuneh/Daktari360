/* eslint-disable react/no-unescaped-entities */


'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Video, Plus, Link, Copy } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Appointment {
  id: number
  patient_id: number
  date: string
  time: string
  status: string
  meet_link: string
  doctor_first_name: string
}

export default function VideoConferencing() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isNewSessionDialogOpen, setIsNewSessionDialogOpen] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('access_token')
        const response = await fetch('https://stallion-holy-informally.ngrok-free.app/api/v1.0/appointments/upcoming', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning': '1',
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch appointments')
        }

        const data = await response.json()
        setAppointments(data.appointments || [])
      } catch (error) {
        console.error('Error:', error)
        toast.error('Failed to load appointments', {
          position: "top-right",
          autoClose: 3000,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const handleCopyMeetLink = (meetLink: string) => {
    navigator.clipboard.writeText(meetLink)
    toast.success('Meet link copied to clipboard!', {
      position: "top-right",
      autoClose: 2000,
    })
  }

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Video Conferencing</h1>
        <Dialog open={isNewSessionDialogOpen} onOpenChange={setIsNewSessionDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Session</DialogTitle>
              <DialogDescription>Set up a new video conferencing session</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient" className="text-right">Patient</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alice">Alice Johnson</SelectItem>
                    <SelectItem value="bob">Bob Smith</SelectItem>
                    <SelectItem value="charlie">Charlie Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">Time</Label>
                <Input id="time" type="time" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">Duration</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsNewSessionDialogOpen(false)}>Schedule Session</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled video conferencing sessions</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading appointments...</div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <div className="mb-2">No upcoming sessions scheduled</div>
                <div className="text-sm">Click "New Session" to schedule a consultation</div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">Patient #{appointment.patient_id}</TableCell>
                      <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            appointment.status === 'confirmed' ? 'default' : 
                            appointment.status === 'pending' ? 'secondary' : 
                            'outline'
                          }
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(appointment.meet_link, '_blank')}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Join
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyMeetLink(appointment.meet_link)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and manage your session schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Google Meet Integration</CardTitle>
          <CardDescription>Manage your Google Meet settings and links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Personal Meeting Link</h3>
              <p className="text-sm text-muted-foreground">Your permanent Google Meet link</p>
            </div>
            <div className="flex items-center space-x-2">
              <Input value="https://meet.google.com/abc-defg-hij" readOnly className="w-64" />
              <Button variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <div className="flex space-x-4">
              <Button>
                <Video className="h-4 w-4 mr-2" />
                Start Instant Meeting
              </Button>
              <Button variant="outline">
                <Link className="h-4 w-4 mr-2" />
                Schedule in Google Calendar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Video Conferencing Tips</CardTitle>
          <CardDescription>Best practices for effective online therapy sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ensure a stable internet connection before starting the session</li>
            <li>Use headphones to improve audio quality and maintain privacy</li>
            <li>Position your camera at eye level for better eye contact</li>
            <li>Have a backup plan (e.g., phone number) in case of technical issues</li>
            <li>Remind patients to find a private, quiet space for their session</li>
            <li>Be familiar with screen sharing and other Google Meet features</li>
            <li>Have relevant patient notes and resources easily accessible</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}