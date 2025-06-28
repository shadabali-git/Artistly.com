import { EditPostForm } from "@/components/edit-post-form"
import { notFound } from "next/navigation"

async function getPost(slug: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`)
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.error("Error fetching post:", error)
    }
    return null
}


export default async function EditPostPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    if (!slug) {
        notFound()
    }
    const post = await getPost(slug)

    console.log("Fetched post:", post)

    if (!post) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Edit Post</h2>
                <p className="text-muted-foreground">Update your blog post content and settings.</p>
            </div>
            <EditPostForm post={post} />
        </div>
    )
}
