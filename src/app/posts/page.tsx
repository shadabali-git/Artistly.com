import { PostsList } from "@/components/posts-list"

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Posts</h1>
          <p className="text-gray-600">Discover our latest articles and insights</p>
        </div>
        <PostsList isAdmin={false} />
      </div>
    </div>
  )
}
