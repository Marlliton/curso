import { createServer } from "node:http";
import { Transform } from "node:stream";

class InvertNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

const server = createServer((req, res) => {
  return req.pipe(new InvertNumber()).pipe(res);
});

server.listen(3334, null, null, () => console.log("Servidor stream"));
