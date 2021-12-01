import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../SignUp/infoValidation.scss";
import {updateStatus} from '../../../actions/signup'

interface District {
  name_with_type: string;
  parent_code: string;
  slug: string;
}
interface City {
  name_with_type: string;
  code: string;
  slug: string;
}
export default function InfoValidation() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [citys, setCitys] = useState<City[]>([]);
  const [chooseCity, setChooseCity] = useState<string>("");
  const [chooseDistrict, setChooseDistrict] = useState<string>("");
  const dispatch = useDispatch();

  const [getDistrictsByID, setGetDistrictsByID] = useState<District[]>([]);

  useEffect(()=>{
    const districtByID: District[] = districts.filter(
        (item) => item.parent_code === chooseCity
      );
      setGetDistrictsByID(districtByID);

  },[chooseCity]);


  // get citys data
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/tinh_tp.json"
    )
      .then((response) => response.json())
      .then((data) => {
        let list: City[] = [];
        Object.keys(data).map((item) => {
          const name = data[item].name_with_type;
          const code = data[item].code;
          const slug = data[item].slug;

          const newCity = { name_with_type: name, code: code, slug: slug };

          list.push(newCity);
        });
        setCitys(list);
      })
      .catch((e) => console.log(e));
  }, []);

  // get districts data
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/quan_huyen.json"
    )
      .then((response) => response.json())
      .then((data) => {
        let list: District[] = [];
        Object.keys(data).map((item) => {
          const name = data[item].name_with_type;
          const code = data[item].parent_code;
          const slug = data[item].slug;

          const newDistrict = {
            name_with_type: name,
            parent_code: code,
            slug: slug,
          };

          list.push(newDistrict);
        });
        setDistricts(list);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleSignUp = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateStatus(3)); 
  }

  return (
    <form className="info__validation" onSubmit={handleSignUp}>
      <div className="info__validation__input">
        <div className="info__validation__input__label">
          <div>
            Họ và tên: <span>*</span>
          </div>
        </div>
        <input type="text" placeholder="Nhập họ tên" />
      </div>
      <div className="info__validation__input">
        <div className="info__validation__input__label">
          <div>Giới tính:</div>
        </div>
        <select name="gender" id="">
          <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
        </select>
      </div>
      <div className="info__validation__input">
        <div className="info__validation__input__label">
          <div>
            Thành phố: <span>*</span>
          </div>
        </div>
        <select
          name="city"
          id=""
          onChange={(e) => {
            setGetDistrictsByID([]);
            setChooseCity(e.target.value.toString());
          }}
        >
          <option value="">Chọn Thành Phố</option>

          {citys.map((city) => {
            return (
              <option value={city.code} key={city.code}>
                {city.name_with_type}
              </option>
            );
          })}
        </select>
      </div>
      <div className="info__validation__input">
        <div className="info__validation__input__label">
          <div>
            Quận/Huyện: <span>*</span>
          </div>
        </div>
        <select name="district" id="" onChange={(e)=> setChooseDistrict(e.target.value)}>
          <option value="">Chọn Quận/Huyện</option>
          {getDistrictsByID.length > 0 &&
            getDistrictsByID.map((district, index) => {
              return (
                <option value={district.slug} key={index}>
                  {district.name_with_type}
                </option>
              );
            })}
        </select>
      </div>
      <div className="info__validation__input">
        <div className="info__validation__input__label">
          <div>
            Số điện thoại: <span>*</span>
          </div>
        </div>
        <input type="number" placeholder="0123-456-789" />
      </div>
      <div className="info__validation__input">
        <div className="info__validation__input__label">
          <div>Email:</div>
        </div>
        <input type="text" disabled value="" />
      </div>
      <label htmlFor="terms" className="info__validation__terms">
        <input type="checkbox" name="" id="terms" />
        Tôi chấp nhận <span>điều khoản</span> sử dụng
      </label>

      <div className="signup__form__nav">
        <div className="signup__form__nav__back">
          {/* onClick={() => setType(-1)} */}
          <i className="fas fa-arrow-left"></i>Quay lại
        </div>
        <button type="submit">Tiếp theo</button>
      </div>
    </form>
  );
}
