export default function Contact() {
  return (
    <div className="bg-white text-gray-800 px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-black mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-8">
        Whether you’re a builder, retailer, or homeowner — our team is ready to
        assist you with any product inquiries, quotes, or partnership opportunities.
      </p>

      <div className="mb-10 space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-black mb-2">Get in Touch</h2>
          <p className="text-gray-600">Phone: <span className="text-black font-medium">+91 98765 43210</span></p>
          <p className="text-gray-600">Email: <span className="text-black font-medium">info@[companyname].com</span></p>
          <p className="text-gray-600">Address: Plot No. 123, Industrial Area, Phase 2, Chandigarh, India</p>
          <p className="text-gray-600">Working Hours: <span className="text-black font-medium">Mon–Sat: 9:00 AM – 7:00 PM</span></p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-black mb-4">Send Us a Message</h2>
        <form className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="text"
            placeholder="Subject"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          ></textarea>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
