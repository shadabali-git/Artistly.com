import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  StarFilled,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  ArrowLeftOutlined,
  MessageOutlined,
  HeartFilled,
} from "@ant-design/icons";
import artistsData from "@/data/artists.json"
import { BookingForm } from "@/components/booking-form"

interface ArtistPageProps {
  params: Promise<{ id: string }>
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { id } = await params
  const artist = artistsData.find((a) => a.id === id)

  if (!artist) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button asChild variant="ghost" className="mb-2">
            <Link href="/artists">
              <ArrowLeftOutlined className="h-4 w-4 mr-2" />
              Back to Artists
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Artist Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-48 relative rounded-lg overflow-hidden">
                    <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{artist.name}</h1>
                        <p className="text-xl text-purple-600 font-medium mb-2">{artist.type}</p>
                        <div className="flex items-center text-gray-600 mb-2">
                          <EnvironmentOutlined className="h-4 w-4 mr-1" />
                          <span>{artist.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <HeartFilled className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <MessageOutlined className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-6">
                        <StarFilled className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                        <span className="font-semibold">{artist.rating}</span>
                        <span className="text-gray-600 ml-1">({artist.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <DollarOutlined className="h-5 w-5 text-green-600 mr-1" />
                        <span className="font-semibold text-green-600">${artist.hourlyRate}/hour</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {artist.genres.map((genre) => (
                        <Badge key={genre} variant="secondary">
                          {genre}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center text-gray-600">
                      <ClockCircleOutlined className="h-4 w-4 mr-1" />
                      <span>{artist.availability}</span>
                      <span className="mx-2">•</span>
                      <TeamOutlined className="h-4 w-4 mr-1" />
                      <span>{artist.experience} experience</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{artist.description}</p>
              </CardContent>
            </Card>

            {/* Equipment */}
            <Card>
              <CardHeader>
                <CardTitle>Equipment & Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {artist.equipment.map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {artist.portfolio.map((image, index) => (
                    <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Portfolio ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews ({artist.reviewCount})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      rating: 5,
                      comment:
                        "Absolutely incredible performance! Luna's voice was mesmerizing and she had the entire audience captivated.",
                      date: "2 weeks ago",
                    },
                    {
                      name: "Michael Chen",
                      rating: 5,
                      comment: "Professional, punctual, and talented. Made our corporate event truly memorable.",
                      date: "1 month ago",
                    },
                    {
                      name: "Emma Rodriguez",
                      rating: 4,
                      comment: "Great performance, would definitely book again for future events.",
                      date: "2 months ago",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-purple-600">
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <StarFilled key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Form */}
            <BookingForm artist={artist} />

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium">Within 2 hours</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Rate</span>
                  <span className="font-medium">95%</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Repeat Clients</span>
                  <span className="font-medium">78%</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">On-Time Rate</span>
                  <span className="font-medium">100%</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Artists */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Artists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {artistsData
                    .filter((a) => a.id !== artist.id && a.genres.some((g) => artist.genres.includes(g)))
                    .slice(0, 3)
                    .map((similarArtist) => (
                      <Link key={similarArtist.id} href={`/artists/${similarArtist.id}`}>
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                            <Image
                              src={similarArtist.image || "/placeholder.svg"}
                              alt={similarArtist.name}
                              fill
                              className="object-cover" 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{similarArtist.name}</p>
                            <p className="text-sm text-gray-600 truncate">{similarArtist.type}</p>
                            <div className="flex items-center">
                              <StarFilled className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="ml-1 text-xs">{similarArtist.rating}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
