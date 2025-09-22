export default function FAQSection() {
  const faqs = [
    {
      question: "What products do you specialize in?",
      answer:
        "We provide Godrej Security Solutions including Safe Lockers, CCTV Systems, Video Door Phones, and Digital Locks.",
    },
    {
      question: "Do you offer installation services?",
      answer:
        "Yes, our team provides complete installation and support for all security systems purchased from us.",
    },
    {
      question: "How can I contact your team?",
      answer:
        "You can call us directly or reach us via WhatsApp. Visit the Contact section for quick access.",
    },
    {
      question: "Do you provide warranty on products?",
      answer:
        "All our products come with official brand warranty and after-sales support.",
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group py-4 cursor-pointer"
            >
              <summary className="flex justify-between items-center font-medium text-gray-800 hover:text-blue-600">
                {faq.question}
                <span className="transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
