import { column, defineDb, defineTable } from "astro:db";

const Link = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    url: column.text(),
    description: column.text(),
    isRead: column.boolean({ default: false }),
  },
});
const Workorder = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    url: column.text(),
    description: column.text(),
    finished: column.boolean({ default: false }),
  },
});

const  Stockonhand = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    partnumber: column.text(),
    description: column.text(),
    qty:column.number(),
    url: column.text(),
    safeqty: column.number(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Link , Workorder, Stockonhand },
});
