import React from "react";
import "../Home/style.scss";
import Banner from "./Banner";
import ContactForm from "./ContactForm";
import RecommendedList from "./RecommendedList";
export default function Home() {
  return (
    <div className="home">
      <Banner/>
      <div className="home__intro">
        <div className="home__intro__item">
          <div className="home__intro__item__desc">
            <div className="desc__title">Đăng yêu cầu linh hoạt</div>
            <div className="desc__info">
              Bạn có thể mở các yêu cầu rất nhanh chóng, dễ dàng, với các tùy
              chỉnh linh hoạt giúp bạn tìm Gia sư phù hợp với tiêu chí của mình.
            </div>
          </div>
          <div className="home__intro__item__img"></div>
        </div>
        <div className="home__intro__item">
          <div className="home__intro__item__img home__intro__item__img__pay"></div>
          <div className="home__intro__item__desc home__intro__item__desc__pay ">
            <div className="desc__title">Thanh toán an toàn, tiện lợi</div>
            <div className="desc__info">
              Bạn có thể thanh toán tiền cho buổi học online thông qua cổng
              thanh toán một cách an toàn và tiện lợi.
            </div>
          </div>
        </div>
        <div className="home__intro__smooth">
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
      <ContactForm/>
    </div>
  );
}
