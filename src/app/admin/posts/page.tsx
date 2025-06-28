import { PostsList } from "@/components/posts-list"

export default function AdminPostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Posts</h2>
        <p className="text-muted-foreground">View, edit, and delete your blog posts.</p>
      </div>
      <PostsList isAdmin={true} />
    </div>
  )
}
