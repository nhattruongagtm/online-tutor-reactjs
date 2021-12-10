import React from "react";
import { useHistory } from "react-router";
import { COURSE_PATH } from "../../constants/path";
import "./style.scss";
export default function Tutor() {
    const history = useHistory();
  return (
    <div className="tutor__info">
      <div className="tutor__info__general">
        <div className="tutor__general__cv">
          <img src="https://vtv1.mediacdn.vn/thumb_w/650/2020/8/29/chadwick-boseman-elle-man-feature-1598674387430539628601.jpg" alt="" className="tutor__img" />
          <div className="tutor__general__cv__main">
            <div className="tutor__general__name">Nguyễn Đô Ra Ê Môn</div>
            <div className="tutor__general__identify">
              <span>
               <strong> MS:</strong> <span>18130261</span>
              </span>
              <span>
               <i className="fas fa-pen"></i> <span>10:09,</span> <span>17/08/2020</span>
              </span>
            </div>
            <div className="tutor__general__education">Sinh Viên</div>
            <div className="tutor__general__fee">200.000/buổi</div>
          </div>
        </div>
        <div className="tutor__info__follow">
          <div className="tutor__info__follow__course">
            <div className="tutor__info__course__icon"><i className="fab fa-leanpub"></i></div>
            <div className="tutor__info__course__content">
              <span>Số khóa học đã dạy</span>
              <span>1</span>
            </div>
          </div>
          <div className="tutor__info__follow__course">
            <div className="tutor__info__course__icon"><i className="fab fa-acquisitions-incorporated"></i></div>
            <div className="tutor__info__course__content">
              <span>Lượt đánh giá</span>
              <span>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="tutor__info__detail">
        <div className="tutor__info__detail__item">
          <div className="tutor__info__item__title">Mô tả chi tiết gia sư</div>
          <div className="tutor__info__item__content">
            Cấp 3 em là học sinh chuyên Toán trường Đại học Khoa học Tự nhiên,
            Đại học Quốc gia Tp.HCM. Hiện em là sinh viên chuyên ngành Kiểm
            Toán, Trường Đại học Kinh Tế Tp.HCM. Em có thể dạy gia sư Toán cấp
            2, gia sư Toán ôn thi học sinh giỏi, gia sư tiếng Anh giao tiếp cơ
            bản.
          </div>
        </div>
        <div className="tutor__info__detail__item">
          <div className="tutor__info__item__title">Các môn đã đăng ký</div>
          <div className="tutor__info__item__content">
            <span>
              <strong>Toán học:</strong>
              <span>Lớp 6,</span>
              <span>Lớp 7</span>
            </span>
            <span>
              <strong>Tiếng anh:</strong>
              <span>Lớp 8,</span>
              <span>Lớp 9</span>
            </span>
          </div>
        </div>
        <div className="tutor__info__detail__item">
          <div className="tutor__info__item__title">Khu vực đăng ký</div>
          <div className="tutor__info__item__content">
            <span>
              <strong>Quận Gò Vấp </strong>
              <span>- Thành phố Hồ Chí Minh</span>
            </span>
            <span>
              <strong>Thành phố Thủ Đức </strong>
              <span>- Thành phố Hồ Chí Minh</span>
            </span>
            <span>
              <strong>Quận Bình Thạnh </strong>
              <span>- Thành phố Hồ Chí Minh</span>
            </span>
          </div>
        </div>
      </div>
      <div className="tutor__info__classes">
      <div className="tutor__info__classes__title">Danh sách lớp đã dạy</div>
      <div className="class__list">
          <div className="class__item" onClick={()=>{history.push(COURSE_PATH)}}>
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
                kèm cho người đã đi làm, đã có nền tảng căn bản, lâu ngày không
                sử dụng nên quên tiếng anh.
              </div>
              <div className="content__schedule">
                <span className="content__schedule__title">Lịch học: </span>
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
                  Giao tiếp căn bản
                </div>
                <div className="content__subjects__item content__subjects__item--address">
                  Quận Phú Nhuận, TP.HCM
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div className="tutor__info__courses">
            
      </div>
    </div>
  );
}
