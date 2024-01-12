'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { getCookie, deleteCookie } from 'utils/cookie'; // deleteCookie 함수 추가
import { redirect } from 'next/navigation';

export default function SignIn() {
    
    React.useEffect(() => {
        const username = getCookie('username');
        // 쿠키 삭제
        deleteCookie(username);
        // username 쿠키가 있을 경우 리다이렉트
        if (username) {
            redirect('/auth/sign-in');
        }
    }, []);

    return (
        <div>
            {/* 내용 */}
        </div>
    );
}

