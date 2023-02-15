import { Readable } from "node:stream";

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

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStream()
})