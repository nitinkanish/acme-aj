import Link from "next/link"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaCcDiscover,
  FaGooglePay,
  FaApplePay,
} from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Your Store</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Discover premium products curated to enhance your lifestyle.
              We aim to bring you quality, value, and exceptional customer service.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="hover:text-primary transition">
                <FaFacebookF size={18} />
              </Link>
              <Link href="#" className="hover:text-primary transition">
                <FaInstagram size={18} />
              </Link>
              <Link href="#" className="hover:text-primary transition">
                <FaLinkedinIn size={18} />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-primary">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-primary">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-primary">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Stay Updated</h3>
            <p className="text-sm text-gray-600 mb-3">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm border border-gray-400 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-300 pt-6 mb-6">
          <h3 className="text-base font-semibold mb-3 text-black">Accepted Payment Methods</h3>
          <div className="flex flex-wrap items-center space-x-4 text-gray-700">
            <FaCcVisa size={32} className="text-black" />
            <FaCcMastercard size={32} className="text-black" />
            <FaCcPaypal size={32} className="text-black" />
            <FaCcAmex size={32} className="text-black" />
            <FaCcDiscover size={32} className="text-black" />
            <FaApplePay size={38} className="text-black" />
            <FaGooglePay size={38} className="text-black" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          {/* <p>&copy; {new Date().getFullYear()} Your Store. All rights reserved.</p> */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-black">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-black">
              Terms & Conditions
            </Link>
            <Link href="/about" className="hover:text-black">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
