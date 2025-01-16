import { randomUUID } from "crypto";
import * as fs from "fs";
import { DownloadFilesFromLinks } from "./ImageGathererUtils/FileDownloader";
import { ZipFile } from "./ImageGathererUtils/FileZipper";

export async function POST(req: Request) {
  try {
    const { links } = await req.json();
    if (!Array.isArray(links) || links.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid links array" }), {
        status: 400,
      });
    }

    const ID = randomUUID();
    const files = await DownloadFilesFromLinks(links, ID);
    if (!files)
      throw new Error(`There was an error downloading files: ${files}`);

    const zip = await ZipFile(ID);
    if (zip.result === false)
      throw new Error(`there was an error zipping the files!`);
    const fileBuffer = fs.readFileSync(zip.data);
    return new Response(new Blob([fileBuffer]), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="files.zip"',
      },
    });
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ error: "There has been an error getting your images" }),
      {
        status: 400,
      }
    );
  }
}
