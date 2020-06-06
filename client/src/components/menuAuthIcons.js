import {
  History as HistoryIcon,
  VideoLibrary as LibraryIcon,
  Subscriptions as SubscriptionIcon,
} from "@material-ui/icons";

const icons = [
  {
    title: "Subscriptions",
    description: "Don't miss new videos",
    signInMsg: "Sign in to see updates from your favorite YouTube channels",
    icon: SubscriptionIcon,
    path: "/subscriptions",
  },
  {
    title: "Library",
    description: "Enjoy your favorite videos",
    signInMsg: "Sign in to access videos that you’ve liked or saved",
    path: "/library",

    icon: LibraryIcon,
  },
  {
    title: "History",
    description: "Keep track of what you watch",
    signInMsg: "Watch history isn't viewable when signed out.",
    icon: HistoryIcon,
    path: "/history",
  },
];

export default icons;
