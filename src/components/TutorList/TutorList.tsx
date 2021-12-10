import React, { useState } from "react";
import { useHistory } from "react-router";
import { TUTOR_PATH } from "../../constants/path";
import "../TutorList/style.scss";
export default function TutorList() {
  const [isToogleFilter, setIsToogleFilter] = useState<boolean>(false);
  const history = useHistory();
  return (
    <div className="waiting__class">
      <div className="waiting__class__bar">
        <div className="class__header">
          <div className="class__header__title">Danh sách gia sư</div>
          <div
            className="class__header__btnAdd"
            onClick={() => setIsToogleFilter(!isToogleFilter)}
          >
            Tìm gia sư
          </div>
        </div>
        <div
          className={
            isToogleFilter
              ? "class__features__tutor class__features__toogle"
              : "class__features"
          }
        >
          <input type="text" placeholder="Tên gia sư" className="class__features__tutor__input"/>
          <select name="city" id="" className="class__features__item">
            <option value="">Tất cả tỉnh/thành</option>
          </select>
          <select name="district" id="" className="class__features__item">
            <option value="">Tất cả quận/huyện</option>
          </select>
          <select name="subject" id="" className="class__features__item">
            <option value="">Chọn môn học</option>
          </select>
          <select name="class" id="" className="class__features__item">
            <option value="">Chọn lớp học</option>
          </select>
          <button>Tìm gia sư</button>
        </div>
      </div>
      <div className="waiting__class__main">
        <div className="class__list__tutor">
          <div className="tutor__item">
            <div className="tutor__avatar">
              <img
                src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                alt=""
              />
            </div>
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
            <button className="tutor__detail" onClick={()=> history.push(TUTOR_PATH)}>Xem chi tiết</button>
          </div>
          <div className="tutor__item">
            <div className="tutor__avatar">
              <img
                src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                alt=""
              />
            </div>
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
          </div>
          <div className="tutor__item">
            <div className="tutor__avatar">
              <img
                src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                alt=""
              />
            </div>
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
          </div>
          <div className="tutor__item">
            <div className="tutor__avatar">
              <img
                src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                alt=""
              />
            </div>
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
          </div>
          <div className="tutor__item">
            <div className="tutor__avatar">
              <img
                src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                alt=""
              />
            </div>
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
          </div>
        
        </div>
        <div className="class__pagination">
          <div className="class__pagination__item class__pagination__item--nav">
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className="class__pagination__item">1</div>
          <div className="class__pagination__item">2</div>
          <div className="class__pagination__item class__pagination__item--checked">
            3
          </div>
          <div className="class__pagination__item">...</div>
          <div className="class__pagination__item">10</div>
          <div className="class__pagination__item class__pagination__item--nav">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
