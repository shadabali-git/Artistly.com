"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Edit, Trash2, Eye, ExternalLink } from "lucide-react"
import Link from "next/link"
import {toast} from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Post {
  _id: string
  title: string
  content: string
  slug: string
  createdAt: string
  updatedAt: string
}

interface PostsListProps {
  isAdmin: boolean
}

export function PostsList({ isAdmin }: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts")
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      } else {
        toast.error("Failed to fetch posts.")
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
      toast.error("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (slug: string) => {
    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPosts(posts.filter((post) => post.slug !== slug))
        toast.success("Post deleted successfully.")
      } else {
        toast.error("Failed to delete post.")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      toast.error("An unexpected error occurred.")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getExcerpt = (content: string, maxLength = 150) => {
    const textContent = content.replace(/<[^>]*>/g, "")
    return textContent.length > maxLength ? textContent.substring(0, maxLength) + "..." : textContent
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              {isAdmin ? "You haven't created any posts yet." : "No blog posts are available at the moment."}
            </p>
            {isAdmin && (
              <Link href="/admin/create">
                <Button>Create Your First Post</Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post._id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <Badge variant="secondary" className="mb-2">
                Blog Post
              </Badge>
              {isAdmin && (
                <div className="flex gap-1">
                  <Link href={`/admin/edit/${post.slug}`}>
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Post</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{post.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(post.slug)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            <CardDescription className="flex items-center text-sm">
              <CalendarDays className="h-4 w-4 mr-1" />
              {formatDate(post.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{getExcerpt(post.content)}</p>
            <div className="flex gap-2">
              <Link href={`/posts/${post.slug}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Read More
                </Button>
              </Link>
              {isAdmin && (
                <Link href={`/posts/${post.slug}`} target="_blank">
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
