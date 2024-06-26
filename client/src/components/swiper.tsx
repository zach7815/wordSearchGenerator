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
        <img src="../../ExampleWordsearch.png" className="h-screen " />
      </SwiperSlide>
      <SwiperSlide className="flex justify-center">
        <img className="h-screen " src="../../exampleAnswers.png" />
      </SwiperSlide>
    </Swiper>
  );
}
