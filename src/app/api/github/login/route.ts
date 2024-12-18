// app/api/github/login/route.ts
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    // 환경 변수가 정의되어 있지 않은 경우 에러 처리
    if (!process.env.NEXT_PUBLIC_SERVER_URL) {
        throw new Error('Server URL is not defined');
    }

    // GitHub 로그인 URL로 리다이렉트
    redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/github/login`);
}

// 허용된 HTTP 메서드 정의
export const dynamic = 'force-dynamic';
export const runtime = 'edge'; // Optional: Edge Runtime 사용 시