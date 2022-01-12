import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface ToastProps {}

export const Toast = (props: ToastProps) => {

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
