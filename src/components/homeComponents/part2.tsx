import Slider from "react-slick";
import { GoArrowLeft } from "react-icons/go";
import 'aos/dist/aos.css';
import {data} from './data';





function Category() {

  
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    autoplay: true,
    speed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <div className="py-16">
      <div className="slider-container">
        <div className="m-6">
          <div className="flex gap-2">
            <GoArrowLeft size={25} color="#ff6347"/>
            <h1 className="text-orange-600 font-bold text-2xl">Categories</h1>
          </div>
          <div>
          <h1 className="text-4xl font-bold text-indigo-800">Explore our Top Categories</h1>
          </div>
        </div>
        <Slider {...settings} className="py-4">
      {data.map((item, index) => (
          <div key={index}>
            <div className="flex flex-col w-[95%]">
              <img src={item.img} alt="Category 1" className="h-72  rounded-xl" loading="lazy" />
              <h1 className="text-center text-indigo-600">{item.title}</h1>
            </div>
          </div>
))}
        </Slider>
      </div>
    </div>
  );
}

export default Category