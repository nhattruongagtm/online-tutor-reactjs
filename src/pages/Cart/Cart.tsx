import React, { useState } from "react";
import { useHistory } from "react-router";
import { COURSE_PATH } from "../../constants/path";
import "./style.scss";
export default function Cart() {
  const history = useHistory();
  const [isToogleFilter, setIsToogleFilter] = useState<boolean>(false);
  return (
    <div className="cart">
      <div className="waiting__class">
        <div className="waiting__class__bar">
          <div className="class__header">
            <div className="class__header__title">Danh sách khóa học đã lưu</div>
            <div
              className="class__header__btnAdd"
              onClick={() => setIsToogleFilter(!isToogleFilter)}
            >
              Tìm khóa học
            </div>
          </div>
          <div
            className={
              isToogleFilter
                ? "class__features class__features__toogle"
                : "class__features"
            }
          >
            <input type="text" placeholder="Tên khóa học" />
            <select name="address" id="" className="class__features__item">
              <option value="">Chọn địa điểm</option>
            </select>
            <select name="subject" id="" className="class__features__item">
              <option value="">Chọn môn học</option>
            </select>
            <select name="class" id="" className="class__features__item">
              <option value="">Chọn lớp</option>
            </select>
            <select name="format" id="" className="class__features__item">
              <option value="">Hình thức dạy</option>
            </select>
            <button>Tìm khóa học</button>
          </div>
        </div>
        <div className="waiting__class__main">
          <div className="class__list">
            <div
              className="class__item"
              onClick={() => {
                history.push(COURSE_PATH);
              }}
            >
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
                  kèm cho người đã đi làm, đã có nền tảng căn bản, lâu ngày
                  không sử dụng nên quên tiếng anh.
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
                  kèm cho người đã đi làm, đã có nền tảng căn bản, lâu ngày
                  không sử dụng nên quên tiếng anh.
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
    </div>
  );
}
