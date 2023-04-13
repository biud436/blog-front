import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    res.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/github/login`);
}
