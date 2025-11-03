"use client"

export default function ShippingInfoPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-black">Shipping Information</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-black">Order Processing</h2>
        <p className="text-gray-600 leading-relaxed">
          All orders are processed within <strong>1–3 business days</strong> (excluding weekends and holidays)
          after receiving your order confirmation email. You will receive another notification when your order has shipped.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-black">Domestic Shipping Rates</h2>
        <p className="text-gray-600 leading-relaxed">
          We offer <strong>flat-rate shipping</strong> across India. The shipping cost will be displayed at checkout
          before you complete your purchase.
        </p>
        <ul className="list-disc pl-6 mt-3 text-gray-600">
          <li>Standard Shipping (5–7 business days)</li>
          <li>Express Shipping (2–3 business days)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-black">International Shipping</h2>
        <p className="text-gray-600 leading-relaxed">
          We currently offer international shipping to select countries. Shipping charges and delivery times vary
          depending on location and will be calculated at checkout.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-black">Order Tracking</h2>
        <p className="text-gray-600 leading-relaxed">
          Once your order has shipped, you will receive an email with your tracking number and a link to track your
          package’s progress.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 text-black">Delayed Shipments</h2>
        <p className="text-gray-600 leading-relaxed">
          While we strive to deliver all orders on time, delays can occasionally occur due to high demand or factors
          beyond our control (e.g., weather, logistics delays). We appreciate your understanding and patience in such cases.
        </p>
      </section>
    </div>
  )
}
