import type { WebsitesData } from "~/types";

const websites: WebsitesData = {
  favorites: {
    title: "My Links",
    sites: [
      { id: "my-email", title: "Email", img: "img/sites/gmail.svg", link: "mailto:venkatakavya1100@gmail.com" },
      { id: "my-github", title: "GitHub", img: "img/sites/github.svg", link: "https://github.com/venkata-kavya" },
      { id: "my-portfolio", title: "Portfolio", img: "img/sites/github.svg", link: "https://kavyabuilds.vercel.app/" },
      { id: "leetcode", title: "LeetCode", img: "img/sites/leetcode.svg", link: "https://leetcode.com/" },
      { id: "hacker-rank", title: "HackerRank", img: "img/sites/hacker.svg", link: "https://www.hackerrank.com/" }
    ]
  },
  freq: {
    title: "Frequently Visited",
    sites: [
      { id: "github", title: "GitHub", img: "img/sites/github.svg", link: "https://github.com/" },
      { id: "portfolio", title: "Portfolio", img: "img/sites/github.svg", link: "https://kavyabuilds.vercel.app/" },
      { id: "leetcode", title: "LeetCode", img: "img/sites/leetcode.svg", link: "https://leetcode.com/" },
      { id: "vercel", title: "Vercel", img: "img/sites/vercel.svg", link: "https://vercel.com/" }
    ]
  }
};

export default websites;
