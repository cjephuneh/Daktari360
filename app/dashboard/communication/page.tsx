'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Search, Send, Phone, Video } from 'lucide-react'

const contacts = [
  { id: 1, name: "Alice Johnson", lastMessage: "Thank you for the session", time: "10:30 AM", unread: 2 },
  { id: 2, name: "Bob Smith", lastMessage: "Can we reschedule?", time: "Yesterday", unread: 0 },
  { id: 3, name: "Charlie Brown", lastMessage: "I'm feeling much better", time: "2 days ago", unread: 1 },
  { id: 4, name: "Diana Ross", lastMessage: "See you next week", time: "3 days ago", unread: 0 },
  { id: 5, name: "Ethan Hunt", lastMessage: "Thanks for your help", time: "1 week ago", unread: 0 },
]

const messages = [
  { id: 1, senderId: 1, text: "Hi Dr. Smith, I wanted to thank you for our session yesterday.", timestamp: "2024-07-14T10:30:00" },
  { id: 2, senderId: 0, text: "You're welcome, Alice. I'm glad you found it helpful. How are you feeling today?", timestamp: "2024-07-14T10:35:00" },
  { id: 3, senderId: 1, text: "I'm feeling much better. The techniques you taught me are really helping.", timestamp: "2024-07-14T10:40:00" },
  { id: 4, senderId: 0, text: "That's great to hear! Remember to practice them regularly. Let me know if you have any questions.", timestamp: "2024-07-14T10:45:00" },
  { id: 5, senderId: 1, text: "I will, thank you. See you next week!", timestamp: "2024-07-14T10:50:00" },
]

export default function Communication() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [newMessage, setNewMessage] = useState('')
  const [activeTab, setActiveTab] = useState('whatsapp')

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Communication</h1>
      <div className="flex-grow flex overflow-hidden">
        <Card className="w-1/3 mr-4 flex flex-col">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <ScrollArea className="h-[500px]">
              {filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${selectedContact.id === contact.id ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${contact.name[0]}`} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="text-sm font-medium">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.lastMessage}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {contact.time}
                    {contact.unread > 0 && (
                      <Badge className="ml-2" variant="destructive">{contact.unread}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="flex-grow flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${selectedContact.name[0]}`} />
                  <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p>{selectedContact.name}</p>
                </div>
              </div>
              <div>
                <Button variant="outline" size="icon" className="mr-2">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                <TabsTrigger value="sms">SMS</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <ScrollArea className="h-[400px]">
              {messages.map(message => (
                <div key={message.id} className={`flex mb-4 ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-3 rounded-lg ${message.senderId === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                    <p>{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center space-x-2">
              <Textarea
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}