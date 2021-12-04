import React, { useEffect, useState } from "react";
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
export default function useAddress() : [District[],City[]] {
  const [district, setDistricts] = useState<District[]>([]);
  const [city, setCitys] = useState<City[]>([]);
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
  return [district,city];
}
