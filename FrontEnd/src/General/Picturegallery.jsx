// Gallery.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import strengthzone from '../assets/images/strengthzone.avif';
import garden from '../assets/images/garden.avif';
import yoga from '../assets/images/yoga.jpg';
import fun from '../assets/images/fun.jpg';
import equi from '../assets/images/equi.jpeg';
import sup from '../assets/images/sup.jpg';
import pt from '../assets/images/pt.jpeg';
import yoga2 from '../assets/images/yoga2.avif';


const galleryImages = [
  { src: strengthzone, caption: 'Power Training Zone' },
  { src: equi, caption: 'Dumbbell Area' },
  { src: yoga, caption: 'Peaceful Yoga Studio' },
  { src: yoga2, caption: 'Morning Yoga Session' },
  { src: pt, caption: 'Personal Trainers' },
  { src: sup, caption: 'Suppliments' },
];

const extraSliderImages = [
  { src: garden, caption: 'Zen Garden View' },
  { src: yoga, caption: 'Peaceful Yoga Studio' },
  { src: fun, caption: 'Functional Training' },
];

const Picturegallery = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white min-h-screen py-10 px-4">
      <h1 className="text-4xl text-yellow-400 font-bold text-center mb-10">
        Picture Gallery
      </h1>

      {/* Grid Gallery */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {galleryImages.map((img, index) => (
          <div key={index} className="relative group rounded-xl overflow-hidden shadow-lg border border-gray-700">
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2 text-sm">
              {img.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Second Swiper Slider */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-3xl text-center font-semibold text-yellow-400 mb-6">Featured Highlights</h2>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation
          loop
        >
          {extraSliderImages.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 py-4 text-center text-xl text-white">
                  {slide.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Picturegallery;
