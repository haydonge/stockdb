/* empty css                          */
import { e as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, g as addAttribute, j as renderComponent, h as createAstro, u as unescapeHTML, l as Fragment, i as renderSlot } from '../astro_DM64CNG_.mjs';
import 'kleur/colors';
import { cva } from 'class-variance-authority';
import 'clsx';
import { $ as $$Button, d as db, S as Stockonhand, a as $$BaseLayout } from './404_D31A75j6.mjs';
import { getIconData, iconToSVG } from '@iconify/utils';

const icons = {"local":{"prefix":"local","lastModified":1718696675,"icons":{"check":{"body":"<g fill=\"none\" fill-rule=\"evenodd\"><path d=\"M24 0v24H0V0zM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z\"/><path fill=\"currentColor\" d=\"M19.495 3.133a1 1 0 0 1 1.352.309l.99 1.51a1 1 0 0 1-.155 1.279l-.003.004-.014.013-.057.053-.225.215a83.86 83.86 0 0 0-3.62 3.736c-2.197 2.416-4.806 5.578-6.562 8.646-.49.856-1.687 1.04-2.397.301l-6.485-6.738a1 1 0 0 1 .051-1.436l1.96-1.768A1 1 0 0 1 5.6 9.2l3.309 2.481c5.169-5.097 8.1-7.053 10.586-8.548\"/></g>","width":24,"height":24},"trash":{"body":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z\" clip-rule=\"evenodd\"/>","width":15,"height":15}}}};

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$5 = createAstro();
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
    }
  }
  const req = Astro2.request;
  const { name = "", title, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "xlink:href")}></use> ` })}`} </svg>`;
}, "D:/demo/astro_db_3_good/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Astro$4 = createAstro();
const $$UpdateDiaglog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$UpdateDiaglog;
  Astro2.props;
  return renderTemplate`${maybeRenderHead()}<dialog id="dialog2" style="background-color: rgb(60, 61, 63);width :30%;"> <div class=" text-theme-text shadow-xl rounded-md w-full max-w-x backdrop:bg-black/60"> <div class="p-4 sm:p-8 grid gap-6"> <form class="grid gap-4" id="update-form"> <h2 class="text-xl text-theme-accent font-bold leading-tight">修改库存</h2> <div class="grid gap-2"> <div class="flex items-center gap-2"> <label class="text-sm font-medium w-1/3">ID</label> <input type="number" name="id" class="w-2/3 p-2 border border-gray-300 rounded-md" readonly> </div> </div> <div class="grid gap-2"> <div class="flex items-center gap-2"> <label class="text-sm font-medium w-1/3">PN</label> <input type="text" name="partnumber" class="w-2/3 p-2 border border-gray-300 rounded-md"> </div> </div> <div class="grid gap-2"> <div class="flex items-center gap-2"> <label class="text-sm font-medium w-1/3">DS</label> <input type="text" name="description" class="w-2/3 p-2 border border-gray-300 rounded-md"> </div> </div> <div class="grid gap-2"> <div class="flex items-center gap-2"> <label class="text-sm font-medium w-1/3">QTY</label> <input type="number" name="qty" class="w-2/3 p-2 border border-gray-300 rounded-md"> </div> </div> <div class="grid gap-2"> <div class="flex items-center gap-2"> <label class="text-sm font-medium w-1/3">URL</label> <input type="text" name="url" class="w-2/3 p-2 border border-gray-300 rounded-md"> </div> </div> <div class="grid gap-2"> <div class="flex items-center gap-2"> <label class="text-sm font-medium w-1/3">SQTY</label> <input type="number" name="safeqty" class="w-2/3 p-2 border border-gray-300 rounded-md"> </div> </div> <div class="grid gap-2"> <div class="flex items-center gap-2"> <label class="text-sm font-medium w-1/3">TYPES</label> <input type="text" name="types" class="w-2/3 p-2 border border-gray-300 rounded-md"> </div> </div> <div class="flex justify-end gap-4 mt-4"> <button type="button" class="px-4 py-2 bg-primary text-white rounded-md" id="delete-this-item">Delete</button> <button type="button" class="px-4 py-2 bg-primary text-white rounded-md" id="close-dialog">Close</button> <button type="submit" class="px-4 py-2 bg-accent text-white rounded-md">Update</button> </div> </form> </div> </div> </dialog> `;
}, "D:/demo/astro_db_3_good/src/components/ui/UpdateDiaglog.astro", void 0);

const $$Astro$3 = createAstro();
const $$Stock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Stock;
  const a = cva(
    "flex items-center gap-2 max-w-fit rounded transition-all shadow-xl shadow-black/60 hover:shadow-none",
    {
      variants: {
        intent: {
          primary: [
            "bg-theme-text",
            "text-theme-base",
            "border-transparent",
            "hover:bg-theme-text/90",
            "focus:outline-none",
            "focus-visible:ring-2",
            "ring-theme-text",
            "ring-offset-4",
            "ring-offset-theme-base"
          ],
          accent: [
            "bg-theme-accent",
            "border-transparent",
            "hover:bg-theme-accent/90",
            "focus:outline-none",
            "focus-visible:ring-2",
            "ring-theme-accent",
            "ring-offset-4",
            "ring-offset-theme-base"
          ]
        },
        size: {
          small: ["text-sm", "py-1", "px-2"],
          medium: ["text-base", "py-2", "px-4"],
          large: ["text-lg", "py-3", "px-5"]
        }
      }
    }
  );
  const { intent = "primary", size = "medium", ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(a({ intent, size }), "class:list")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "D:/demo/astro_db_3_good/src/components/ui/stock.astro", void 0);

const $$Astro$2 = createAstro();
const $$StockCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$StockCard;
  const { stock } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="p-4 sm:p-6 bg-theme-base text-theme-text shadow-black/60 shadow-xl rounded-md grid gap-6 relative"> <div class="grid gap-2"> <h2 class="leading-tight font-bold text-theme-accent text-xl text-balance"> ${stock.partnumber} </h2> <p>${stock.description}</p> <p>Qty : ${stock.qty} </p> <p>SafeQty : ${stock.safeqty}</p> </div> <div class="flex flex-wrap gap-2"> <span class="px-2 py-1 bg-green-500 text-white rounded text-x hover:opacity-90"><a${addAttribute(`/search/?q=${stock.types}`, "href")}>${stock.types}</a></span> </div> ${renderComponent($$result, "Stock", $$Stock, { "href": stock.url, "intent": "primary" }, { "default": ($$result2) => renderTemplate`Open Link` })} <!-- <Button
    intent="accent"
    size="square"
    data-delete
    data-id={stock.id}
    classes="absolute -top-2 -right-2 rounded-full border-4 border-theme-base hover:scale-105 active:scale-95 ring-offset-2"
    aria-label={\`Delete Link: \${stock.partnumber}\`}
  >
    <Icon name="trash" size={24} />
  </Button> --> ${renderComponent($$result, "Button", $$Button, { "intent": "accent", "size": "square", "data-update": true, "data-id": stock.id, "data-partnumber": stock.partnumber, "data-description": stock.description, "data-qty": stock.qty, "data-url": stock.url, "data-safeqty": stock.safeqty, "data-types": stock.types, "classes": "absolute -right-1 -bottom-1 border-4 border-theme-base hover:scale-105 active:scale-95 ring-offset-2 m-6", "aria-label": `Update Link: ${stock.partnumber}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "check", "size": 24 })} ` })} ${renderComponent($$result, "UpdateDiaglog", $$UpdateDiaglog, { "stock": null })} </article> `;
}, "D:/demo/astro_db_3_good/src/components/ui/StockCard.astro", void 0);

