export default function About() {
  return (
    <div className="bg-white text-gray-800 px-6 py-16 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-black mb-4">About Us</h1>
      <p className="text-lg text-gray-600 mb-8">
        At <span className="font-semibold">[Company Name]</span>, we believe every great kitchen starts with reliable components...
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-black mb-2">Who We Are</h2>
        <p className="text-gray-600 leading-relaxed">
          Founded with a passion for craftsmanship, [Company Name] has grown into a trusted kitchen parts supplier...
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-black mb-2">Our Mission</h2>
        <p className="text-gray-600">To empower builders, retailers, and homeowners by supplying top-quality kitchen components...</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-black mb-2">Our Values</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-1">
          <li>Quality First</li>
          <li>Customer Commitment</li>
          <li>Integrity & Trust</li>
          <li>Innovation</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-black mb-2">Why Choose Us</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-1">
          <li>Wide Product Range</li>
          <li>Assured Quality</li>
          <li>Competitive Pricing</li>
          <li>Reliable Delivery</li>
          <li>Dedicated Support</li>
        </ul>
      </section>

      <p className="text-gray-700 font-medium mt-8">
        Let’s build better kitchens together. <br />
        <span className="text-black">Contact us today</span> to explore our full range.
      </p>
    </div>
  );
}
