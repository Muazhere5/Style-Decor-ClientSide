import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="space-y-24 overflow-hidden">

      {/* =====================================================
          HERO / BANNER SECTION
      ====================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* 🔴 PUT YOUR HERO / BANNER IMAGE FROM POSTIMAGES HERE */}
        <img
          src="https://i.postimg.cc/XXXXXX/hero-banner.jpg" // ← postimage hero banner
          alt="StyleDecor Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Elevate Your Home & Ceremony
          </h1>

          <p className="mt-6 text-lg max-w-2xl mx-auto opacity-90">
            Smart booking, premium decorators, and flawless execution for every occasion.
          </p>

          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <Link to="/services" className="btn btn-primary text-lg px-10">
              Explore Services
            </Link>
            <Link to="/coverage" className="btn btn-secondary text-lg px-10">
              Coverage Map
            </Link>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          SWIPER SLIDER – FEATURED DECORATIONS
      ====================================================== */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Signature Decoration Projects
        </h2>
        <p className="text-center text-gray-500 max-w-xl mx-auto mb-10">
          Hand-crafted decoration experiences designed by our professional decorators.
        </p>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <SwiperSlide key={item}>
              <div className="card overflow-hidden">
                {/* 🔴 PUT YOUR SLIDER IMAGES FROM POSTIMAGES HERE */}
                <img
                  src={`https://i.postimg.cc/XXXXXX/slider-${item}.jpg`} // ← postimage slider images
                  alt="Decoration Setup"
                  className="h-64 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Premium Decoration #{item}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Designed with elegance, executed with perfection.
                  </p>
                  <Link to="/services" className="btn btn-outline w-full">
                    View Service
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* =====================================================
          CUSTOMER REVIEWS SECTION (REALISTIC)
      ====================================================== */}
      <section className="bg-base-200 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            Trusted by Happy Clients
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Ayesha Rahman",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Mehedi Hasan",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Nusrat Jahan",
                img: "https://randomuser.me/api/portraits/women/68.jpg",
              },
              {
                name: "Tanvir Ahmed",
                img: "https://randomuser.me/api/portraits/men/75.jpg",
              },
              {
                name: "Farzana Akter",
                img: "https://randomuser.me/api/portraits/women/12.jpg",
              },
              {
                name: "Sabbir Hossain",
                img: "https://randomuser.me/api/portraits/men/19.jpg",
              },
            ].map((review, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="card p-8"
              >
                <FaQuoteLeft className="text-4xl text-style-primary mb-4" />

                <p className="text-gray-600 mb-6">
                  From planning to execution, StyleDecor handled everything flawlessly.
                  Our event looked stunning and stress-free.
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={review.img}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CREATIVE SECTION – WHY STYLEDECOR
      ====================================================== */}
      <section className="container mx-auto px-6 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Why StyleDecor is Different
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "Certified Decorators",
            "Real-Time Booking System",
            "Transparent Pricing",
            "Luxury-Grade Materials",
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="card p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-style-primary text-white flex items-center justify-center text-2xl font-bold">
                {index + 1}
              </div>
              <h3 className="font-bold text-xl mb-3">{feature}</h3>
              <p className="text-gray-500">
                Designed to give you a seamless, premium decoration experience.
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/services" className="btn btn-primary text-lg px-12">
            Book Your Decoration
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
