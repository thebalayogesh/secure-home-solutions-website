import { Star } from "lucide-react";
import Link from "next/link";

const reviews = [
  {
    name: "Divya S.",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    review:
      "The lockers are high-quality and very secure. Installation was smooth and professional.",
  },
  {
    name: "Raj K.",
    location: "Coimbatore, TN",
    rating: 5,
    review:
      "I purchased a Godrej safe for my office. Extremely satisfied with the quality and service!",
  },
  {
    name: "Meena R.",
    location: "Bengaluru, Karnataka",
    rating: 5,
    review:
      "Excellent customer support and top-notch security solutions. Highly recommended!",
  },
  {
    name: "Sathish P.",
    location: "Hyderabad, AP",
    rating: 5,
    review:
      "Very reliable and secure lockers. Peace of mind knowing my valuables are safe.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-2">
        What Our Customers Say
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Trusted feedback from verified customers ⭐
      </p>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {reviews.map((r, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-200 flex flex-col"
          >
            <div className="mb-3">
              <p className="font-semibold text-sky-700">{r.name}</p>
              <p className="text-xs text-gray-500">{r.location}</p>
            </div>

            {/* ⭐ Rating */}
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${i < r.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill={i < r.rating ? "#facc15" : "none"}
                />
              ))}
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">{r.review}</p>
          </div>
        ))}
      </div>

      {/* Optional CTA */}
      <div className="text-center mt-10">
        <Link
          href="https://www.google.com/search?q=secure+home+solutions+pammal+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-6 py-3 rounded-full font-semibold transition"
        >
          🌟 Read More Reviews
        </Link>
      </div>
    </section>
  );
}
