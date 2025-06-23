"use client"

import { useState, useMemo ,useEffect} from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  StarFilled,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import artistsData from "@/data/artists.json"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export default function ArtistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
   const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
  
   // Get unique genres and locations for filters
  const genres = useMemo(() => {
    const allGenres = artistsData.flatMap((artist) => artist.genres)
    return [...new Set(allGenres)]
  }, [])

  const locations = useMemo(() => {
    return [...new Set(artistsData.map((artist) => artist.location.split(",")[1]?.trim() || artist.location))]
  }, [])

  // Filter artists based on search and filters
  const filteredArtists = useMemo(() => {
    return artistsData.filter((artist) => {
      const matchesSearch =
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.genres.some((genre) => genre.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesGenre = selectedGenre === "all" || artist.genres.includes(selectedGenre)

      const matchesLocation = selectedLocation === "all" || artist.location.includes(selectedLocation)

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "low" && artist.hourlyRate < 600) ||
        (priceRange === "medium" && artist.hourlyRate >= 600 && artist.hourlyRate < 1000) ||
        (priceRange === "high" && artist.hourlyRate >= 1000)

      return matchesSearch && matchesGenre && matchesLocation && matchesPrice
    })
  }, [searchTerm, selectedGenre, selectedLocation, priceRange])

   useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/auth');
      }
    }, [isAuthenticated, isLoading, router]);
  
    if (isLoading) {
      return <p className="text-center mt-10">Checking auth...</p>;
    }
  
    if (!isAuthenticated) {
      return null; // Already redirected
    }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Artists</h1>
          <p className="text-gray-600">Discover talented performers for your next event</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search artists, genres, or instruments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under $600/hr</SelectItem>
                <SelectItem value="medium">$600-$1000/hr</SelectItem>
                <SelectItem value="high">$1000+/hr</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredArtists.length} artist{filteredArtists.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-900">${artist.hourlyRate}/hr</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{artist.name}</h3>
                  <div className="flex items-center">
                    <StarFilled className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">{artist.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({artist.reviewCount})</span>
                  </div>
                </div>

                <p className="text-purple-600 font-medium mb-2">{artist.type}</p>

                <div className="flex items-center text-gray-600 mb-2">
                  <EnvironmentOutlined className="h-4 w-4 mr-1" />
                  <span className="text-sm">{artist.location}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <ClockCircleOutlined className="h-4 w-4 mr-1" />
                  <span className="text-sm">{artist.availability}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {artist.genres.slice(0, 3).map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{artist.description}</p>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/artists/${artist.id}`}>View Profile</Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <DollarOutlined className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <FilterOutlined  className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
