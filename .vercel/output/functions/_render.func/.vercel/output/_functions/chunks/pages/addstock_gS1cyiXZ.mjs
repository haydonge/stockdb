import { d as db, S as Stockonhand } from './404_BlsOl86u.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const POST = async ({ request }) => {
  const data = await request.json();
  try {
    const { partnumber, description, qty, url, safeqty, userConfirmed } = data;
    const quantity = parseInt(qty, 10);
    const safeQuantity = parseInt(safeqty, 10);
    if (!partnumber || !description || !url) {
      return new Response(
        JSON.stringify({
          message: "Please provide all required fields add-stock.",
          success: false
        }),
        {
          status: 404
        }
      );
    }
    const existingItems = await db.select().from(Stockonhand).where(eq(Stockonhand.partnumber, partnumber));
    console.log(existingItems);
    if (existingItems.length > 0) {
      if (!userConfirmed) {
        const existingItem = existingItems[0];
        return new Response(
          JSON.stringify({
            message: `Part number ${partnumber} exists with quantity ${existingItem.qty}. Do you want to update its quantity with the new quantity ${quantity}?`,
            success: false,
            requiresConfirmation: true,
            currentQty: existingItem.qty
          }),
          {
            status: 409
            // 409 Conflict 状态码表示需要客户端确认
          }
        );
      } else {
        const existingItem = existingItems[0];
        const updates = await db.update(Stockonhand).set({ qty: existingItem.qty + quantity }).where(eq(Stockonhand.partnumber, partnumber));
        if (updates) {
          return new Response(
            JSON.stringify({
              message: "success",
              data: updates,
              success: true
            }),
            {
              status: 200
            }
          );
        } else {
          throw new Error("There was a problem with the db response.");
        }
      }
    } else {
      const res = await db.insert(Stockonhand).values({
        partnumber,
        description,
        qty: quantity,
        url,
        safeqty: safeQuantity
      });
      console.log(res);
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
