import * as fs from "fs";
import * as path from "path";
import { rootImageFilePath } from "./FileDownloader";
import archiver from "archiver";

export const ZipFile = async (
  ID: string
): Promise<{ result: boolean; data: string }> => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(rootImageFilePath, ID) + ".zip";
    const output = fs.createWriteStream(filepath);
    const archive = archiver.create("zip", {
      zlib: { level: 9 },
    });

    output.on("error", (err) => {
      console.log("Error while writing the zip file!");
      console.log(err);
      reject({ result: false, data: err });
    });

    output.on("close", () => {
      resolve({ result: true, data: filepath });
    });

    output.on("end", () => {
      console.log("Data has been drained!");
    });

    archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        console.log("Warning while creating archive!");
        console.log(err);
      } else {
        console.log("Error while creating archive!");
        console.log(err);
        reject({ result: false, data: err });
      }
    });

    archive.on("error", (err: Error) => {
      console.log("Error while creating archive!");
      console.log(err);
      reject({ result: false, data: err });
    });

    archive.pipe(output);

    const file = path.join(rootImageFilePath, ID);
    archive.directory(file, "images");
    archive.finalize();
  });
};
