import Link from "next/link"
import {CustomerServiceOutlined,FacebookFilled,InstagramOutlined,XOutlined ,LinkedinOutlined } from "@ant-design/icons"

//  nothing is working it's a build in Template used 

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <CustomerServiceOutlined className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold">Artistly</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Connecting event planners with talented performing artists worldwide. Book the perfect entertainment for
              your next event.
            </p>
            <div className="flex space-x-4">
              <FacebookFilled className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <XOutlined className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <InstagramOutlined className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <LinkedinOutlined className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Event Planners</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/artists" className="hover:text-white">
                  Browse Artists
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Artists</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/dashboard" className="hover:text-white">
                  Artist Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Join as Artist
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Artistly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
