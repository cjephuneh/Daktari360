
/* eslint-disable-next-line react/no-unescaped-entities */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { BarChart, Users, MessageCircle, Video, FileText } from 'lucide-react'

const upcomingSessions = [
  { id: 1, patient: "Alice Johnson", time: "10:00 AM", date: "2024-07-15", type: "Video" },
  { id: 2, patient: "Bob Smith", time: "2:30 PM", date: "2024-07-15", type: "In-person" },
  { id: 3, patient: "Charlie Brown", time: "11:15 AM", date: "2024-07-16", type: "Video" },
]

const recentMessages = [
  { id: 1, patient: "Diana Ross", message: "Thank you for the session yesterday...", time: "2 hours ago" },
  { id: 2, patient: "Ethan Hunt", message: "Can we reschedule our next appointment?", time: "1 day ago" },
  { id: 3, patient: "Fiona Apple", message: "I've been feeling much better since...", time: "2 days ago" },
]

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">MediCare Dashboard</h1>
        <Button>New Session</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+4 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">6 video, 18 in-person</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">5 WhatsApp, 4 SMS</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Due</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Due within 3 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your schedule for the next 48 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingSessions.map((session) => (
                <li key={session.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${session.patient[0]}`} />
                      <AvatarFallback>{session.patient[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{session.patient}</p>
                      <p className="text-xs text-muted-foreground">{session.date} at {session.time}</p>
                    </div>
                  </div>
                  <Badge variant={session.type === 'Video' ? 'default' : 'secondary'}>{session.type}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Latest patient communications</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentMessages.map((message) => (
                <li key={message.id} className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${message.patient[0]}`} />
                    <AvatarFallback>{message.patient[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{message.patient}</p>
                    <p className="text-xs text-muted-foreground">{message.message}</p>
                    <p className="text-xs text-muted-foreground">{message.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Your upcoming schedule</CardDescription>
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
        <Card>
          <CardHeader>
            <CardTitle>Patient Progress</CardTitle>
            <CardDescription>Overall improvement trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              <BarChart className="h-16 w-16" />
              <span className="ml-4">Patient progress chart would be displayed here</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}