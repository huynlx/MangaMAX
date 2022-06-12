import type { NextApiRequest, NextApiResponse } from 'next'
import instance from '@/utils/axios';
import { SOURCES } from '@/constants/index';
import { getChapters } from '@/shared/api/chapters';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const source = SOURCES.find(item => item.source == req.query.source)
    instance.defaults.baseURL = source?.url;
    const data = await getChapters(source, req.query.slug as string, req.query.chapSlug as string, req.query.id as string)

    return res.send(data)
}