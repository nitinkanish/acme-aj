"use client"

export default function ReturnPolicyPage() {
  return (
    <div className="bg-white text-gray-800 px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-black mb-6 text-center">
        Return & Refund Policy
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        We value your satisfaction and want to ensure you have a smooth shopping experience.  
        Please review our return and refund policy below.
      </p>

      <div className="space-y-8">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-semibold text-black mb-2">1. Eligibility for Returns</h2>
          <p className="text-gray-600 leading-relaxed">
            Products can be returned within <strong>7 days of delivery</strong> if they are defective, damaged, or not as described.
            To be eligible for a return:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>The item must be unused and in its original packaging.</li>
            <li>A valid proof of purchase (invoice or receipt) is required.</li>
            <li>All accessories, manuals, and tags must be included.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-semibold text-black mb-2">2. Non-Returnable Items</h2>
          <p className="text-gray-600 leading-relaxed">
            The following items are not eligible for return or refund:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Custom-made or special-order parts</li>
            <li>Items that have been used, installed, or modified</li>
            <li>Products without original packaging or missing components</li>
            <li>Clearance or discounted sale items (unless damaged)</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold text-black mb-2">3. Return Process</h2>
          <p className="text-gray-600 leading-relaxed">
            To initiate a return, please contact our support team at{" "}
            <a href="mailto:support@yourcompany.com" className="text-black font-medium hover:underline">
              support@yourcompany.com
            </a>{" "}
            with your order details and reason for return.
          </p>
          <p className="text-gray-600 mt-2">
            Our team will review your request and provide instructions for shipping the product back to us.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-semibold text-black mb-2">4. Refunds</h2>
          <p className="text-gray-600 leading-relaxed">
            Once your return is received and inspected, we will notify you about the approval or rejection of your refund.
            Approved refunds will be processed within <strong>5–7 business days</strong> and credited to your original payment method.
          </p>
          <p className="text-gray-600 mt-2">
            Please note that shipping fees are non-refundable unless the return is due to an error on our part.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-semibold text-black mb-2">5. Damaged or Defective Products</h2>
          <p className="text-gray-600 leading-relaxed">
            If you receive a damaged or defective item, please contact us immediately with clear photos of the product and packaging.
            We will arrange for a replacement or refund as quickly as possible.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-semibold text-black mb-2">6. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            For any questions or concerns about our return and refund policy, feel free to reach out to our support team:
          </p>
          <ul className="text-gray-600 mt-2 space-y-1">
            <li>
              📧 Email:{" "}
              <a href="mailto:support@yourcompany.com" className="text-black font-medium hover:underline">
                support@yourcompany.com
              </a>
            </li>
            <li>📞 Phone: +91 98765 43210</li>
            <li>🏢 Address: SCO 123, Industrial Area, Chandigarh, India</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
