export const getCookie = (cookieName: string) => {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 document 객체가 없으므로 여기서 처리를 중단
    return null;
  }

  const cookie = document.cookie;
  const useCookie = cookie
    .split(';')
    .map((cookiePart) => cookiePart.trim())
    .find((cookiePart) => cookiePart.startsWith(`${cookieName}=`));

  if (useCookie) {
    const cookieValue = useCookie.split('=')[1];
    return cookieValue;
  }
};

export const deleteCookie = (cookieName:string) => {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 document 객체가 없으므로 여기서 처리를 중단
    return;
  }

  // 쿠키의 만료 날짜를 과거로 설정하여 삭제
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};


