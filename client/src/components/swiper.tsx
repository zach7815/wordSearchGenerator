import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

export default function ExampleWordsearchCarousel() {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      <SwiperSlide className="flex justify-center">
        {' '}
        <img
          alt="example wordsearch pdf sheet"
          src="/Example-Wordsearch.jpg"
          className="h-screen "
        />
      </SwiperSlide>
      <SwiperSlide className="flex justify-center">
        <img
          alt="example wordsearch answers pdf sheet"
          className="h-screen "
          src="/Example -Answers.jpg"
        />
      </SwiperSlide>
    </Swiper>
  );
}
