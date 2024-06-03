import { Link, Stockonhand, Workorder,db } from "astro:db";

// // https://astro.build/db/seed
export default async function seed() {
  await db.insert(Link).values([
    {
      title: "My Blog",
      url: "https://chrispennington.blog",
      description: "This is my blog about web development and design.",
      isRead: true,
    },
    {
      title: "Google",
      url: "https://google.com",
      description: "I found this cool site that can search for anything.",
      isRead: false,
    },
    {
      title: "GitHub",
      url: "https://github.com",
      description: "I found this cool site that can hold repositories.",
      isRead: false,
    },
    {
      title: "Twitter",
      url: "https://twitter.com",
      description:
        "I found this cool site that can let you say anything you want without accountability!",
      isRead: false,
    },
  ]);
  await db.insert(Workorder).values([
    {
      title: "My Blog",
      url: "https://chrispennington.blog",
      description: "This is my blog about web development and design.",
      finished: true,
    },
    {
      title: "Google",
      url: "https://google.com",
      description: "I found this cool site that can search for anything.",
      finished: false,
    },
    {
      title: "GitHub",
      url: "https://github.com",
      description: "I found this cool site that can hold repositories.",
      finished: false,
    },
    {
      title: "Twitter",
      url: "https://twitter.com",
      description:
        "I found this cool site that can let you say anything you want without accountability!",
      finished: false,
    },
  ]);


await db.insert(Stockonhand).values([
  {
    partnumber: "LFNK1000001",
    description: "This is my blog about web development and design.",  
    qty:20,
    url: "https://chrispennington.blog",
    safeqty:5,
  },
  {
    partnumber: "LFNK1000002",
    description: "This is my blog about web development and design.",  
    qty:20,
    url: "https://sina.com.cn",
    safeqty:5,
  },
  
]);

};

