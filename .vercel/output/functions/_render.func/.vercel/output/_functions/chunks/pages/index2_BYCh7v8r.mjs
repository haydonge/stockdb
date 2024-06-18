/* empty css                          */
import { e as createComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, s as spreadAttributes, i as renderSlot, h as createAstro, j as renderComponent } from '../astro_DM64CNG_.mjs';
import 'kleur/colors';
import { cva } from 'class-variance-authority';
import 'clsx';
import { $ as $$Icon } from './index_DUz1OdgN.mjs';
import { $ as $$Button, d as db, L as Link, a as $$BaseLayout } from './404_D31A75j6.mjs';

const $$Astro$2 = createAstro();
const $$Link = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Link;
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
}, "D:/demo/astro_db_3_good/src/components/ui/Link.astro", void 0);

const $$Astro$1 = createAstro();
const $$Checkbox = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Checkbox;
  const { inputId, checked, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative max-w-fit flex gap-2 items-center"> <input type="checkbox"${addAttribute(checked, "checked")} class="absolute inset-0 peer opacity-0 cursor-pointer"${addAttribute(`check-${inputId}`, "id")}${spreadAttributes(rest)}> <div class="size-6 border-2 border-theme-accent rounded-md grid place-items-center text-theme-base peer-checked:bg-theme-accent peer-focus-visible:ring-2 ring-theme-accent ring-offset-2 ring-offset-theme-base" aria-hidden="true"> ${renderComponent($$result, "Icon", $$Icon, { "name": "check", "size": 16 })} </div> <label${addAttribute(`check-${inputId}`, "for")}>Is Read?</label> </div>`;
}, "D:/demo/astro_db_3_good/src/components/ui/Checkbox.astro", void 0);

const $$Astro = createAstro();
const $$LinkCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LinkCard;
  const { link } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="p-4 sm:p-6 bg-theme-base text-theme-text shadow-black/60 shadow-xl rounded-md grid gap-6 relative"> <div class="grid gap-2"> ${renderComponent($$result, "Checkbox", $$Checkbox, { "checked": link.isRead, "inputId": link.id, "data-id": link.id, "data-isRead": true })} <h2 class="leading-tight font-bold text-theme-accent text-xl text-balance"> ${link.title} </h2> <p>${link.description}</p> </div> ${renderComponent($$result, "Link", $$Link, { "href": link.url, "intent": "primary" }, { "default": ($$result2) => renderTemplate`Open Link` })} ${renderComponent($$result, "Button", $$Button, { "intent": "accent", "size": "square", "data-delete": true, "data-id": link.id, "classes": "absolute -top-2 -right-2 rounded-full border-4 border-theme-base hover:scale-105 active:scale-95 ring-offset-2", "aria-label": `Delete Link: ${link.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "trash", "size": 24 })} ` })} </article> `;
}, "D:/demo/astro_db_3_good/src/components/LinkCard.astro", void 0);

const $$Index2 = createComponent(async ($$result, $$props, $$slots) => {
  const links = await db.select().from(Link);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] md:grid-cols-4"> ${links.map((link) => renderTemplate`${renderComponent($$result2, "LinkCard", $$LinkCard, { "link": link })}`)} </div> ` })}`;
}, "D:/demo/astro_db_3_good/src/pages/index2.astro", void 0);

const $$file = "D:/demo/astro_db_3_good/src/pages/index2.astro";
const $$url = "/index2";

export { $$Index2 as default, $$file as file, $$url as url };
