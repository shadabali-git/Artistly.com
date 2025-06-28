"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {toast} from "sonner"
import { RichTextEditor } from "@/components/rich-text-editor"
import { generateSlug } from "@/lib/utils"

export interface Post {
  _id: string
  title: string
  content: string
  slug: string
  createdAt: string
  updatedAt: string
}

interface EditPostFormProps {
  post: Post
}

export function EditPostForm({ post }: EditPostFormProps) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [slug, setSlug] = useState(post.slug)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleTitleChange = (value: string) => {
    setTitle(value)
    // Only auto-generate slug if it matches the current title's slug
    if (slug === generateSlug(post.title)) {
      setSlug(generateSlug(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.warning("Please fill in all required fields.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/posts/${post.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content,
          slug,
        }),
      })

      if (response.ok) {
        toast.success("Post updated successfully!")
        router.push("/admin/posts")
      } else {
        const error = await response.json()
        toast.error(`${error.error}Failed to update post.`)
      }
    } catch (error) {
      console.error("Error updating post:", error)
      toast.error("An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter post title..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-friendly-slug"
              className="font-mono text-sm"
            />
            <p className="text-sm text-muted-foreground">This will be used in the URL: /posts/{slug || "your-slug"}</p>
          </div>

          <div className="space-y-2">
            <Label>Content *</Label>
            <RichTextEditor value={content} onChange={setContent} placeholder="Write your post content here..." />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Post"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/posts")}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
