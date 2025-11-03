"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What products do you supply?",
      answer:
        "We specialize in a wide range of high-quality kitchen parts and accessories, including hinges, drawer systems, handles, knobs, sinks, baskets, and modular kitchen fittings.",
    },
    {
      question: "Do you offer bulk or wholesale pricing?",
      answer:
        "Yes. We offer special pricing for bulk orders and long-term supply partnerships. Please reach out to our sales team for customized quotations.",
    },
    {
      question: "How can I place an order?",
      answer:
        "You can place your order directly through our website or contact our sales team via email or phone. We also accept customized order requests for large projects.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods including credit/debit cards, UPI, bank transfers, and online gateways such as Razorpay or Cashfree.",
    },
    {
      question: "Do you provide delivery across India?",
      answer:
        "Yes, we deliver our products across India. Shipping times vary depending on your location. You’ll receive tracking details once your order has been dispatched.",
    },
    {
      question: "What is your return or replacement policy?",
      answer:
        "If a product is damaged or defective, you can request a return or replacement within 7 days of delivery. Please ensure the item is unused and in its original packaging.",
    },
    {
      question: "Can I visit your store or warehouse?",
      answer:
        "Absolutely. You’re welcome to visit our facility by appointment. Please contact us to schedule a visit to explore our product range in person.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-white text-gray-800 px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-black mb-6 text-center">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Find answers to the most common questions about our products, ordering process, and services.  
        If you can’t find what you’re looking for, feel free to contact us directly.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-5 transition-all hover:shadow-sm bg-white"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="text-lg font-medium text-black">{faq.question}</h2>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600">
          Still have questions?{" "}
          <a href="/contact" className="text-black font-medium hover:underline">
            Contact us
          </a>{" "}
          and our support team will assist you.
        </p>
      </div>
    </div>
  )
}
