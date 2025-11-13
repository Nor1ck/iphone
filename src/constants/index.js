import {
  bg1Img,
  bg2Img,
  bg3Img,
  bg4Img,
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  HKIcon,
  FPIcon,
  RRIcon,
  GRADIcon,
} from "../utils";

export const navLists = ["Store", "Mac", "iPhone", "Support"];

export const hightlightsSlides = [
  {
    id: 1,
    textLists: ["Einzigartiges Design."],
    video: highlightFirstVideo,
    videoDuration: 3,
  },
  {
    id: 2,
    textLists: ["Verkaufsstarke Texte."],
    video: highlightSecondVideo,
    videoDuration: 4.65,
  },
  {
    id: 3,
    textLists: ["Optimiert für Suchmaschinen."],
    video: highlightThirdVideo,
    videoDuration: 4.65,
  },
  {
    id: 4,
    textLists: ["Blitzschneller Support."],
    video: highlightFourthVideo,
    videoDuration: 4.65,
  },
];

export const sizes = [
  {
    label: '5.4"',
    value: "mini",
    icon: HKIcon,
    title: "Hein & Kollegen – Unternehmensberatung",
    bg: bg1Img,
  },
  {
    label: '6.1"',
    value: "standard",
    icon: FPIcon,
    title: "Flächenpartner – Immobilienvermittlung",
    bg: bg2Img,
  },
  {
    label: '6.7"',
    value: "plus",
    icon: GRADIcon,
    title: "800 Grad – Steakhouse",
    bg: bg3Img,
  },
  {
    label: '7.0"',
    value: "max",
    icon: RRIcon,
    title: "Reifen Richter – Autowerkstatt",
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
