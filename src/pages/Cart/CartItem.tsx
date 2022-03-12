import React from 'react';
import { useHistory } from 'react-router';
import { ClassItem } from '../../components/WaitingClassList/ClassItem';
import { ClassItem as IClassItem } from '../../components/WaitingClassList/WaitingClassList';
import { CHECKOUT, COURSE_PATH } from '../../constants/path';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CartItemProps {
  classItem: IClassItem;
}

export const CartItem = ({ classItem }: CartItemProps) => {
  const history = useHistory();   

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };      
  const handleRegisterCourse = () =>{
    history.push(`${CHECKOUT}?id=${classItem.id}`)
  }                                                          

  return (
    <div className="class__items cart__item">
      <div className="cart__item__layer">
        <div className="cart__item__layer--delete" onClick={handleClickOpen}>
          <span>
            <i className="fas fa-trash-alt"></i>
          </span>
          <span>Xóa</span>
        </div>
        <div className="cart__item__layer--detail" onClick={() => history.push(`${COURSE_PATH}?id=${classItem.id}`)}>  
          <span>
            <i className="fas fa-info-circle"></i>
          </span>
          <span>Xem chi tiết</span>
        </div>
        <div className="cart__item__layer--register">
          <span>
            <i className="fas fa-wallet"></i>
          </span>
          <span onClick={handleRegisterCourse}>Đăng ký</span>           
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xóa khóa học"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn xóa khóa học này chứ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleClose} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
     
        <ClassItem classItem={classItem} />  
       
    </div>
  );
};

{
  /* <div className="class__item__uinfo">
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
  Cần gia sư có kinh nghiệm nghe nói đọc viết, phát âm chuẩn dạy kèm cho
  người đ
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
</div> */
}
