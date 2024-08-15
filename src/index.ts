import { connect } from "cloudflare:sockets";

export default {
    async fetch(request): Promise<Response> {
        try {
            const address = new URL(request.url).pathname.substring(1);
            const url = new URL(address);
            url.port = url.port.length == 0 ? "1965" : url.port;

            const socketAddress: SocketAddress = {
                hostname: url.hostname,
                port: Number(url.port),
            };
            const socketOptions: SocketOptions = {
                secureTransport: "starttls",
                allowHalfOpen: false
            };
            const socket = connect(socketAddress, socketOptions).startTls();

            const writer = socket.writable.getWriter();
            const encoder = new TextEncoder();
            const encoded = encoder.encode(`${url.pathname}\r\n`);
            await writer.write(encoded);

            return new Response(socket.readable, { headers: { "Content-Type": "text/plain" } });
        } catch (error) {
            return new Response("Socket connection failed: " + error, { status: 500 });
        }
    },
} satisfies ExportedHandler<Env>;
