import { CreatePostForm } from "@/components/create-post-form"

export default function CreatePostPage() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Create New Post</h2>
        <p className="text-muted-foreground">Write and publish a new blog post with rich text content.</p>
      </div>
      <CreatePostForm />
    </div>
  )
}
