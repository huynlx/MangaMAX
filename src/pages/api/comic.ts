import type { NextApiRequest, NextApiResponse } from 'next'
import instance from '@/utils/axios';
import { SOURCES } from '@/constants/index';
import { getComicInfo } from '@/shared/api/comic';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const source = SOURCES.find(item => item.source == req.query.source)
    instance.defaults.baseURL = source?.url;
    const data = await getComicInfo(source, req.query.slug as string)

    return res.send(data)
}
