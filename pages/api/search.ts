import type { NextApiRequest, NextApiResponse } from 'next'
import getSearch from '../../shared/api/search';
import instance from '../../shared/axios';
import { SOURCES } from 'constants/index';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const source = SOURCES.find(item => item.source == req.query.source)
    instance.defaults.baseURL = source?.url;
    const data = await getSearch(Number(req.query.page), req.query.source as string, source?.url as string, req.query.keyword as string)

    return res.send(data)
}
