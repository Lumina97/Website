import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import * as https from "https";

export const rootImageFilePath = path.join(__dirname, "../Images");
path.normalize(rootImageFilePath);

export async function DownloadFilesFromLinks(links: string[], ID: string) {
  try {
    if (!links) throw new Error("Provided links were not valid!");
    for (const link of links) {
      await DownloadHTTPSFile(link, ID);
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}

async function CreateDirectory(destination: string) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(destination)) {
      fs.mkdir(destination, { recursive: true }, (error) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve("created file path");
        }
      });
    } else {
      resolve("filepath already exists");
    }
  });
}

async function DownloadHTTPSFile(link: string, ID: string) {
  const baseDest = path.join(rootImageFilePath, ID);
  path.normalize(baseDest);

  const fileLocationArray = link.split("/");
  const fileLocation = fileLocationArray[fileLocationArray.length - 1];

  await CreateDirectory(baseDest).catch((err) => {
    console.log(err);
    Promise.reject();
  });

  const dest = path.join(baseDest, fileLocation);
  path.normalize(dest);

  return new Promise((resolve, reject) => {
    const protocol = link.includes("https") ? https : http;
    const request = protocol.get(link, (res) => {
      if (res.statusCode !== 200) {
        reject(
          new Error(`Failed to download file: Status code ${res.statusCode}`)
        );
        res.resume();
        return;
      }

      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);

      fileStream.on("error", (error) => {
        reject(error);
      });

      fileStream.on("finish", () => {
        fileStream.close(() => resolve("Finished"));
      });
    });

    request.on("error", (error) => {
      reject(error);
    });
  });
}
