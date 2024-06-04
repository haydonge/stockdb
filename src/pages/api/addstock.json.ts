import type { APIRoute } from "astro";// Astro 框架提供的类型，用于定义 API 路由处理程序的接口。
import { Stockonhand, db, eq} from "astro:db";
import sanitize from "sanitize-html"; //用于清理和过滤 HTML 内容


//定义了一个名为 POST 的路由处理程序，这是一个异步函数，接收一个包含 request 的参数对象。
//使用 await request.json() 从请求中提取 JSON 数据，并将其存储在 data 变量中。
export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  // console.log(data)
//小心谨慎模型
  try {
    const { partnumber, description, qty, url, safeqty  } = data; //解析data数据

    if (!partnumber || !description || !url   ){
      return new Response(
        JSON.stringify({
          message: "Please provide all required fields add-stock.",
          success: false,
        }),
        {
          status: 404,
        }
      );
    }
    // const existingItems = await db.select().from(Stockonhand).where(eq(Stockonhand.partnumber, partnumber));

    // if (existingItems.length > 0) {
    //     const existingItem = existingItems[0];
    //     const userConfirmed = await promptUserConfirmation(`Part number ${partnumber} exists. Do you want to update its quantity?`);

    //     if (userConfirmed) {
    //         await db.update(Stockonhand).set({ qty: existingItem.qty + quantity }).where(eq(Stockonhand.partnumber, partnumber));
    //     }
    // } else {
    //     await db.insert(Stockonhand).values({
    //         partnumber,
    //         description,
    //         qty: quantity,
    //         url,
    //         safeqty: safeQuantity,
    //     });
    // }






    const res = await db.insert(Stockonhand).values({
      partnumber: partnumber,
      description: description,
      qty:qty,
      url:url,
      safeqty:safeqty,
    });

    if (res) {
      return new Response(
        JSON.stringify({
          message: "success",
          data: res,
          success: true,
        }),
        {
          status: 200,
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
        success: false,
      }),
      {
        status: 404,
      }
    );
  }
};
