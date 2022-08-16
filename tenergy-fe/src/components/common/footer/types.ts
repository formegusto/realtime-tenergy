import { IconType } from "react-icons";
import {
  MdOutlineBatteryFull,
  MdAttachMoney,
  MdBarChart,
  MdPermIdentity,
} from "react-icons/md";

export type NavigationItem = {
  title: string;
  path: string;
  icon: IconType;
  type: "basic" | "main";
};

export const navigationItems: NavigationItem[] = [
  {
    title: "Seller",
    path: "/seller",
    icon: MdOutlineBatteryFull,
    type: "basic",
  },
  {
    title: "Buyer",
    path: "/buyer",
    icon: MdAttachMoney,
    type: "basic",
  },
  {
    title: "Public",
    path: "/public",
    icon: MdBarChart,
    type: "basic",
  },
  {
    title: "My",
    path: "/my",
    icon: MdPermIdentity,
    type: "basic",
  },
];

export type NavItemProps = {
  item: NavigationItem;
};
