import React from "react";
import video1 from "../assets/videos/gym1.mp4";
import video2 from "../assets/videos/gym2.mp4";
import video3 from "../assets/videos/yoga1.mp4";
import video4 from "../assets/videos/yoga2.mp4";

const videos = [
  {
    title: "Intense Gym Workout",
    file: video1,
  },
  {
    title: "Strength Training Session",
    file: video2,
  },
  {
    title: "Morning Yoga Flow",
    file: video3,
  },
  {
    title: "Relaxing Evening Yoga",
    file: video4,
  },
];

const VideoGallery = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">
        Video Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700"
          >
            <video
              className="w-full h-[250px] object-cover"
              controls
              preload="metadata"
            >
              <source src={video.file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-4 text-center text-yellow-300 font-semibold text-md">
              {video.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
