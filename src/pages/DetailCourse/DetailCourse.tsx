import React from "react";
import "../DetailCourse/style.scss";
interface DetailInfo {
  icon: string;
  title: string;
  content: string;
}
export default function DetailCourse() {
  const detailList: DetailInfo[] = [
    {
      icon: "fas fa-chart-pie",
      title: "Trạng thái",
      content: "Đang tìm gia sư",
    },
    { icon: "fas fa-venus-mars", title: "Giới tính gia sư", content: "Tất cả" },
    {
      icon: "fas fa-dollar-sign",
      title: "Học phí mỗi buổi",
      content: "250.000đ",
    },
    {
      icon: "fas fa-comments-dollar",
      title: "Phí nhận lớp",
      content: "600.000đ",
    },
    { icon: "fas fa-globe-asia", title: "Hình thức dạy", content: "Tại nhà" },
    {
      icon: "fas fa-hourglass",
      title: "Thời lượng",
      content: "Tuần 2 buổi (90p/buổi)",
    },
    {
      icon: "fas fa-calendar",
      title: "Ngày học dự kiến",
      content: "03/04/2021",
    },
    { icon: "fab fa-buffer", title: "Đã có", content: "0/3 đề nghị dạy" },
  ];
  return (
    <div className="detail__course">
      <div className="detail__course__main">
        <div className="detail__course__main__intro">
          <div className="course__intro__img">
            <img
              src="data:image/webp;base64,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"
              alt=""
            />
          </div>
          <div className="course__intro__info">
            <div className="course__intro__info__title">
              CẦN TÌM GIA SƯ DẠY TIẾNG ANH GIAO TIẾP CHO NGƯỜI ĐI LÀM
            </div>
            <div className="course__intro__info__main">
              <span className="info__main__id">MS: 714042</span>
              <span className="info__main__auth">
                <i className="fas fa-user"></i> Quản trị viên
              </span>
              <span className="info__main__time">
                <i className="fas fa-clock"></i> 00:54, 26/11/2021
              </span>
              <span className="info__main__views">
                <i className="fas fa-eye"></i> 1.058
              </span>
            </div>
            <div className="content__subjects">
              <div className="content__subjects__item content__subjects__item--subject">
                Tiếng anh
              </div>
              <div className="content__subjects__item content__subjects__item--detail">
                Giao tiếp căn bản de hieu
              </div>
              <div className="content__subjects__item content__subjects__item--address">
                Quận Phú Nhuận, TP.HCM
              </div>
            </div>
          </div>
          <div className="course__intro__btn">
            <button className="course__intro__btn--receive">Nhận lớp</button>
            <button className="course__intro__btn--save">Lưu</button>
          </div>
        </div>
        <div className="detail__course__main__detail">
          {detailList.map((item) => {
            return (
              <div className="course__detail__item" key={item.icon}>
                <div className="course__detail__item__icon">
                  <i className={item.icon}></i>
                </div>
                <div className="course__detail__item__info">
                  <p>{item.title}</p>
                  <p>{item.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="detail__course__general">
        <div className="course__general__content">
          <div className="course__general__content__title">
            Chi tiết nội dung khóa học
          </div>
          <p>
            Cần gia sư có kinh nghiệm dạy nghe nói đọc viết, phát âm chuẩn dạy
            kèm cho người đã đi làm, đã có nền tảng căn bản. Lâu ngày không sử
            dụng nên tiếng anh đã quên. Giờ học linh động, có thể gia sư sắp xếp
            dạy theo tuần, địa địa tại quán cafe.
          </p>
        </div>
        <div className="course__general__schedule">
          <div className="course__general__content__title">
            Chi tiết nội dung khóa học
          </div>
          <div className="course__schedule__boundary">
            <div className="course__general__schedule__item course__general__schedule--label">
              <div className="schedule__item__date">Thứ ngày</div>
              <div className="schedule__item__time">giờ bắt đầu</div>
            </div>
            <div className="course__general__schedule__item">
              <div className="schedule__item__date">Thứ 6</div>
              <div className="schedule__item__time">16:30</div>
            </div>
            <div className="course__general__schedule__item">
              <div className="schedule__item__date">Thứ 7</div>
              <div className="schedule__item__time">9:30</div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail__course__concern">
        <div className="detail__course__concern__title">Lớp học liên quan</div>
        <div className="class__list">
          <div className="class__item">
            <div className="class__item__uinfo">
              <div className="uinfo__img">
                <img
                  src="https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png"
                  alt=""
                />
              </div>
              <p className="uinfo__name">Quản trị viên</p>
            </div>
            <div className="class__item__content">
              <div className="content__title">
                Cần tìm gia sư dạy tiếng anh gia tiếp cho người đi làm
              </div>
              <div className="content__description">
                Cần gia sư có kinh nghiệm nghe nói đọc viết, phát âm chuẩn dạy
                kèm cho người đ
              </div>
              <div className="content__schedule">
                <span className="content__schedule__title">Lịch học:</span>
                <span className="content__schedule__item">T6 (9:30)</span>,
                <span className="content__schedule__item">T7 (8:30)</span>
              </div>
              <div className="content__price">
                <div className="content__price__month">
                  2.000.000đ <span>/tháng</span>
                </div>
                <div className="content__price__fee">
                  600.00đ <span>phí nhận lớp</span>
                </div>
              </div>
              <div className="content__offers">Đã có 1/3 đề nghị dạy</div>
              <div className="content__subjects">
                <div className="content__subjects__item content__subjects__item--subject">
                  Tiếng anh
                </div>
                <div className="content__subjects__item content__subjects__item--detail">
                  Giao tiếp căn bản de hieu
                </div>
                <div className="content__subjects__item content__subjects__item--address">
                  Quận Phú Nhuận, TP.HCM
                </div>
              </div>
            </div>
          </div>
          <div className="class__item">
            <div className="class__item__uinfo">
              <div className="uinfo__img">
                <img
                  src="https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png"
                  alt=""
                />
              </div>
              <p className="uinfo__name">Quản trị viên</p>
            </div>
            <div className="class__item__content">
              <div className="content__title">
                Cần tìm gia sư dạy tiếng anh gia tiếp cho người đi làm
              </div>
              <div className="content__description">
                Cần gia sư có kinh nghiệm nghe nói đọc viết, phát âm chuẩn dạy
                kèm cho người đ
              </div>
              <div className="content__schedule">
                <span className="content__schedule__title">Lịch học:</span>
                <span className="content__schedule__item">T6 (9:30)</span>,
                <span className="content__schedule__item">T7 (8:30)</span>
              </div>
              <div className="content__price">
                <div className="content__price__month">
                  2.000.000đ <span>/tháng</span>
                </div>
                <div className="content__price__fee">
                  600.00đ <span>phí nhận lớp</span>
                </div>
              </div>
              <div className="content__offers">Đã có 1/3 đề nghị dạy</div>
              <div className="content__subjects">
                <div className="content__subjects__item content__subjects__item--subject">
                  Tiếng anh
                </div>
                <div className="content__subjects__item content__subjects__item--detail">
                  Giao tiếp căn bản de hieu
                </div>
                <div className="content__subjects__item content__subjects__item--address">
                  Quận Phú Nhuận, TP.HCM
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="detail__course__concern__btn">
          xem thêm
        </div>
      </div>
      <div className="detail__course__concern detail__tutor__concern">
        <div className="detail__course__concern__title">Gia sư phù hợp</div>
        <div className="class__list__tutors">
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
        <div className="detail__course__concern__btn">
          xem thêm
        </div>
      </div>
    </div>
  );
}
