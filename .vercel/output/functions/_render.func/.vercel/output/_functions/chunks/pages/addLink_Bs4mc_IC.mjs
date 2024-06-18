import { d as db, L as Link } from './404_BlsOl86u.mjs';
import sanitize from 'sanitize-html';

const POST = async ({ request }) => {
  const data = await request.json();
  try {
    const { title, description, url, isRead } = data;
    if (!title || !description || !url || typeof isRead !== "boolean") {
      return new Response(
        JSON.stringify({
          message: "Please provide all required fields.",
          success: false
        }),
        {
          status: 404
        }
      );
    }
    const res = await db.insert(Link).values({
      title: sanitize(title),
      description: sanitize(description),
      url: sanitize(url),
      isRead
    });
    if (res) {
      return new Response(
        JSON.stringify({
          message: "success",
          data: res,
          success: true
        }),
        {
          status: 200
        }
      );
    } else {
      throw new Error("There was a problem with the db response.");
    }
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: e,
        success: false
      }),
      {
        status: 404
      }
    );
  }
};

export { POST };
