import { stdout } from "node:process";
import { Readable, Transform, Writable } from "node:stream";

class OneToHundredStream extends Readable {
  index = -10;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (this.index > 100) {
        this.push(null);
      } else {
        const buff = Buffer.from(String(i));
        this.push(buff);
      }
    }, 300);
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

class InvertNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

new OneToHundredStream().pipe(new InvertNumber()).pipe(new MultiplyByTenStream());
