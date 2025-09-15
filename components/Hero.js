'use client'

import React, { useRef, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Image from 'next/image'
import HeroSlideOne from '@/public/images/heroskyturf.webp'
import HeroSlideTwo from '@/public/images/timeupturf.webp'

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <Swiper 
          navigation={true} 
          modules={[Navigation, Pagination, Autoplay]} 
          className="mySwiper"
          slidesPerView={1}
          loop={true}
        >

          <SwiperSlide>
            <div className='hero__slider-image-wrap'>
              <Image 
                src={HeroSlideOne}
                alt=''
                className='hero__slider-item-image'
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='hero__slider-image-wrap'>
              <Image 
                src={HeroSlideTwo}
                alt=''
                className='hero__slider-item-image'
              />
            </div>
          </SwiperSlide>
      </Swiper>
      </section>
    </>
  )
}

export default Hero