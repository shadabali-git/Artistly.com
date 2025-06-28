import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

async function getPost(slug: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/posts/${slug}`, {
            cache: "no-store",
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.error("Error fetching post:", error)
    }
    return null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return {
            title: "Post Not Found",
        }
    }

    return {
        title: post.title,
        description: post.content.replace(/<[^>]*>/g, "").substring(0, 160),
        openGraph: {
            title: post.title,
            description: post.content.replace(/<[^>]*>/g, "").substring(0, 160),
            type: "article",
            publishedTime: post.createdAt,
        },
    }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Link href="/posts">
                            <Button variant="ghost" className="mb-4">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Posts
                            </Button>
                        </Link>
                    </div>

                    <Card className="shadow-lg">
                        <CardHeader className="space-y-4">
                            <div className="space-y-2">
                                <Badge variant="secondary" className="w-fit">
                                    Blog Post
                                </Badge>
                                <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>
                            </div>

                            <div className="flex items-center text-sm text-muted-foreground">
                                <CalendarDays className="h-4 w-4 mr-2" />
                                Published on {formatDate(post.createdAt)}
                                {post.updatedAt !== post.createdAt && (
                                    <span className="ml-4">• Updated on {formatDate(post.updatedAt)}</span>
                                )}
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div
                                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
