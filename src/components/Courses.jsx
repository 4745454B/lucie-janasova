import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    id: 1,
    location: "ZŠ Černošice - děti",
    schedule: [
      { day: "pondělí", time: "14:00 - 15:00", price: "2.600,- Kč/pololetí" },
      { day: "čtvrtek", time: "14:00 - 15:00", price: "2.600,- Kč/pololetí" },
    ],
  },
  {
    id: 2,
    location: "ZŠ Dobřichovice - děti",
    schedule: [
      { day: "úterý", time: "13:20 - 14:50", price: "3.000,- Kč/pololetí" },
      { day: "úterý", time: "15:15 - 16:45", price: "3.000,- Kč/pololetí" },
    ],
  },
  {
    id: 3,
    location: "Soukromá dílna - děti",
    schedule: [
      { day: "pondělí", time: "16:00 - 17:30", price: "3.100,- Kč/pololetí" },
      { day: "středa", time: "14:00 - 15:30", price: "3.100,- Kč/pololetí" },
      { day: "středa", time: "15:30 - 17:00", price: "3.100,- Kč/pololetí" },
    ],
  },
  {
    id: 4,
    location: "Soukromá dílna - dospělí",
    schedule: [
      { day: "pátek", time: "16:30 - 19:30", price: "dle hodin v dílně" },
    ],
  },
];

export default function Courses() {
  const sectionRef = useRef(null);
  const coursesTextRef = useRef(null);
  const coursesRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        coursesTextRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        coursesRef.current.children, // Target each card
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
          stagger: 0.2, // Small delay between cards
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="courses"
      className="container mx-auto mt-40 mb-40 px-4"
    >
      <h1 ref={coursesTextRef} className="text-4xl font-bold text-center mb-8">
        Rozvrh kurzů
      </h1>

      <div ref={coursesRef} className="grid md:grid-cols-2 gap-6">
        {courses?.map((course) => (
          <div
            key={course?.id}
            className="bg-white shadow-lg rounded-xl p-6 border"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {course?.location}
            </h2>
            <table className="w-full text-left text-gray-800">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Den</th>
                  <th className="py-2">Čas</th>
                  <th className="py-2 text-right">Cena</th>
                </tr>
              </thead>
              <tbody>
                {course?.schedule?.map((session, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">{session.day}</td>
                    <td className="py-2">{session.time}</td>
                    <td className="py-2 text-right">{session.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}
