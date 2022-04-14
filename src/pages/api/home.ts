import type { NextApiRequest, NextApiResponse } from 'next'
import getHome from '../../shared/api/home';
import instance from '../../shared/axios';
import { SOURCES } from '@/constants/index';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const source = SOURCES.find(item => item.source == req.query.source)
    instance.defaults.baseURL = source?.url;
    const data = await getHome(Number(req.query.page), req.query.source as string, req.query.type as string, source?.url as string)

    return res.send(data)
}
