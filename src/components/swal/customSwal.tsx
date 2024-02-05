import React from 'react';
import Swal from 'sweetalert2';

const customSwal = () => {

}

// flag 1 : 폼 제출 시 사용자 계정명과 비밀번호의 길이를 다시 확인
// flag 2 : 정규식 비교 후 정규식에 만족하지 못할 때
// flag 3 : 비밀번호와 비밀번호 확인을 비교하여 다를 때
// flag 4 : 현재 비밀번호가 맞지 않았을 때(비밀번호 주기변경 부분)
// flag 5 : 나머지 에러
// state : new, modify, edit
const userSwal = (flag:number, state:string, confirmBtnColor?:string, content?:string) => {
    let title;
    let text;
    const stateTxt:string = state === 'new' ? '사용자 계정 생성' : (
                            state === 'modify' ? '사용자 계정 수정'
                            : '본인 수정'
    );

    if(flag === 1) {
        title = `${stateTxt} 오류`;
        text = '사용자 계정명은 5자 이상, 15자 이하이어야 합니다.';
    } else if(flag === 2) {
        title = `${stateTxt} 오류`;
        text = '비밀번호 조건이 맞지 않습니다.';
    } else if(flag === 3) {
        title = `${stateTxt} 오류`;
        text = '비밀번호가 같지 않습니다.';
    } else if(flag === 4) {
        title = `${stateTxt} 오류`;
        text = '현재 비밀번호가 일치하지 않습니다.';
    } else {
        title = `${stateTxt} 에러`;
        text = content;
    }

    Swal.fire({
        title: title,
        html: `<div style="font-size: 14px;">${text}</div>`,
        confirmButtonText: '닫기',
        confirmButtonColor: confirmBtnColor !== undefined ? confirmBtnColor : 'orange',
        focusConfirm: false,
        customClass: {
            popup: 'custom-popup-class',
            title: 'custom-title-class',
            htmlContainer: 'custom-content-class',
            container: 'custom-content-class',
            confirmButton: 'custom-confirm-button-class'
        },
    })
}

export {customSwal, userSwal};