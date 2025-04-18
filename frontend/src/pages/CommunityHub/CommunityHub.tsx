import { useState } from "react";

import CommunityHubSidebar from "@/components/CommunityHubSidebar";
import CommunityPosts from "@/components/CommunityHubPost";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Layout from "@/layout/Layout";
import { CommunityPost } from "@/types";
import { stringToDate } from "@/utils/stringToDate";

import {
  FaCompass,
  FaFire,
  FaUtensils,
  FaHeart,
  FaEllipsisH,
} from "react-icons/fa";

const sidebarList = [
  { icon: <FaFire className="text-xl text-gray-500" />, title: "Trending" },
  { icon: <FaCompass className="text-xl text-gray-500" />, title: "Explore" },
  { icon: <FaUtensils className="text-xl text-gray-500" />, title: "Recipe" },
  { icon: <FaHeart className="text-xl text-gray-500" />, title: "Donation" },
  { icon: <FaEllipsisH className="text-xl text-gray-500" />, title: "Others" },
];

const CommunityHub = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      title: "Delicious Chocolate Cake",
      postedBy: "Alice",
      label: ["Recipe"],
      description:
        "Indulge in the rich and moist chocolate goodness of this homemade cake recipe. Perfect for any sweet tooth!",
      likeCount: 56,
      commentCount: 12,
      postedOn: stringToDate("2024-01-01T00:00:00.000Z"),
    },
    {
      title: "Helping Hand Initiative",
      postedBy: "Bob",
      label: ["Donation"],
      description:
        "Join us in supporting local communities. Donate non-perishable items and make a positive impact on those in need.",
      likeCount: 34,
      commentCount: 8,
      postedOn: stringToDate("2022-01-05T00:00:00.000Z"),
    },
    {
      title: "Summer Salad Recipe",
      postedBy: "Charlie",
      label: ["Recipe"],
      description:
        "Stay refreshed with this easy-to-make and healthy summer salad. Packed with vibrant veggies and flavors!",
      likeCount: 72,
      commentCount: 21,
      postedOn: stringToDate("2022-03-10T00:00:00.000Z"),
    },
    {
      title: "Supporting Local Shelter",
      postedBy: "David",
      label: ["Donation"],
      description:
        "Let's come together to support our local shelter. Your donations can make a difference in the lives of those without homes.",
      likeCount: 45,
      commentCount: 15,
      postedOn: stringToDate("2022-03-15T00:00:00.000Z"),
    },
    {
      title: "Family Dinner Recipe",
      postedBy: "Eva",
      label: ["Recipe"],
      description:
        "Create unforgettable family moments with this heartwarming dinner recipe. Perfect for cozy gatherings!",
      likeCount: 63,
      commentCount: 18,
      postedOn: stringToDate("2022-03-20T00:00:00.000Z"),
    },
    {
      title: "Book Drive for Kids",
      postedBy: "Frank",
      label: ["Donation"],
      description:
        "Donate gently used children's books to help build a library for kids. Let's foster a love for reading!",
      likeCount: 29,
      commentCount: 7,
      postedOn: stringToDate("2022-03-25T00:00:00.000Z"),
    },
    {
      title: "Quick Breakfast Recipe",
      postedBy: "Grace",
      label: ["Recipe"],
      description:
        "Start your day right with this quick and delicious breakfast recipe. Fuel up for a productive day ahead!",
      likeCount: 41,
      commentCount: 14,
      postedOn: stringToDate("2022-03-30T00:00:00.000Z"),
    },
    {
      title: "Clothing Drive for Winter",
      postedBy: "Henry",
      label: ["Donation", "Others"],
      description:
        "Collecting warm clothing for those in need during the winter season. Your old coats can provide warmth to someone else.",
      likeCount: 37,
      commentCount: 10,
      postedOn: stringToDate("2022-04-05T00:00:00.000Z"),
    },
    {
      title: "Vegetarian Pasta Delight",
      postedBy: "Ivy",
      label: ["Recipe"],
      description:
        "Explore the world of vegetarian cuisine with this mouthwatering pasta recipe. A delightful twist for pasta lovers!",
      likeCount: 53,
      commentCount: 16,
      postedOn: stringToDate("2022-04-10T00:00:00.000Z"),
    },
    {
      title: "Supporting Local Artisans",
      postedBy: "Jack",
      label: ["Donation", "Others", "Recipe"],
      description:
        "Contribute to local art by supporting handmade crafts. Your donations empower local artisans and celebrate creativity.",
      likeCount: 28,
      commentCount: 9,
      postedOn: stringToDate("2022-04-15T00:00:00.000Z"),
    },
  ]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const [selectedFilter, setSelectedFilter] = useState("Trending");

  const onClickSideBarOption = (title: string) => {
    let updatedPosts: CommunityPost[] = [];

    switch (title.toLowerCase()) {
      case "explore":
        updatedPosts = [...posts].sort(() => Math.random() - 0.5);
        break;

      case "trending":
        updatedPosts = [...posts].sort(
          (a, b) => b.postedOn.getTime() - a.postedOn.getTime()
        );
        break;

      case "recipe":
      case "donation":
      case "others":
        updatedPosts = posts.filter((post) => post.label.includes(title));
        break;

      default:
        updatedPosts = [...posts];
        break;
    }

    setSelectedFilter(title);
    setFilteredPosts(updatedPosts);
  };

  const handleAddNewPost = (newPost: CommunityPost) => {
    setPosts([newPost, ...posts]);
    setFilteredPosts([newPost, ...posts]);
    setSelectedFilter("Trending");
  };

  return (
    <>
      <NavBar />
      <Layout>
        <div className="mx-auto my-10 p-4 w-10/12 grid grid-cols-4 bg-stone-100 rounded-3xl justify-center r align-middle">
          <CommunityHubSidebar
            selectedFilter={selectedFilter}
            sidebarList={sidebarList}
            onClickSideBarOption={onClickSideBarOption}
          />
          <CommunityPosts
            posts={filteredPosts}
            handleAddNewPost={handleAddNewPost}
          />
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default CommunityHub;
