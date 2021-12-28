import React, { useEffect, useState } from 'react';
import '../Home/style.scss';
import Banner from './Banner';
import ContactForm from './ContactForm';
import RecommendedList from './RecommendedList';
export default function Home() {
  useEffect(() => {
    const move = document.querySelector('#move-top');
    const item1 = document.querySelector('#home__item--1');
    const item2 = document.querySelector('#home__item--2');
    const item3 = document.querySelector('#home__item--3');
    const item4 = document.querySelector('#recommend');
    const item5 = document.querySelector('#contact__form');
    move &&
    document.addEventListener('scroll', () => {
        const pos = window.scrollY;
        console.log(pos)
        if (pos > 200) {
          move.classList.add('display');
        } else {
          move.classList.remove('display');
        }

        if(pos > 400){
          item1?.classList.add('home__intro__item--1');
        }
        if(pos > 1100){
          item2?.classList.add('home__intro__item--1');
        }
        if(pos > 1700){
          item3?.classList.add('home__intro__item--1');
        }
        if(pos > 2500){
          item4?.classList.add('recommend--display');
        }
        if(pos > 3000){
          item5?.classList.add('contact__form--display');
        }

       
      });

    move &&
      move.addEventListener('click', () => {
        window.scrollTo(0, 0);
      });

      
  }, []);

  return (
    <div className="home">
      <Banner />
      <div className="home__intro">
        <div className="home__intro__item" id="home__item--1">
          <div className="home__intro__item__desc">
            <div className="desc__title">Đăng yêu cầu linh hoạt</div>
            <div className="desc__info">
              Bạn có thể mở các yêu cầu rất nhanh chóng, dễ dàng, với các tùy
              chỉnh linh hoạt giúp bạn tìm Gia sư phù hợp với tiêu chí của mình.
            </div>
          </div>
          <div className="home__intro__item__img"></div>
        </div>
        <div className="home__intro__item" id="home__item--2">
          <div className="home__intro__item__desc home__intro__item__desc__pay ">
            <div className="desc__title">Thanh toán an toàn, tiện lợi</div>
            <div className="desc__info">
              Bạn có thể thanh toán tiền cho buổi học online thông qua cổng
              thanh toán một cách an toàn và tiện lợi.
            </div>
          </div>
          <div className="home__intro__item__img home__intro__item__img__pay"></div>
        </div>
        <div className="home__intro__smooth" id="home__item--3">
          <div className="home__intro__smooth__desc">
            <div className="home__intro__smooth__desc__title">
              Học trực tuyến mượt mà
            </div>
            <div className="home__intro__smooth__desc__info">
              Bạn có thể sử dụng hệ thống video call 1-1 của Akadon không giật
              lag và an toàn, cùng hệ thống tài liệu học tập và ghi chú để lưu
              giữ mọi thứ đã học và dạy, không sợ thất lạc và không lo mất kiểm
              soát
            </div>
          </div>
          <div className="home__intro__smooth__img"></div>
        </div>
      </div>
      <RecommendedList />
      <ContactForm />
      <div className="move-top" id="move-top">
        <i className="fas fa-arrow-up"></i>
      </div>
    </div>
  );
}
