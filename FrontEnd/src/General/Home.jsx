import React from 'react';
import bannerImage from '../assets/images/Banner.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
      delay,
    },
  },
});

const Home = () => {
  return (
    
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white min-h-screen">
      <motion.div
        className="max-w-full h-full overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn(0)}
      >
        <img
          src={bannerImage}
          alt="IronZen Banner"
          className="w-full h-full object-cover object-center"
        />

        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mt-10 text-yellow-400"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Welcome to IronZen
        </motion.h1>

        <motion.p
          className="text-center text-gray-300 max-w-xl mx-auto mt-4 px-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          A sanctuary where strength meets stillness. Empower your body with Iron. Align your soul with Zen.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10 mt-20 px-8 md:px-20">
          {/* Strength Section */}
          <motion.div
            className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700"
            variants={fadeIn(0.7)}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Build Strength</h2>
            <p className="text-gray-400">
              Power through dynamic workouts guided by expert trainers. From functional fitness to classic weight training — unlock your potential.
            </p>
          </motion.div>

          {/* Yoga Section */}
          <motion.div
            className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700"
            variants={fadeIn(0.9)}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-teal-400 mb-4">Embrace Yoga</h2>
            <p className="text-gray-400">
              Reconnect with breath and balance. Our yoga programs guide you toward flexibility, peace, and clarity — mindfully.
            </p>
          </motion.div>
        </div>

        {/* ⭐ New: Testimonials Section */}
        <motion.div
          className="mt-24 px-6 md:px-20"
          variants={fadeIn(1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-10">🗣 What Our Members Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-md">
              <p className="text-gray-300 italic">"IronZen transformed not just my body but my mindset. The energy, the discipline — it's unmatched 💪🔥."</p>
              <p className="text-blue-400 font-semibold mt-4 text-sm">— Aarav S., Athlete</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-md">
              <p className="text-gray-300 italic">"As a yoga enthusiast, I found true serenity here. The instructors are so grounded and wise 🧘‍♀✨."</p>
              <p className="text-teal-400 font-semibold mt-4 text-sm">— Priya M., Yoga Coach</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-md">
              <p className="text-gray-300 italic">"A perfect blend of intensity and calm. From weightlifting to mindful breathing — this place has it all 💯."</p>
              <p className="text-red-400 font-semibold mt-4 text-sm">— Raghav K., Entrepreneur</p>
            </div>
          </div>
        </motion.div>
        {/* End Testimonials */}

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20 pb-20"
          variants={fadeIn(1.2)}
          initial="hidden"
          animate="visible"
        >
          <button className="bg-yellow-400 text-black px-8 py-3 text-lg rounded-full hover:bg-yellow-300 transition-all duration-300">
            <a href='/Member'>Become a Member</a>
          </button>
        </motion.div>
        {/* Testimonials Section */}
<div className="bg-gray-950 py-16 mt-10">
  <h2 className="text-3xl md:text-4xl text-center text-yellow-400 font-bold mb-10">
    What Our Members Say ✨
  </h2>
  <div className="grid md:grid-cols-3 gap-8 px-6 md:px-20">
    {[
      {
        name: "Aarav Mehta",
        role: "Fitness Enthusiast",
        image: "https://i.pravatar.cc/150?img=32",
        quote: "IronZen completely changed my lifestyle. The gym workouts are intense, and the yoga keeps me grounded. 💪🧘",
      },
      {
        name: "Neha Sharma",
        role: "Software Engineer",
        image: "https://i.pravatar.cc/150?img=5",
        quote: "From stress to strength — I owe it to the team at IronZen. Highly recommended! 🌿",
      },
      {
        name: "Rishi Kapoor",
        role: "Entrepreneur",
        image: "https://i.pravatar.cc/150?img=12",
        quote: "The blend of modern training and ancient yoga wisdom is perfect here. Truly peaceful and powerful.",
      },
    ].map((t, idx) => (
      <div
        key={idx}
        className="bg-gray-900 border border-gray-700 p-6 rounded-xl text-white shadow-md"
      >
        <div className="flex items-center gap-4 mb-4">
          <img
            src={t.image}
            alt={t.name}
            className="w-14 h-14 rounded-full border-2 border-yellow-400"
          />
          <div>
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className="text-sm text-gray-400">{t.role}</p>
          </div>
        </div>
        <p className="text-gray-300 italic">“{t.quote}”</p>
      </div>
    ))}
  </div>
<div className=" text-center mt-8">
  <Link to="/review">
    <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-full transition duration-300 shadow-md">
      Leave a Review ✍
    </button>
  </Link>
</div>
</div>
      </motion.div>
      
      
    </div>
  );
};

export default Home;
