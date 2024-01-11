export const fetchLogic = async (url: string, data?: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const response = await fetch('http://localhost:8000/' + url);
      const result = await response.json();

      // 전달된 useState 함수를 사용하여 상태를 업데이트
      data(result);
    } catch (error) {
      console.log(url + ' error 발생 : ' + error);
    }
  }

export const fetchPost = async (url: string, body?: any) => {
    try {
      const response = await fetch('http://localhost:8000/' + url, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body:JSON.stringify(body)
      });
      const result = await response.json();
      console.log("result : ", result);
      // 전달된 useState 함수를 사용하여 상태를 업데이트
      //data(result);
    } catch (error) {
      console.log(url + ' error 발생 : ' + error);
    }
  }