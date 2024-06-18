/* empty css                          */
import { e as createComponent, r as renderTemplate, j as renderComponent, h as createAstro, m as maybeRenderHead } from '../astro_DM64CNG_.mjs';
import 'kleur/colors';
import { d as db, S as Stockonhand, $ as $$Button, a as $$BaseLayout } from './404_D31A75j6.mjs';
import { a as $$UpdateDiaglog } from './index_DUz1OdgN.mjs';

const $$Astro = createAstro();
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  Astro2.props;
  await db.select().from(Stockonhand);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<main class="flex flex-col items-center space-y-4"> <!-- <h3 class="text-xl text-theme-accent font-bold leading-tight">
      搜索库存
    </h3> --> <form class="form flex items-center justify-center space-x-9" id="form1"> <label for="search">Search DataBase </label> <input type="text" required min="2" max="24" name="search" id="search" placeholder="Enter a search term…" class=" border border-white"> ${renderComponent($$result2, "Button", $$Button, { "intent": "accent", "type": "submit" }, { "default": ($$result3) => renderTemplate`Search` })} </form> <p id="searchReadout"></p> </main> <section aria-label="Search Results"> <div class="overflow-x-auto"> <table class="min-w-full text-l table-auto"> <thead> <tr class="text-center text-base border-b-2 border-gray-300"> <th class="px-6 py-3">ID</th> <th class="px-6 py-3">Part Number</th> <th class="px-6 py-3">Description</th> <th class="px-6 py-3">Qty</th> <th class="px-6 py-3">SafeQty</th> <th class="px-6 py-3">URL</th> <th class="px-6 py-3">TYPES</th> <th class="px-6 py-3">Action</th> </tr> </thead> <tbody id="searchResults"></tbody> </table> </div> <div id="stockTableContainer"> <!-- <StockTable stocks={filteredStocks}/> --> </div> </section> ${renderComponent($$result2, "UpdateDiaglog", $$UpdateDiaglog, { "stock": null })}  ` })}`;
}, "D:/demo/astro_db_3_good/src/pages/search.astro", void 0);

const $$file = "D:/demo/astro_db_3_good/src/pages/search.astro";
const $$url = "/search";

export { $$Search as default, $$file as file, $$url as url };
