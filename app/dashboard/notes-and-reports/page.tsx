'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, FileText, Download } from 'lucide-react'


const recentNotes = [
  { id: 1, patient: "Alice Johnson", date: "2024-07-14", type: "Session Notes" },
  { id: 2, patient: "Bob Smith", date: "2024-07-13", type: "Progress Report" },
  { id: 3, patient: "Charlie Brown", date: "2024-07-12", type: "Treatment Plan" },
  { id: 4, patient: "Diana Ross", date: "2024-07-11", type: "Session Notes" },
  { id: 5, patient: "Ethan Hunt", date: "2024-07-10", type: "Evaluation" },
]

export default function NotesAndReports() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('notes')

  const filteredNotes = recentNotes.filter(note => 
    note.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notes & Reports</h1>
        <Dialog open={isNewNoteDialogOpen} onOpenChange={setIsNewNoteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] w-full">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
              <DialogDescription>Add a new note or report for a patient</DialogDescription>
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
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select note type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="session">Session Notes</SelectItem>
                    <SelectItem value="progress">Progress Report</SelectItem>
                    <SelectItem value="treatment">Treatment Plan</SelectItem>
                    <SelectItem value="evaluation">Evaluation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">Notes</Label>
                <Textarea id="notes" className="col-span-3" rows={10} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsNewNoteDialogOpen(false)}>Save Note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="notes">Session Notes</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notes</CardTitle>
              <CardDescription>View and manage your recent session notes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notes..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotes.map((note) => (
                    <TableRow key={note.id}>
                      <TableCell className="font-medium">{note.patient}</TableCell>
                      <TableCell>{note.date}</TableCell>
                      <TableCell>{note.type}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">
                          <FileText className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Create and manage patient reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="report-type">Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="progress">Progress Report</SelectItem>
                        <SelectItem value="treatment">Treatment Summary</SelectItem>
                        <SelectItem value="evaluation">Psychological Evaluation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="report-patient">Patient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alice">Alice Johnson</SelectItem>
                        <SelectItem value="bob">Bob Smith</SelectItem>
                        <SelectItem value="charlie">Charlie Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="report-period">Reporting Period</Label>
                  <div className="flex space-x-4">
                    <Input type="date" className="flex-grow" />
                    <span className="flex items-center">to</span>
                    <Input type="date" className="flex-grow" />
                  </div>
                </div>
                <Button>Generate Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Note Templates</CardTitle>
              <CardDescription>Manage your note and report templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Available Templates</h3>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    New Template
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Initial Assessment</TableCell>
                      <TableCell>Evaluation</TableCell>
                      <TableCell>2024-07-01</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Weekly Progress Note</TableCell>
                      <TableCell>Session Notes</TableCell>
                      <TableCell>2024-07-05</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Treatment Plan Review</TableCell>
                      <TableCell>Treatment Plan</TableCell>
                      <TableCell>2024-07-10</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


