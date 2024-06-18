import { d as db, S as Stockonhand } from './404_BlsOl86u.mjs';
import { or, like } from '@astrojs/db/dist/runtime/virtual.js';

const SEARCH = async ({ request }) => {
  const resc = await request.json();
  try {
    const searchkeyword = resc;
    if (!searchkeyword) {
      return new Response(
        JSON.stringify({
          message: "Please provide all required fields search.",
          success: false
        }),
        {
          status: 404
        }
      );
    }
    let query;
    query = await db.select().from(Stockonhand).where(
      or(
        like(Stockonhand.partnumber, `%${searchkeyword}%`),
        like(Stockonhand.description, `%${searchkeyword}%`),
        like(Stockonhand.types, `%${searchkeyword}%`)
      )
    );
    if (query) {
      return new Response(
        JSON.stringify({
          message: "success",
          data: query,
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

export { SEARCH };
