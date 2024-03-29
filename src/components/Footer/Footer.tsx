import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import './style.scss';
const FooterMain = styled.div`
  width: 100%;
  /* height: 500px; */
  background-color: black;
  a {
    text-decoration: none;
    /* display: b */
    margin-bottom: 10px;
  }
`;
export default function Footer() {
  const history = useHistory();
  return (
    <FooterMain>
      <footer
        className="text-center text-lg-start text-white footer"
        style={{ backgroundColor: '#3e4551' }}
      >
        <div className="container p-4 pb-0">
          <section className="">
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase" style={{ color: 'white' }}>
                  Hệ thống gia sư trực tuyến NLU
                </h5>

                <p>
                  Hệ thống gia sư trực tuyến được thành lập năm 2021 trong thời
                  kỳ đấu tranh với dịch bệnh covid-19. Nhằm giải quyết vấn đề
                  học tập trong thời buổi đại dịch, hệ thống cung cấp các khóa
                  học online giúp học sinh có thể nắm vững các kiến thức cơ bản
                  cũng như nâng cao đổi với tất cả các môn học.
                </p>
              </div>

              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase link-title">Thống kê</h5>

                <ul className="list-unstyled mb-0 list-link">
                  <li>
                    <a href="#!" className="text-white">
                      Gia sư mới: 1249
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Lớp đã tạo: 481
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Lớp đã nhận: 236
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Phản hồi tích cực: 97%
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase link-title">giasu-nlu</h5>

                <ul className="list-unstyled mb-0 list-link">
                  <li>
                    <a href="#!" className="text-white">
                      Về chúng tôi
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Chính sách bảo mật
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Lớp gia sư mới
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Tin tức gia sư
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase link-title">Hỏi và đáp</h5>

                <ul className="list-unstyled mb-0 list-link">
                  <li>
                    <a href="#!" className="text-white">
                      Trang chủ
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Quy định đăng tìm gia sư
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Tin tức giáo dục
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase link-title">Dành cho gia sư</h5>

                <ul className="list-unstyled mb-0 list-link">
                  <li>
                    <a href="#!" className="text-white">
                      Chính sách gia sư
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Chính sách phí
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Quy định tài khoản gia sư
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Quy định về thanh toán
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="mb-4" />

          <section className="">
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3">Đăng ký ngay</span>
              <button
                type="button"
                className="btn btn-outline-light btn-rounded"
              >
                Sign up!
              </button>
            </p>
          </section>

          <hr className="mb-4" />

          <section className="mb-4 text-center">
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-google"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
              onClick={() => history.push('/admin/login')}
            >
              Admin
            </a>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          © 2020 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            giasutructuyen-nlu.com
          </a>
        </div>
      </footer>
    </FooterMain>
  );
}
