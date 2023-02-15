import { promises } from "node:fs";

const deleteFile = async (filename: string) => {
  try {
    await promises.stat(filename);
  } catch(e) {
    console.log(e)
    return;
  }

  await promises.unlink(`${filename}`);
};

export { deleteFile };
