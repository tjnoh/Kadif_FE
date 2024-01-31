'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie, getNameCookie } from 'utils/cookie'; // deleteCookie 함수 추가
import { redirect } from 'next/navigation';
import { fetchLogic } from 'utils/fetchData';
import Swal from 'sweetalert2';

export default function SignIn() {
    const router = useRouter();
    React.useEffect(() => {
        const fetchLogout = async () => {
            const cookieName = await getNameCookie();
            Swal.fire({
                title: '로그아웃',
                html: '<div style="font-size: 14px;">로그아웃 하시겠습니까?.</div>',
                confirmButtonText: '확인',
                confirmButtonColor: 'orange',
                cancelButtonText:'아니오',
                cancelButtonColor:'#d33',
                showCancelButton:true,
                customClass: {
                    popup: 'custom-popup-class',
                    title: 'custom-title-class',
                    // loader: 'custom-content-class',
                    confirmButton: 'custom-confirm-button-class',
                    htmlContainer: 'custom-content-class',
                    container: 'custom-content-class'
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    deleteCookie('username');
                    await fetchLogic(`log/logout?username=${cookieName}`);
                    router.push('/auth/sign-in');
                }else{
                    window.history.back();
                }
            })

        }
        fetchLogout();
    }, []);



    return (
        <div>
            {/* 내용 */}
        </div>
    );
}

