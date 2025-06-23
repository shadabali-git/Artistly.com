"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarOutlined} from "@ant-design/icons"

interface Artist {
  id: string
  name: string
  hourlyRate: number
}

interface BookingFormProps {
  artist: Artist
}

const BookingForm:React.FC<BookingFormProps>=({ artist }) =>{
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDate: "",
    eventTime: "",
    duration: "",
    venue: "",
    clientName: "",
    clientEmail: "",
    budget: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the booking request
    alert("Booking request sent! The artist will respond within 24 hours.")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const estimatedCost = formData.duration
    ? artist.hourlyRate * Number.parseInt(formData.duration.replace(" hours", ""))
    : 0

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarOutlined className="h-5 w-5 mr-2" />
          Book {artist.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="eventTitle">Event Title</Label>
            <Input
              id="eventTitle"
              placeholder="e.g., Wedding Reception"
              value={formData.eventTitle}
              onChange={(e) => handleChange("eventTitle", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventDate">Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={(e) => handleChange("eventDate", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="eventTime">Time</Label>
              <Input
                id="eventTime"
                type="time"
                value={formData.eventTime}
                onChange={(e) => handleChange("eventTime", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="duration">Duration</Label>
            <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 hour">1 hour</SelectItem>
                <SelectItem value="2 hours">2 hours</SelectItem>
                <SelectItem value="3 hours">3 hours</SelectItem>
                <SelectItem value="4 hours">4 hours</SelectItem>
                <SelectItem value="5 hours">5 hours</SelectItem>
                <SelectItem value="6 hours">6+ hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="venue">Venue</Label>
            <Input
              id="venue"
              placeholder="Event location"
              value={formData.venue}
              onChange={(e) => handleChange("venue", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="clientName">Your Name</Label>
            <Input
              id="clientName"
              placeholder="Full name"
              value={formData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              type="email"
              placeholder="your@email.com"
              value={formData.clientEmail}
              onChange={(e) => handleChange("clientEmail", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              placeholder="e.g., $2,000"
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any special requirements or details..."
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          {estimatedCost > 0 && (
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Estimated Cost:</span>
                <span className="text-lg font-bold text-purple-600">${estimatedCost.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Based on ${artist.hourlyRate}/hour × {formData.duration}
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg">
            Send Booking Request
          </Button>

          <p className="text-xs text-gray-600 text-center">Free to send • Artist responds within 24 hours</p>
        </form>
      </CardContent>
    </Card>
  )
}
export default BookingForm