const $$Astro$1 = createAstro();
const $$StockTable = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StockTable;
  const { stocks } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<table class="min-w-full "> <thead> <tr class="border-b-2 border-gray-300"> <th class="py-2">Part Number</th> <th class="py-2">Description</th> <th class="py-2">Onhand Qty</th> <th class="py-2">Safe Qty</th> <th class="py-2">URL</th> <th class="py-2">Actions</th> </tr> </thead> <tbody> ${stocks.map((stock) => renderTemplate`<tr${addAttribute(stock.id, "key")}> <th class="py-2">${stock.partnumber}</th> <th class="py-2">${stock.description}</th> <th class="py-2">${stock.qty}</th> <th class="py-2">${stock.safeqty}</th> <th class="py-2"> <a${addAttribute(stock.url, "href")} class="text-blue-500 hover:underline mr-4">
Open Link
</a> </th> <th> <button class="text-red-500 hover:text-red-700" open-dialog${addAttribute(stock.id, "data-id")}${addAttribute(`Update Link: ${stock.partnumber}`, "aria-label")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "check", "size": 24 })} </button> <button class="text-red-500 hover:text-red-700" data-delete${addAttribute(stock.id, "data-id")}${addAttribute(`Delete Link: ${stock.partnumber}`, "aria-label")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "trash", "size": 24 })} </button> </th> </tr>`)} </tbody> </table> <!-- <UpdateDiaglog stock={null} /> --> `;
}, "D:/demo/astro_db_3_good/src/components/ui/stockTable.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  Astro2.props;
  const defaultStocks = await db.select().from(Stockonhand);
  const Stocks = defaultStocks;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"> ${Stocks.map((item) => renderTemplate`${renderComponent($$result2, "StockCard", $$StockCard, { "stock": item })}`)} </div> <br> ${renderComponent($$result2, "StockTable", $$StockTable, { "stocks": Stocks })} ` })}`;
}, "D:/demo/astro_db_3_good/src/pages/index.astro", void 0);

const $$file = "D:/demo/astro_db_3_good/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Icon as $, $$UpdateDiaglog as a, index as i };
