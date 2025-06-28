import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, FileText, Eye, Edit } from "lucide-react"

async function getPostsCount() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      cache: "no-store",
    })
    if (response.ok) {
      const posts = await response.json()
      return posts.length
    }
  } catch (error) {
    console.error("Error fetching posts count:", error)
  }
  return 0
}

export default async function AdminDashboard() {
  const postsCount = await getPostsCount()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">Manage your blog posts and content from here.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postsCount}</div>
            <p className="text-xs text-muted-foreground">Published blog posts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Create New Post
            </CardTitle>
            <CardDescription>Write a new blog post with rich text editor</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/create">
              <Button className="w-full">Create Post</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Manage Posts
            </CardTitle>
            <CardDescription>Edit, update, or delete existing posts</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/posts">
              <Button variant="outline" className="w-full bg-transparent">
                Manage Posts
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              View Blog
            </CardTitle>
            <CardDescription>See how your blog looks to visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/posts">
              <Button variant="secondary" className="w-full">
                View Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
