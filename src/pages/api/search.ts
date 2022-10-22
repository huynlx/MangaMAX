/**
 * Edge Runtime (experimental)
 */
import Middleware from '@/core/middleware';
import { NextMiddleware, NextResponse } from 'next/server';

const handler: NextMiddleware = async (req, ev) => {
    // Get the page from the url params
    const urlParams = new URLSearchParams(req.nextUrl.search);

    const _source = urlParams.get("source");
    const _page = urlParams.get("page");
    const _keyword = urlParams.get('keyword');

    const routes = new Middleware({
        _page,
        _source,
        _keyword
    });

    const data = await routes.getSearch();

    return NextResponse.json(data);
};

export const config = {
    runtime: 'experimental-edge',
};

export default handler;
