import {
  appleImg,
  bagImg,
  bg1Img,
  bg2Img,
  bg3Img,
  bg4Img,
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  searchImg,
  watchImg,
} from "../utils";

export const navLists = ["Store", "Mac", "iPhone", "Support"];

export const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      "Enter A17 Pro.",
      "Game-changing chip.",
      "Groundbreaking performance.",
    ],
    video: highlightFirstVideo,
    videoDuration: 5,
  },
  {
    id: 2,
    textLists: ["Titanium.", "So strong. So light. So Pro."],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      "iPhone 15 Pro Max has the",
      "longest optical zoom in",
      "iPhone ever. Far out.",
    ],
    video: highlightThirdVideo,
    videoDuration: 5,
  },
  {
    id: 4,
    textLists: ["All-new Action button.", "What will yours do?"],
    video: highlightFourthVideo,
    videoDuration: 5,
  },
];

export const sizes = [
  {
    label: '5.4"',
    value: "mini",
    icon: appleImg,
    title: "iPhone 15 Pro - Mini showcase",
    bg: bg1Img,
  },
  {
    label: '6.1"',
    value: "standard",
    icon: bagImg,
    title: "iPhone 15 Pro - Standard view",
    bg: bg2Img,
  },
  {
    label: '6.7"',
    value: "plus",
    icon: searchImg,
    title: "iPhone 15 Pro - Plus layout",
    bg: bg3Img,
  },
  {
    label: '7.0"',
    value: "max",
    icon: watchImg,
    title: "iPhone 15 Pro - Max experience",
    bg: bg4Img,
  },
];

export const footerLinks = [
  "Privacy Policy",
  "Terms of Use",
  "Sales Policy",
  "Legal",
  "Site Map",
];
