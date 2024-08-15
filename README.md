# Gemini Proxy on a Cloudflare Worker

This is an attempt to build a barebones HTTP-Gemini proxy on Cloudflare Workers.

The implementation is mostly complete (aside from support for client certificates),
but it's currently broken as there's no way to accept arbitrary self-signed certificates
in Workers for now.

Trying to use `NODE_TLS_REJECT_UNAUTHORIZED = 0` does not work either.

I've opened an feature request for allowing unauthorized certificates here: [cloudflare/workers-sdk #6503](https://github.com/cloudflare/workers-sdk/issues/6503).
