import type { NextApiRequest, NextApiResponse } from 'next'
import instance from '../../shared/axios';
import { SOURCES } from '@/constants/index';
import { getChapter } from '@/shared/api/chapter';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const source = SOURCES.find(item => item.source == req.query.source)
    instance.defaults.baseURL = source?.url;
    const data = await getChapter(source, req.query.slug as string, req.query.chapSlug as string, req.query.id as string)

    return res.send(data)
}