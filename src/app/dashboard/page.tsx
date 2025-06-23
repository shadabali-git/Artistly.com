"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  StarFilled,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import bookingsData from "@/data/bookings.json"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Bookings",
      value: "24",
      change: "+12%",
      icon: CalendarOutlined,
      color: "text-blue-600",
    },
    {
      title: "Revenue This Month",
      value: "$8,450",
      change: "+23%",
      icon: DollarOutlined,
      color: "text-green-600",
    },
    {
      title: "Active Artists",
      value: "12",
      change: "+2",
      icon: TeamOutlined,
      color: "text-purple-600",
    },
    {
      title: "Avg Rating",
      value: "4.8",
      change: "+0.2",
      icon: StarFilled,
      color: "text-yellow-600",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "declined":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircleOutlined className="h-4 w-4" />
      case "pending":
        return <ClockCircleOutlined className="h-4 w-4" />
      case "declined":
        return <CloseCircleOutlined className="h-4 w-4" />
      default:
        return <ExclamationCircleOutlined className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Artist Manager Dashboard</h1>
              <p className="text-gray-600">Manage your artists and bookings</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <SettingOutlined className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change} from last month</p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookingsData.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{booking.eventTitle}</p>
                          <p className="text-sm text-gray-600">{booking.artistName}</p>
                          <p className="text-sm text-gray-500">{booking.eventDate}</p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Artists</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Luna Martinez", bookings: 8, revenue: "$4,000", rating: 4.9 },
                      { name: "The Midnight Collective", bookings: 6, revenue: "$7,200", rating: 4.8 },
                      { name: "DJ Phoenix", bookings: 5, revenue: "$4,000", rating: 4.7 },
                    ].map((artist, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>
                              {artist.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{artist.name}</p>
                            <p className="text-sm text-gray-600">{artist.bookings} bookings</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">{artist.revenue}</p>
                          <div className="flex items-center">
                            <StarFilled className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm">{artist.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Booking Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingsData.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{booking.eventTitle}</h3>
                          <p className="text-gray-600">{booking.artistName}</p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <CalendarOutlined className="h-4 w-4 mr-2" />
                          <span>
                            {booking.eventDate} at {booking.eventTime}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <ClockCircleOutlined className="h-4 w-4 mr-2" />
                          <span>{booking.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarOutlined className="h-4 w-4 mr-2" />
                          <span>{booking.budget}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Venue: {booking.venue}</p>
                        <p className="text-sm text-gray-600 mb-1">Client: {booking.clientName}</p>
                        {booking.notes && <p className="text-sm text-gray-600">Notes: {booking.notes}</p>}
                      </div>

                      {booking.status === "pending" && (
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Accept
                          </Button>
                          <Button size="sm" variant="outline">
                            Decline
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageOutlined className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="artists" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Artists</h2>
              <Button>Add New Artist</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Luna Martinez", type: "Singer-Songwriter", status: "Active", bookings: 8, rating: 4.9 },
                { name: "The Midnight Collective", type: "Jazz Band", status: "Active", bookings: 6, rating: 4.8 },
                { name: "DJ Phoenix", type: "DJ/Producer", status: "Active", bookings: 5, rating: 4.7 },
                { name: "Sarah Chen", type: "Classical Pianist", status: "Inactive", bookings: 3, rating: 5.0 },
              ].map((artist, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" />
                        <AvatarFallback>
                          {artist.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Badge variant={artist.status === "Active" ? "default" : "secondary"}>{artist.status}</Badge>
                    </div>

                    <h3 className="font-semibold text-lg mb-1">{artist.name}</h3>
                    <p className="text-gray-600 mb-3">{artist.type}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Bookings:</span>
                        <span className="font-medium">{artist.bookings}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <StarFilled className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                          <span className="font-medium">{artist.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageOutlined className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <RiseOutlined className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Revenue chart would go here</p>
                      <p className="text-sm text-gray-500">Integration with charting library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { genre: "Singer-Songwriter", bookings: 12, percentage: 40 },
                      { genre: "Jazz Band", bookings: 8, percentage: 27 },
                      { genre: "DJ/Producer", bookings: 6, percentage: 20 },
                      { genre: "Classical", bookings: 4, percentage: 13 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{item.genre}</span>
                          <span className="text-gray-600">{item.bookings} bookings</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">95%</div>
                    <div className="text-sm text-gray-600">Booking Acceptance Rate</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">2.3h</div>
                    <div className="text-sm text-gray-600">Avg Response Time</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">78%</div>
                    <div className="text-sm text-gray-600">Client Retention Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
