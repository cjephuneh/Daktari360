'use client'

import { useState } from 'react'
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

const upcomingSessions = [
  { id: 1, patient: "Alice Johnson", date: "2024-07-15", time: "10:00 AM", status: "Scheduled" },
  { id: 2, patient: "Bob Smith", date: "2024-07-16", time: "2:30 PM", status: "Confirmed" },
  { id: 3, patient: "Charlie Brown", date: "2024-07-17", time: "11:15 AM", status: "Waiting" },
  { id: 4, patient: "Diana Ross", date: "2024-07-18", time: "3:45 PM", status: "Scheduled" },
  { id: 5, patient: "Ethan Hunt", date: "2024-07-19", time: "9:30 AM", status: "Confirmed" },
]

export default function VideoConferencing() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isNewSessionDialogOpen, setIsNewSessionDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.patient}</TableCell>
                    <TableCell>{session.date}</TableCell>
                    <TableCell>{session.time}</TableCell>
                    <TableCell>
                      <Badge variant={session.status === 'Confirmed' ? 'default' : (session.status === 'Waiting' ? 'secondary' : 'outline')}>
                        {session.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Join
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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