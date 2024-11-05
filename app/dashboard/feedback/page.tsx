'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare } from 'lucide-react'

const initialComments = [
  {
    id: 1,
    author: 'John Doe',
    content: 'This app has really deepened my understanding of scripture. The interactions with biblical personas are incredibly insightful!',
    upvotes: 15,
    replies: 3,
  },
  {
    id: 2,
    author: 'Jane Smith',
    content: 'I love the virtual study rooms feature. It\'s like having a Bible study group available 24/7!',
    upvotes: 10,
    replies: 2,
  },
  {
    id: 3,
    author: 'Mike Johnson',
    content: 'The AI-generated artwork based on conversations is a unique touch. It really helps visualize the discussions.',
    upvotes: 8,
    replies: 1,
  },
]

export default function Feedback() {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')

  const handleUpvote = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, upvotes: comment.upvotes + 1 } : comment
    ))
  }

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        author: 'You',
        content: newComment,
        upvotes: 0,
        replies: 0,
      }
      setComments([newCommentObj, ...comments])
      setNewComment('')
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Feedback</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Share Your Thoughts</CardTitle>
          <CardDescription>We value your feedback on Therabot Help us give you a better experince </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Type your feedback here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmitComment}>Submit Feedback</Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={comment.author} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <CardTitle className="text-lg">{comment.author}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{comment.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => handleUpvote(comment.id)}>
                <ThumbsUp className="mr-2 h-4 w-4" />
                {comment.upvotes} Upvotes
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                {comment.replies} Replies
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}