/**
 * Edge Runtime (experimental)
 */
import { type NextRequest } from 'next/server';
import fetchAdapter from '@vespaiach/axios-fetch-adapter';
import axios from "axios";
import { SOURCES } from "@/constants/index";

export const config = {
  runtime: 'experimental-edge',
};

const proxy = async (req: NextRequest) => {
  axios.defaults.adapter = fetchAdapter;

  // Get the page from the url params
  const urlParams = new URLSearchParams(req.nextUrl.search);
  const _url = urlParams.get("url") as string;
  const _source = urlParams.get("source");

  const source = SOURCES.find(item => item.source == _source);

  const r = await fetch(_url, {
    headers: {
      referer: source?.url!,
    },
  });

  const reader = r.body?.getReader();

  const response = new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader!.read();

        // When no more data needs to be consumed, break the reading
        if (done) {
          break;
        }

        // Enqueue the next data chunk into our target stream
        controller.enqueue(value);
      }

      // Close the stream
      controller.close();
      reader?.releaseLock();
    },
  });

  return new Response(response);
};

export default proxy;
