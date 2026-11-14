export type ContentPlatform = "Instagram" | "YouTube" | "LinkedIn";

export const contentPlatforms: ContentPlatform[] = [
  "Instagram",
  "YouTube",
  "LinkedIn",
];

export const creatorContent: {
  title: string;
  platform: ContentPlatform;
  image?: string;
  url: string;
}[] = [
  {
    title: "Last working day at my first company 🥹",
    platform: "Instagram",
    url: "https://www.instagram.com/p/DZcUDXVzJMx/",
  },
  {
    title: "A normal day of a techie at KPMG 👨🏻‍💻",
    platform: "Instagram",
    url: "https://www.instagram.com/p/DehOJkTT2EV/",
  },
  {
    title: "At least one friend gets it...",
    platform: "Instagram",
    url: "https://www.instagram.com/p/DdjqpDTT8Qd/",
  },
  {
    title: "Cant say no to ☕",
    platform: "Instagram",
    url: "https://www.instagram.com/p/DeuC4GWTFZt/",
  },
  {
    title: "Around the world, without leaving the KPMG Bangalore office",
    platform: "Instagram",
    url: "https://www.instagram.com/p/DeMm2YyzZ1m/",
  },
  {
    title: "Cant say no to ☕",
    platform: "YouTube",
    image: "https://i.ytimg.com/vi/Eq6R1wDq9go/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=Eq6R1wDq9go",
  },
  {
    title: "Dockerizing the Backend | DevOps in Public (Day 2)",
    platform: "YouTube",
    image: "https://i.ytimg.com/vi/SZmlR4j_E7w/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=SZmlR4j_E7w",
  },
  {
    title: "My Journey as a Hackathon Mentor | A Personal Edit",
    platform: "YouTube",
    image: "https://i.ytimg.com/vi/UZ6emhXPqCY/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=UZ6emhXPqCY",
  },
  {
    title: "POV: You Chose Tech",
    platform: "YouTube",
    image: "https://i.ytimg.com/vi/WOlcLJBn7kI/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=WOlcLJBn7kI",
  },
  {
    title: "What If Twitter Listened to You? | Hands Free Twitter",
    platform: "YouTube",
    image: "https://i.ytimg.com/vi/QJZuoYz3whY/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=QJZuoYz3whY",
  },
  {
    title: "Selected LinkedIn post 01",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7521506308554973184/",
  },
  {
    title: "Selected LinkedIn post 02",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7442567614754648064/",
  },
  {
    title: "Selected LinkedIn post 03",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7435709957586710528/",
  },
];

export const creatorSocials = [
  { name: "Instagram", url: "https://www.instagram.com/codesbyshivam/" },
  { name: "YouTube", url: "https://www.youtube.com/@codesbyshivam" },
  { name: "X", url: "https://x.com/codesbyshivam" },
  { name: "Threads", url: "https://www.threads.net/@codesbyshivam" },
];

export const collaborations = [
  {
    title: "Build with your tool.",
    text: "A real mini-project using your API or product, with the process documented along the way.",
    tag: "HANDS-ON BUILDS",
  },
  {
    title: "Show, don’t just tell.",
    text: "A dedicated video, Reel or Short that makes your product part of the story.",
    tag: "VIDEO & SHORT-FORM",
  },
  {
    title: "Start a conversation.",
    text: "Native posts and threads on the tools I use, the things I ship, and what I learn.",
    tag: "SOCIAL CONTENT",
  },
];
