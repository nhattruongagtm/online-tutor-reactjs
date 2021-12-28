export const convertDate = (date: Date) => {
  let timeResult = ``;
  const miliseconds = Math.floor(new Date().getTime() - date.getTime());
  // return date.getTime();
  if (miliseconds < 1000) {
    timeResult = `vừa mới`;
  } else {
      const seconds = Math.floor(miliseconds/1000);
      if(seconds < 60){
        timeResult = `${seconds} giây trước`;  
      }
      else {
        const minute = Math.floor(seconds/60);
        if(minute < 60){
            timeResult = `${minute} phút trước`;  
        }
        else {
            const hours = Math.floor(miliseconds / 60);
            if(hours < 24){
                timeResult = `${minute} giờ trước`;  
            }
            else {
                const day = Math.floor(hours/24);
                if(day <= 3){
                    timeResult = `${minute} ngày trước`;  
                }
                else{
                    timeResult = date.toLocaleString();
                }

            }
        }
      }
    
  }

  return timeResult;  
};
