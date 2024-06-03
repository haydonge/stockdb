import type { APIRoute } from 'astro';
import { db, Stockonhand, eq } from 'astro:db';

export const POST: APIRoute = async ({ request }) => {
    const item = await request.json();
    console.log("good")
    try {
       
            const { partnumber, description, qty, url, safeqty } = item;
            const quantity = parseInt(qty, 10);
            const safeQuantity = parseInt(safeqty, 10);

            if (!partnumber || !description || !url) {
                return new Response(
                    JSON.stringify({ message: "Please provide all required fields.", success: false }),
                    { status: 400, headers: { 'Content-Type': 'application/json' } }
                );
            }

            const existingItems = await db.select().from(Stockonhand).where(eq(Stockonhand.partnumber, partnumber));

            if (existingItems.length > 0) {
                const existingItem = existingItems[0];
                const userConfirmed = await promptUserConfirmation(`Part number ${partnumber} exists. Do you want to update its quantity?`);

                if (userConfirmed) {
                    await db.update(Stockonhand).set({ qty: existingItem.qty + quantity }).where(eq(Stockonhand.partnumber, partnumber));
                }
            } else {
                await db.insert(Stockonhand).values({
                    partnumber,
                    description,
                    qty: quantity,
                    url,
                    safeqty: safeQuantity,
                });
            }
       

        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};

async function promptUserConfirmation(message: string): Promise<boolean> {
    console.log(message);
    return true; // 模拟处理，假设用户总是确认
}
