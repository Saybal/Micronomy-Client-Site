import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";
import Swal from "sweetalert2";
import { useTheme } from "../../Hooks/useTheme";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const swiperRef = useRef(null);

  const currentTheme = useTheme();

  const bgCard = currentTheme === "acid" ? "bg-white" : "bg-slate-800";
  const border = currentTheme === "acid" ? "border-slate-300" : "border-indigo-500";
  const hoverBorder = currentTheme === "acid" ? "hover:border-indigo-600" : "hover:border-indigo-300";
  const iconColor = currentTheme === "acid" ? "text-gray-800" : "text-slate-300";

  useEffect(() => {
    axios
      .get("/testimonials")
      .then((res) => {
        if (res.data) {
          setTestimonials(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
        console.error("Error fetching workers:", err);
      });
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="w-full text-center">
        <h2 className={`${
            currentTheme === "acid" ? "text-indigo-600" : "text-indigo-300"
          } text-3xl md:text-4xl font-bold mb-8`} >
          What Our Users Say
        </h2>

        {testimonials.length > 0 && (
          <div
            onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
            onMouseLeave={() => swiperRef.current?.autoplay?.start()}
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              loop={true}
              className="w-full"
              style={{
                "--swiper-theme-color": "#eab308",
                "--swiper-pagination-bullet-width": "10px",
                "--swiper-pagination-bullet-height": "10px",
              }}
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className={`${bgCard} ${border} ${hoverBorder} ${iconColor} rounded-xl shadow-lg p-8 max-w-7xl border border-base-300 mx-auto`}>
                    <div className="flex flex-col items-center">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-yellow-400 mb-4"
                      />
                      <h4 className="text-lg mb-3 font-semibold">
                        {t.name}, {t.address.country}
                      </h4>
                      <p className="text-2xl italic mb-4">
                        "{t.review}"
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
