import { d as db, S as Stockonhand } from './404_BlsOl86u.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const DELETE = async ({ params }) => {
  const id = Number(params.id);
  if (!id) {
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
  try {
    const res = await db.delete(Stockonhand).where(eq(Stockonhand.id, id));
    if (res) {
      return new Response(
        JSON.stringify({
          message: "Delete successful",
          success: true
        }),
        {
          status: 200
        }
      );
    } else {
      throw new Error("ID is not right ,Delete is cancel");
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
const PATCH = async ({ params, request }) => {
  const { id } = params;
  const { partnumber, description, qty, url, safeqty, types } = await request.json();
  if (!id || !partnumber || !description || qty === void 0 || !url || safeqty === void 0) {
    return new Response(
      JSON.stringify({
        message: "Please provide all required fields.",
        success: false
      }),
      {
        status: 400
      }
    );
  }
  try {
    const res = await db.update(Stockonhand).set({
      partnumber,
      description,
      qty: Number(qty),
      url,
      safeqty: Number(safeqty),
      types
    }).where(eq(Stockonhand.id, Number(id)));
    if (res) {
      return new Response(
        JSON.stringify({
          message: "Update successful",
          success: true
        }),
        {
          status: 200
        }
      );
    } else {
      throw new Error("Update failed");
    }
  } catch (e) {
    console.error("Patch ERROR");
    return new Response(
      JSON.stringify({
        message: e.message || "Internal Server Error",
        success: false
      }),
      {
        status: 500
      }
    );
  }
};

export { DELETE, PATCH };
