/**
 * Edge Runtime (experimental)
 */
import Middleware from '@/core/middleware';
import { NextMiddleware, NextResponse } from 'next/server';

const handler: NextMiddleware = async (req, ev) => {
    // Get the page from the url params
    const urlParams = new URLSearchParams(req.nextUrl.search);

    const _source = urlParams.get("source");
    const _slug = urlParams.get("slug");
    const _chapSlug = urlParams.get("chapSlug");
    const _id = urlParams.get("id");

    const routes = new Middleware({
        _source,
        _slug,
        _chapSlug,
        _id
    });

    const data = await routes.getChapter();

    return NextResponse.json(data);
};

export const config = {
    runtime: 'experimental-edge',
};

export default handler;