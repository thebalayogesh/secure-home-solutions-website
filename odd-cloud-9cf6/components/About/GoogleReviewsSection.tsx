import { Star } from "lucide-react";
import Link from "next/link";

const reviews = [
  {
    name: "Uma Srinivasan",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    review:
      "One of the best and dedicated sales and service outlet. They have multiple models in display. Mr.Satish is so responsible,informative and answers all the queries patiently. I would highly recommend this outlet for vault purchases.",
  },
  {
    name: "Arasu D",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    review:
      "We have been using a Godrej video door phone supplied by Secure Home Solutions for the past four years and have been very satisfied with the product. Today, we decided to upgrade our system and requested Secure Home Solutions to supply and install a new Godrej video door phone on the same day. They did not disappoint! They provided same-day delivery and installation, handling the case with utmost professionalism. We are delighted with their prompt service and highly recommend Secure Home Solutions to anyone in need of Godrej video door phones. Excellent service and customer care!",
  },
  {
    name: "Yogeshwaran Jayakumar",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    review:
      "I feel truly lucky to have purchased my Golden Colour Godrej Rhino Advanced Safe Locker from Secure Home Solutions, Chennai. From the day I brought this locker home, I’ve started seeing my golden wishes coming true, and my wealth goals are moving in the right direction. This locker has become very special and sentimental for me. I sincerely thank Secure Home Solutions for offering me such a wonderful and truly golden Godrej locker. Highly recommend them for anyone looking for the right safe locker!",
  },
  {
    name: "Girijaa Doraiswamy",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    review:
      "We ordered the Godrej Matrix, and Sathish assisted us with all our queries. The entire process was smoothly coordinated over the phone, and the installation was completed the very next day. Excellent service!",
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
          href="https://www.google.com/search?num=10&sca_esv=8b6aaa0e07ec78a3&rlz=1C1GCEA_enIN1176IN1176&biw=1366&bih=645&sxsrf=AE3TifNAI7wRXfQi2svq1LMWpbeFTWbtqg:1758740180860&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E5XChMffoxoY6OkKPuh78jMFPSnNuFds2S8sj-ZLlEarnwF3NRzXK13FmL_QFJpzy3MybzdxU714MonGZUvYhsoQ1xFnexyta95fM2bGO-eq3pCkrHJhqgreVIxYxs1oD__NLCA%3D&q=Secure+Home+Solutions+-+A+Godrej+Locker+Shop+Reviews&sa=X&ved=2ahUKEwio5O3difKPAxUwSGwGHWpBDf8Q0bkNegQIPRAE"
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
