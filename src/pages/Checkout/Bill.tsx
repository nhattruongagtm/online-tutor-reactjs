import { Button } from 'antd';
import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { checkoutApi } from '../../api/checkoutApi';
import Loading from '../../components/Common/Loading';
import { ME_PATH, PROFILE_PATH,COURSE_PATH } from '../../constants/path';
import { CheckoutResp } from '../../models/response';
interface Props {}

const Bill = (props: Props) => {
  const [bill, setBill] = useState<CheckoutResp>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const history = useHistory();

  const path = useLocation().search;
  const objectPath = qs.parse(path);
  const id = objectPath.id;

  useEffect(() => {
    const loadBill = async () => {
      try {
        setIsLoading(true);
        const resp = await checkoutApi.getDetailCheckout(Number(id));
        const { data } = resp;
        if (data) {
          setBill(data);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    loadBill();
  }, []);
  return (
    <>
      {bill && (
        <div className="checkout__bill">
          <div className="bill__main">
            <div className="checkout__title">
              Thanh toán thành công!{' '}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/800px-Sign-check-icon.png"
                alt=""
              />
            </div>
            <div className="checkout__items">
              <div className="checkout__item">
                <div className="check__label">Hình thức thanh toán:</div>
                <div className="check__content">
                  Paypal{' '}
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                  />
                </div>
              </div>
              <div className="checkout__item">
                <div className="check__label">Tên khách hàng:</div>
                <div className="check__content">{bill.customerName}</div>
              </div>
              <div className="checkout__item">
                <div className="check__label">Tên lớp học:</div>
                <div className="check__content">{bill.className}</div>
              </div>
              <div className="checkout__item">
                <div className="check__label">Nội dung:</div>
                <div className="check__content">Thanh toán tiền học phí</div>
              </div>
              <div className="checkout__item">
                <div className="check__label">Thành tiền:</div>
                <div className="check__content price">{bill.amount} VNĐ</div>
              </div>
              <div className="checkout__item">
                <div className="check__label">Ngày thanh toán:</div>
                <div className="check__content">
                  {new Date(bill.createdDate).toLocaleDateString()}
                </div>
              </div>
              <div className="checkout__action">
                <Button
                  onClick={() => history.push(`${ME_PATH}${COURSE_PATH}`)}
                >
                  Quay về
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Bill;
