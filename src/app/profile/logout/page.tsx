'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { getCookie, deleteCookie } from 'utils/cookie'; // deleteCookie 함수 추가
import { redirect } from 'next/navigation';

export default function SignIn() {
    
    React.useEffect(() => {
        deleteCookie('username');
        redirect('/auth/sign-in');
    }, []);

    return (
        <div>
            {/* 내용 */}
        </div>
    );
}

