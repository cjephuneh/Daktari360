'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, MessageCircle, Video, FileText } from 'lucide-react'

const patients = [
  { id: 1, name: "Alice Johnson", age: 32, lastSession: "2024-07-10", nextSession: "2024-07-17", status: "Active" },
  { id: 2, name: "Bob Smith", age: 45, lastSession: "2024-07-08", nextSession: "2024-07-15", status: "Active" },
  { id: 3, name: "Charlie Brown", age: 28, lastSession: "2024-07-05", nextSession: "2024-07-19", status: "On Hold" },
  { id: 4, name: "Diana Ross", age: 39, lastSession: "2024-07-12", nextSession: "2024-07-26", status: "Active" },
  { id: 5, name: "Ethan Hunt", age: 50, lastSession: "2024-07-01", nextSession: "2024-07-22", status: "Inactive" },
]

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddPatientDialogOpen, setIsAddPatientDialogOpen] = useState(false)

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Management</h1>
        <Dialog open={isAddPatientDialogOpen} onOpenChange={setIsAddPatientDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter the details of the new patient</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">Age</Label>
                <Input id="age" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Input id="status" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsAddPatientDialogOpen(false)}>Add Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
          <CardDescription>Manage and view all your patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="flex-grow relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Last Session</TableHead>
                <TableHead>Next Session</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.lastSession}</TableCell>
                  <TableCell>{patient.nextSession}</TableCell>
                  <TableCell>
                    <Badge variant={patient.status === 'Active' ? 'default' : (patient.status === 'On Hold' ? 'secondary' : 'outline')}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}