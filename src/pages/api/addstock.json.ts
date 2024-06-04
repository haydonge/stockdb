import type { APIRoute } from "astro";
import { Stockonhand, db, eq} from "astro:db";
import sanitize from "sanitize-html"; 



//定义了一个名为 POST 的路由处理程序，这是一个异步函数，接收一个包含 request 的参数对象。
//使用 await request.json() 从请求中提取 JSON 数据，并将其存储在 data 变量中。
export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  // console.log(data)
//小心谨慎模型
  try {
    const { partnumber, description, qty, url, safeqty ,userConfirmed  } = data; //解析data数据
    const quantity = parseInt(qty, 10);
    const safeQuantity = parseInt(safeqty, 10);
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
      const existingItems = await db.select().from(Stockonhand).where(eq(Stockonhand.partnumber, partnumber));
      console.log(existingItems);

    if (existingItems.length > 0) {
        // 返回一个响应，指示需要用户确认
        if (!userConfirmed) {
              const existingItem = existingItems[0];
              // 返回一个响应，指示需要用户确认并包括当前数量
              return new Response(
                JSON.stringify({
                  message: `Part number ${partnumber} exists with quantity ${existingItem.qty}. Do you want to update its quantity with the new quantity ${quantity}?`,
                  success: false,
                  requiresConfirmation: true,
                  currentQty: existingItem.qty
                }),
                {
                  status: 409, // 409 Conflict 状态码表示需要客户端确认
                }
              );
        } else {
                const existingItem = existingItems[0];
                const updates = await db.update(Stockonhand).set({ qty: existingItem.qty + quantity }).where(eq(Stockonhand.partnumber, partnumber));
                if( updates){
                return new Response(
                  JSON.stringify({
                    message: "success",
                    data: updates,
                    success: true,
                  }),
                  {
                    status: 200,
                  }
                );
              } else {
                throw new Error("There was a problem with the db response.");
              }
        }
    }  else {  //没有类似Partnumber，直接插入数据
            const res = await db.insert(Stockonhand).values({
                  partnumber,
                  description,
                  qty: quantity,
                  url,
                  safeqty: safeQuantity,
              });
              console.log(res);
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

// async function promptUserConfirmation(message: string): Promise<boolean> {
//   console.log(message);
//   return true; // 模拟处理，假设用户总是确认
// }

