import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PenTool, BookOpen, Settings } from "lucide-react"

export default function HomePage() {
  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Blog Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create, manage, and publish beautiful blog posts with our rich text editor and SEO-friendly features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="h-5 w-5 text-blue-600" />
                Create Posts
              </CardTitle>
              <CardDescription>Write and publish blog posts with our rich text editor</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/create">
                <Button className="w-full">Start Writing</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                View Posts
              </CardTitle>
              <CardDescription>Browse and read all published blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/posts">
                <Button variant="outline" className="w-full bg-transparent">
                  Browse Posts
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-600" />
                Manage
              </CardTitle>
              <CardDescription>Admin dashboard to manage all your content</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button variant="secondary" className="w-full">
                  Admin Panel
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
