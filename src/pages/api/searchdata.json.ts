import type { APIRoute } from "astro";// Astro 框架提供的类型，用于定义 API 路由处理程序的接口。
import {like , or } from "astro:db"
import { Stockonhand, db } from "astro:db";

//定义了一个名为 POST 的路由处理程序，这是一个异步函数，接收一个包含 request 的参数对象。
//使用 await request.json() 从请求中提取 JSON 数据，并将其存储在 data 变量中。
export const SEARCH: APIRoute = async ({ request }) => {
  const resc = await request.json();


  try {
    const partnumber  = resc; //解析data数据

    if (!partnumber ){
      return new Response(
        JSON.stringify({
          message: "Please provide all required fields search.",
          success: false,
        }),
        {
          status: 404,
        }
      );
    }
  

    let query;
    

    // console.log(query);
    query = await db.select().from(Stockonhand).where(
            or(
              like(Stockonhand.partnumber, `%${partnumber}%`),
              like(Stockonhand.description, `%${partnumber}%`)
            )
          );
    if (query) {
      return new Response(
        JSON.stringify({
          message: "success",
          data: query,
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
