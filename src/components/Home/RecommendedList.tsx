import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "../Home/recommend.scss";
const galaxy = "#e3fff9";
const RecommendedMain = styled.div`
  margin-top: 100px!important;
  height: 400px;
  margin-bottom: 100px;
  display: flex;
  align-items: center!important;
  /* gap: 20px!important; */
  /* background-color: blue; */

  /* background-color: blueviolet; */
`;
const RecommendedItem = styled.div`
  width: calc(310px)!important;
  height: 100%;
  border-radius: 10px;
  /* border: 1px solid black; */
  display: flex!important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 15px;
  background-color: ${galaxy};
  border: 3px solid ${galaxy};
  transition: 0.2s linear;
  margin: 0 10px;

  :hover {
    border: 3px solid #00ffbf;
  }

  .tutor__detail {
    outline: none;
    border: 2px solid #006fa7;
    background-color: white;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: 0.2s linear;

    :hover {
      background-color: #006fa7;
      color: white;
    }
  }

  .education {
    margin-top: 5px;
    font-size: 15px;
  }
  .experience {
    text-align: center;
    font-size: 15px;
    margin-top: 5px;
  }
  .name {
    font-weight: bold;
    font-size: 20px;
  }
  .subjects,
  .address,
  .rate {
    width: 100%;
    display: flex;
    font-size: 14.5px;

    div:last-child {
      margin-left: 5px;
      flex-wrap: nowrap;
      /* overflow: hidden; */
      /* background-color: #acc2c2; */
    }
  }
  .subjects {
    margin-top: 20px;
    &__list {
      color: #006fa7;
    }
  }
  .address {
    &__list {
      color: #8176d8;
    }
  }
  .rate {
    margin-bottom: 30px;

    &__list {
      font-size: 16px;
      .star {
        color: #fdce3e;
      }
      .star--border {
        color: #e0e3ed;
      }
    }
  }
`;
const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const RecommendTilte = styled.div`
  margin-top: 100px;
  font-size: 28px;
  text-align: center;
  font-weight: 700;
`;
export default function RecommendedList() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    // slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  return (
    <>
      <RecommendTilte>Gợi ý gia sư cho bạn</RecommendTilte>
      <RecommendedMain>
        <Slider {...settings} className="carousel_recommend">
          <RecommendedItem>
            <Avatar>
              <img
                src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                alt=""
              />
            </Avatar>
            <div className="education">Sinh viên</div>
            <div className="name">Nguyễn Đô Ra Ê Môn</div>
            <div className="experience">
              Sinh viên Học viện Hàng không Việt Nam Chuyên ngành Kỹ thuật hàng
              không
            </div>
            <div className="subjects">
              <div className="subjects__title">Môn:</div>
              <div className="subjects__list">Toán Học, Tiếng Anh, Vật Lý</div>
            </div>
            <div className="address">
              <div className="address__title">Địa điểm: </div>
              <div className="address__list">Quận 9, Tp. Thủ Đức, Tp. HCM</div>
            </div>
            <div className="rate">
              <div className="rate__title">Đánh giá: </div>
              <div className="rate__list">
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star--border"></i>
              </div>
            </div>
            <button className="tutor__detail">Xem chi tiết</button>
          </RecommendedItem>
          <RecommendedItem>
            <Avatar>
              <img
                src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                alt=""
              />
            </Avatar>
            <div className="education">Sinh viên</div>
            <div className="name">Nguyễn Đô Ra Ê Môn</div>
            <div className="experience">
              Sinh viên Học viện Hàng không Việt Nam Chuyên ngành Kỹ thuật hàng
              không
            </div>
            <div className="subjects">
              <div className="subjects__title">Môn:</div>
              <div className="subjects__list">Toán Học, Tiếng Anh, Vật Lý</div>
            </div>
            <div className="address">
              <div className="address__title">Địa điểm: </div>
              <div className="address__list">Quận 9, Tp. Thủ Đức, Tp. HCM</div>
            </div>
            <div className="rate">
              <div className="rate__title">Đánh giá: </div>
              <div className="rate__list">
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star--border"></i>
              </div>
            </div>
            <button className="tutor__detail">Xem chi tiết</button>
          </RecommendedItem>

          <RecommendedItem>
            <Avatar>
              <img
                src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                alt=""
              />
            </Avatar>
            <div className="education">Sinh viên</div>
            <div className="name">Nguyễn Đô Ra Ê Môn</div>
            <div className="experience">
              Sinh viên Học viện Hàng không Việt Nam Chuyên ngành Kỹ thuật hàng
              không
            </div>
            <div className="subjects">
              <div className="subjects__title">Môn:</div>
              <div className="subjects__list">Toán Học, Tiếng Anh, Vật Lý</div>
            </div>
            <div className="address">
              <div className="address__title">Địa điểm: </div>
              <div className="address__list">Quận 9, Tp. Thủ Đức, Tp. HCM</div>
            </div>
            <div className="rate">
              <div className="rate__title">Đánh giá: </div>
              <div className="rate__list">
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star--border"></i>
              </div>
            </div>
            <button className="tutor__detail">Xem chi tiết</button>
          </RecommendedItem>

          <RecommendedItem>
            <Avatar>
              <img
                src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                alt=""
              />
            </Avatar>
            <div className="education">Sinh viên</div>
            <div className="name">Nguyễn Đô Ra Ê Môn</div>
            <div className="experience">
              Sinh viên Học viện Hàng không Việt Nam Chuyên ngành Kỹ thuật hàng
              không
            </div>
            <div className="subjects">
              <div className="subjects__title">Môn:</div>
              <div className="subjects__list">Toán Học, Tiếng Anh, Vật Lý</div>
            </div>
            <div className="address">
              <div className="address__title">Địa điểm: </div>
              <div className="address__list">Quận 9, Tp. Thủ Đức, Tp. HCM</div>
            </div>
            <div className="rate">
              <div className="rate__title">Đánh giá: </div>
              <div className="rate__list">
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star--border"></i>
              </div>
            </div>
            <button className="tutor__detail">Xem chi tiết</button>
          </RecommendedItem>

          <RecommendedItem>
            <Avatar>
              <img
                src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                alt=""
              />
            </Avatar>
            <div className="education">Sinh viên</div>
            <div className="name">Nguyễn Đô Ra Ê Môn</div>
            <div className="experience">
              Sinh viên Học viện Hàng không Việt Nam Chuyên ngành Kỹ thuật hàng
              không
            </div>
            <div className="subjects">
              <div className="subjects__title">Môn:</div>
              <div className="subjects__list">Toán Học, Tiếng Anh, Vật Lý</div>
            </div>
            <div className="address">
              <div className="address__title">Địa điểm: </div>
              <div className="address__list">Quận 9, Tp. Thủ Đức, Tp. HCM</div>
            </div>
            <div className="rate">
              <div className="rate__title">Đánh giá: </div>
              <div className="rate__list">
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star"></i>
                <i className="fas fa-star star--border"></i>
              </div>
            </div>
            <button className="tutor__detail">Xem chi tiết</button>
          </RecommendedItem>
        </Slider>
      </RecommendedMain>
    </>
  );
}
