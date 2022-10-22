// import type { NextApiRequest, NextApiResponse } from 'next'
import getHome from '@/shared/api/home';
// import instance from '@/utils/axios';
import { SOURCES } from '@/constants/index';

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const source = SOURCES.find(item => item.source == req.query.source)
//     instance.defaults.baseURL = source?.url;
//     const data = await getHome(Number(req.query.page), req.query.source as string, req.query.type as string, source?.url as string)

//     return res.send(data)
// }

/**
 * Edge Runtime (experimental)
 */
import { NextRequest, NextResponse, NextMiddleware, NextFetchEvent } from 'next/server';
import fetchAdapter from '@vespaiach/axios-fetch-adapter';
import instance from '@/utils/axios';

export const middleware: NextMiddleware = async (req: NextRequest, ev: NextFetchEvent) => {
    instance.defaults.adapter = fetchAdapter;

    // Get the page from the url params
    const urlParams = new URLSearchParams(req.nextUrl.search);
    const _source = urlParams.get("source");
    const _page = urlParams.get("page");
    const _type = urlParams.get('type');

    const source = SOURCES.find(item => item.source == _source);
    instance.defaults.baseURL = source?.url;

    const data = await getHome(Number(_page), _source as string, _type as string, source?.url as string);

    return NextResponse.json(data);
};

export const config = {
    runtime: 'experimental-edge',
};