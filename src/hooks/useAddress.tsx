import { RSA_SSLV23_PADDING } from 'constants';
import React, { useEffect, useState } from 'react';
export interface District {
  name_with_type: string;
  parent_code: string;
  slug: string;
}
export interface City {
  name_with_type: string;
  code: string;
  slug: string;
}
export default function useAddress(): [District[], City[]] {
  const [district, setDistricts] = useState<District[]>([]);
  const [city, setCitys] = useState<City[]>([]);
  // get citys data
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await fetch(
          'https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/tinh_tp.json'
        ).then((res) => res.json());

        let list: City[] = [];
        Object.keys(data).map((item) => {
          const name = data[item].name_with_type;
          const code = data[item].code;
          const slug = data[item].slug;

          const newCity = { name_with_type: name, code: code, slug: slug };

          list.push(newCity);
        });
        setCitys(list);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCities();
  }, []);

  // get districts data
  useEffect(() => {
  
    const fetchCities = async () => {
      try {
        const data = await fetch(
          'https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/quan_huyen.json'
        ).then((res) => res.json());

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
      } catch (e) {
        console.log(e);
      }
    };
    fetchCities();
  }, []);
  return [district, city];
}
