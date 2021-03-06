export const convertDate = (now: Date, date: Date) => {
  let timeResult = ``;
  const miliseconds = Math.floor(now.getTime() - date.getTime());
  // return date.getTime();
  if (miliseconds < 1000) {
    timeResult = `vừa mới`;
  } else {
    const seconds = Math.floor(miliseconds / 1000);
    if (seconds < 60) {
      timeResult = `${seconds} giây trước`;
    } else {
      const minute = Math.floor(seconds / 60);
      if (minute < 60) {
        timeResult = `${minute} phút trước`;
      } else {
        const hours = Math.floor(miliseconds / 60);
        if (hours < 24) {
          timeResult = `${minute} giờ trước`;
        } else {
          const day = Math.floor(hours / 24);
          if (day <= 3) {
            timeResult = `${minute} ngày trước`;
          } else {
            timeResult = date.toLocaleString().split(',')[1];
          }
        }
      }
    }
  }

  return timeResult;
};

export const converLearningDate = (time: number) => {
  const index = time.toString().indexOf('.');
  if (index > -1) {
    return time.toString().substring(0, index) + ':30';
  }
  return time + ':00';
};  
