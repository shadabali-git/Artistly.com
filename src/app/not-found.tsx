import Link from "next/link"
import { Button } from "@/components/ui/button"
import {CustomerServiceOutlined, ArrowLeftOutlined } from "@ant-design/icons"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-100 rounded-full">
            <CustomerServiceOutlined className="h-12 w-12 text-purple-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <ArrowLeftOutlined className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/artists">Browse Artists</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
