"use client"

import type React from "react"
import { useState } from "react"
import type { WCAddress } from "@/types/woocommerce"

interface CheckoutFormProps {
  onSubmit: (data: any) => Promise<void>
  isLoading: boolean
}

export default function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    shipDifferent: false,
  })

  const [shippingData, setShippingData] = useState<Partial<WCAddress> | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({
      billing: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        city: formData.city,
        state: formData.state,
        postcode: formData.postcode,
        country: formData.country,
        phone: formData.phone,
        email: formData.email,
      },
      shipping: formData.shipDifferent ? shippingData : undefined,
      customer_email: formData.email,
    })
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 bg-white transition duration-150"

  const sectionClass =
    "bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200"

  return (
    <form onSubmit={handleSubmit} className="space-y-10 text-gray-900">
      {/* Contact Information */}
      <div className={sectionClass}>
        <h2 className="text-xl font-semibold mb-5">Contact Information</h2>
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Billing Address */}
      <div className={sectionClass}>
        <h2 className="text-xl font-semibold mb-5">Billing Address</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="postcode"
              placeholder="Postal Code"
              value={formData.postcode}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Country</option>
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className={sectionClass}>
        <label className="flex items-center gap-2 cursor-pointer mb-4 text-gray-800 font-medium">
          <input
            type="checkbox"
            name="shipDifferent"
            checked={formData.shipDifferent}
            onChange={handleChange}
            className="w-4 h-4 accent-gray-800"
          />
          Ship to a different address
        </label>

        {formData.shipDifferent && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleShippingChange}
                className={inputClass}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleShippingChange}
                className={inputClass}
              />
            </div>
            <input
              type="text"
              name="address_1"
              placeholder="Street Address"
              onChange={handleShippingChange}
              className={inputClass}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleShippingChange}
                className={inputClass}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                onChange={handleShippingChange}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="postcode"
                placeholder="Postal Code"
                onChange={handleShippingChange}
                className={inputClass}
              />
              <select name="country" onChange={handleShippingChange} className={inputClass}>
                <option value="">Select Country</option>
                <option value="IN">India</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-3.5 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-200 disabled:opacity-50 shadow-sm"
      >
        {isLoading ? "Processing..." : "Complete Order"}
      </button>
    </form>
  )
}
