import type { APIRoute } from "astro";
import { Stockonhand, db, eq } from "astro:db";


export const DELETE: APIRoute = async ({ params }) => {
  const id = Number(params.id);

  if (!id) {
    return new Response(
      JSON.stringify({
        message: "Please provide all required fields.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  try {
    const res = await db.delete(Stockonhand).where(eq(Stockonhand.id, id));
    if (res) {
      return new Response(null, { status: 204 });
    } else {
      throw new Error("prob, bob");
    }
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: e,
        success: false,
      }),
      {
        status: 404,
      }
    );
  }
};

// patch 功能我还没有动。。。。先存

export const PATCH: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const { partnumber, description, qty, url, safeqty } = await request.json();

  if (!id || !partnumber || !description || qty === undefined || !url || safeqty === undefined) {
    return new Response(
      JSON.stringify({
        message: "Please provide all required fields.",
        success: false,
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const res = await db
      .update(Stockonhand)
      .set({
        partnumber,
        description,
        qty: Number(qty),
        url,
        safeqty: Number(safeqty),
      })
      .where(eq(Stockonhand.id, Number(id)));

    if (res) {
      return new Response(
        JSON.stringify({
          message: "Update successful",
          success: true,
        }),
        {
          status: 200,
        }
      );
    } else {
      throw new Error("Update failed");
    }
  } catch (e) {
    console.error("Patch ERROR");
    return new Response(
      JSON.stringify({
        message: e.message ||"Internal Server Error",
        success: false,
      }),
      {
        status: 500,
      }
    );
  }
};