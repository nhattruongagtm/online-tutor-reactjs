import React from "react";
import styled from "styled-components";

const ContactMain = styled.div`
  background: url("../../assets/images/home_1.png");
  width: 100%;
  height: 600px;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 300px;
  position: relative;

  img {
    width: calc(100% + 400px);
    /* height: 100%; */
    position: absolute;
    top: 0px;
    left: 0;
    z-index: 1;
    margin-left: -311px;
  }
`;
const Form = styled.form`
  width: 60%;
  height: fit-content;
  z-index: 2;
  /* background-color: #cccccc; */

  .form__info {
    display: flex;
    gap: 2%;
    margin-bottom: 40px;
    &__main {
      width: 49%;
      &__label {
        margin-bottom: 5px;
        font-size: 14px;
      }
      input {
        width: calc(100% - 22px);
        outline: none;
        border: 1px solid #cccccc;
        border-radius: 5px;
        padding: 15px 10px;
      }
    }
    &__main--textarea {
      width: 100%;
      &__label {
        margin-bottom: 5px;
        font-size: 14px;
      }
      textarea {
        width: calc(100% - 22px);
        outline: none;
        border: 1px solid #cccccc;
        border-radius: 5px;
        padding: 15px 10px;
        resize: none;
        height: 100px;
      }
    }
  }
`;
const Title = styled.div`
  text-align: center;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 35px;
  z-index: 2;
`;
const SendButton = styled.button`
  width: 140px;
  height: 40px;
  background-color: #0036ac;
  color: white;
  margin-top: 15px;
  outline: none;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  float: right;

  :hover {
    opacity: 0.9;
  }
`;
const FormMain = styled.div`
  width: 100%;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function ContactForm() {
  return (
    <ContactMain>
      <img src="https://akadon.edu.vn/static/media/askbg.24675d33.svg" alt="" />
      <FormMain>
        <Title>Bạn có câu hỏi dành cho chúng tôi?</Title>
        <Form>
          <div className="form__info">
            <div className="form__info__main">
              <div className="form__info__main__label">Họ và tên</div>
              <input type="text" placeholder="Nhập họ tên..." required />
            </div>
            <div className="form__info__main">
              <div className="form__info__main__label">Email</div>
              <input type="email" placeholder="Nhập email..." required />
            </div>
          </div>
          <div className="form__content">
            <div className="form__info__main form__info__main--textarea">
              <div className="form__info__main__label">Nội dung</div>
              <textarea
                placeholder="Quy trình tìm gia sư như thế nào?"
                required
              />
            </div>
          </div>
          <SendButton type="submit">Gửi</SendButton>
        </Form>
      </FormMain>
    </ContactMain>
  );
}
