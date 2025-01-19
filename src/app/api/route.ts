import fetch from "node-fetch";

type ImageResponse = {
  data: string;
  type: string;
};

export async function POST(req: Request) {
  try {
    const { links } = await req.json();
    if (!links || !Array.isArray(links)) {
      throw new Error("No links received");
    }

    const responses = await Promise.all(links.map((url) => fetch(url)));

    const images: ImageResponse[] = await Promise.all(
      responses.map(async (response) => {
        const contentType = response.headers.get("Content-Type");
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Data = buffer.toString("base64");
        return {
          data: `data:${contentType};base64,${base64Data}`,
          type: contentType || "image/jpeg",
        };
      })
    );

    return new Response(JSON.stringify({ images }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
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
