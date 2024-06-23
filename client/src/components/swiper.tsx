import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

export default function ExampleWordsearchCarousel() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          {' '}
          <img src="../../ExampleWordsearch.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../exampleAnswers.png" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
