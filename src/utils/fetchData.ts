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