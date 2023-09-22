/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // @ts-ignore
    res.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/github/login`);
}
