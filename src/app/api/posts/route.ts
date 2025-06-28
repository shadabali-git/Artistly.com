import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Post from "@/models/Posts"

export async function GET() {
  try {
    await connectToDatabase()
    const posts = await Post.find({}).sort({ createdAt: -1 })
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    const { title, content, slug } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const post = new Post({
      title,
      content,
      slug,
    })

    await post.save()
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    // if (error.code === 11000) {
    //   return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 })
    // }
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
