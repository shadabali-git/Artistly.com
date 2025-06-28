import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Post from "@/models/Posts"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }>}) {
  try {
    await connectToDatabase()
    const { slug } = await params
    const post = await Post.findOne({ slug: slug }).lean()

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }>}) {
  try {
    await connectToDatabase()
    const { slug } = await params
    const { title, content, slug:clientSlug } = await request.json()

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const updatedPost = await Post.findOneAndUpdate(
      { slug: slug },  // Use params directly
      { title, content, clientSlug, updatedAt: new Date() },
      { new: true, runValidators: true }  // Added validation
    )

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params:Promise<{ slug: string }>}) {
  try {
    await connectToDatabase()
    const { slug } = await params
    const deletedPost = await Post.findOneAndDelete({ slug:slug })

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
