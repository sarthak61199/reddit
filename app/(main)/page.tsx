import PostList from "@/components/post-list";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const DUMMY_POSTS = [
  {
    id: "1",
    title: "Just built my first mechanical keyboard!",
    content:
      "After months of research and collecting parts, I finally built my first custom mechanical keyboard. It's a 65% layout with Gateron Brown switches and PBT keycaps. The typing experience is amazing!",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
    author: {
      username: "keeb_enthusiast",
    },
    subreddit: {
      name: "MechanicalKeyboards",
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212",
    },
    createdAt: new Date("2024-03-10T15:30:00"),
    _count: {
      PostLike: 142,
      Comment: 47,
    },
    userVote: 1,
  },
  {
    id: "2",
    title:
      "TIL that honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible",
    content:
      "The unique chemical composition of honey and its low moisture content create an environment where bacteria cannot survive. Pretty amazing that something can last for thousands of years!",
    author: {
      username: "history_buff",
    },
    subreddit: {
      name: "todayilearned",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d",
    },
    createdAt: new Date("2024-03-10T12:15:00"),
    _count: {
      PostLike: 2547,
      Comment: 231,
    },
    userVote: -1,
  },
  {
    id: "3",
    title: "Captured this amazing sunset at the beach today",
    content: "",
    image: "https://images.unsplash.com/photo-1616036740257-9449ea1f6605",
    author: {
      username: "photo_enthusiast",
    },
    subreddit: {
      name: "photographs",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    },
    createdAt: new Date("2024-03-10T08:45:00"),
    _count: {
      PostLike: 943,
      Comment: 1205,
    },
    userVote: null,
  },
  {
    id: "4",
    title: "Made this cozy corner in my apartment",
    content:
      "Finally finished setting up my reading nook! Added some warm lighting, comfortable cushions, and some plants to create the perfect spot for reading and relaxation.",
    image: "https://images.unsplash.com/photo-1657040899601-fbcc8f6486f6",
    author: {
      username: "interior_design_lover",
    },
    subreddit: {
      name: "CozyPlaces",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
    },
    createdAt: new Date("2024-03-09T22:20:00"),
    _count: {
      PostLike: 8432,
      Comment: 325,
    },
    userVote: 1,
  },
  {
    id: "5",
    title: "Next.js 14 is a game-changer for web development",
    content:
      "The new Server Actions and partial prerendering features are incredible. Here's my experience migrating a large application and the performance improvements we've seen...",
    author: {
      username: "webdev_pro",
    },
    subreddit: {
      name: "programming",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    },
    createdAt: new Date("2024-03-09T16:50:00"),
    _count: {
      PostLike: 567,
      Comment: 89,
    },
    userVote: -1,
  },
  {
    id: "6",
    title: "My cat always sits like this",
    content: "",
    image: "https://images.unsplash.com/photo-1513245543132-31f507417b26",
    author: {
      username: "cat_lover",
    },
    subreddit: {
      name: "cats",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    },
    createdAt: new Date("2024-03-09T14:20:00"),
    _count: {
      PostLike: 2341,
      Comment: 89,
    },
    userVote: null,
  },
  {
    id: "7",
    title: "Stunning view from my morning hike",
    content: "",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    author: {
      username: "hiking_enthusiast",
    },
    subreddit: {
      name: "hiking",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    },
    createdAt: new Date("2024-03-09T12:20:00"),
    _count: {
      PostLike: 1543,
      Comment: 45,
    },
    userVote: 1,
  },
];

async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto py-4 flex gap-4 justify-center">
      <div className="flex-1 max-w-2xl">
        <PostList posts={DUMMY_POSTS} />
      </div>
      <div className="w-80" />
    </div>
  );
}

export default Page;
