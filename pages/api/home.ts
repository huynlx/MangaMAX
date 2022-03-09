// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getHome from '../../shared/api/home2';
import instance from '../../shared/axios';
import { SOURCES } from '../../shared/constants';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const source = SOURCES.find(item => item.source == req.query.source)
    instance.defaults.baseURL = source?.url;
    console.log(source?.url);
    
    const data = await getHome(Number(req.query.page), req.query.source as string, req.query.type as string, source?.url as string)

    console.log('server side source:', source?.name);
    console.log('server side baseUrl:', instance.defaults.baseURL);


    return res.send(data)
}
