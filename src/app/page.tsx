import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarFilled, CalendarOutlined,SafetyOutlined,SearchOutlined ,MessageOutlined } from "@ant-design/icons";

// import { Star, Calendar, Shield, Search, MessageSquare } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: SearchOutlined,
      title: "Discover Talent",
      description: "Browse through hundreds of verified performing artists across all genres and styles.",
    },
    {
      icon: CalendarOutlined,
      title: "Easy Booking",
      description: "Check availability and book artists directly through our streamlined platform.",
    },
    {
      icon: SafetyOutlined,
      title: "Secure Payments",
      description: "Protected transactions with escrow services and comprehensive insurance coverage.",
    },
    {
      icon: MessageOutlined,
      title: "Direct Communication",
      description: "Chat directly with artists and managers to discuss your event requirements.",
    },
  ]

  const stats = [
    { number: "10K+", label: "Artists" },
    { number: "50K+", label: "Events Booked" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white border-white/30">🎵 #1 Artist Booking Platform</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Book Amazing<span className="text-yellow-300"> Artists</span>
                <br />
                For Your Events
              </h1>
              <p className="text-xl mb-8 text-purple-100 leading-relaxed">
                Connect with talented performing artists worldwide. From intimate acoustic sets to grand orchestras,
                find the perfect entertainment for any occasion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                  <Link href="/artists">Browse Artists</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-purple-700"
                >
                  <Link href="/dashboard">Artist Dashboard</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Artists performing"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <StarFilled className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-gray-600">from 10K+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Artistly?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make it simple to find, book, and manage performing artists for any event, with tools designed for both
              event planners and artists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Artists</h2>
            <p className="text-xl text-gray-600">Discover some of our most popular and highly-rated performers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Luna Martinez",
                type: "Singer-Songwriter",
                rating: 4.9,
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "The Midnight Collective",
                type: "Jazz Band",
                rating: 4.8,
                image: "/placeholder.svg?height=300&width=300",
              },
              { name: "DJ Phoenix", type: "DJ/Producer", rating: 4.7, image: "/placeholder.svg?height=300&width=300" },
            ].map((artist, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{artist.name}</h3>
                  <p className="text-gray-600 mb-2">{artist.type}</p>
                  <div className="flex items-center">
                    <StarFilled className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">{artist.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/artists">View All Artists</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Book Your Next Event?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of event planners who trust Artistly to find the perfect entertainment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/artists">Start Browsing</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              <Link href="#contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
