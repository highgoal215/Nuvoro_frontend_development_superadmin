import { AdminPanelIcon } from "@/types";
import DashboardIcon from "@/assets/icon/dashboard.svg";
import RoleIcon from "@/assets/icon/role.svg";
import ActivityIcon from "@/assets/icon/activity.svg";
import UserManagementIcon from "@/assets/icon/user-management.svg";
import ContentManagement from "@/assets/icon/content-mangement.svg";
import AnalyticsIcon from "@/assets/icon/analysis.svg";
import SupportIcon from "@/assets/icon/support.svg";
import SettingIcon from "@/assets/icon/setting.svg";
import AnnouncementIcon from "@/assets/icon/announcement.svg";

export const superAdminData: AdminPanelIcon[] = [
  {
    label: "Dashboard",
    pageTitle: "Dashboard Overview",
    icon: DashboardIcon.src,
    path: "/super-admin/dashboard",
  },
  {
    label: "Role-Based Access Control",
    pageTitle: "Role-Based Access Control",
    icon: RoleIcon.src,
    path: "/super-admin/role-based-access-control",
  },
  {
    label: "Activity Logging",
    pageTitle: "Activity Logs",
    icon: ActivityIcon.src,
    path: "/super-admin/activity-logging",
  },
  {
    label: "User Management",
    pageTitle: "User Management",
    icon: UserManagementIcon.src,
    path: "/super-admin/user-management",
  },
  {
    label: "Content Management",
    pageTitle: "Content Management",
    icon: ContentManagement.src,
    path: "/super-admin/content-management",
  },
  {
    label: "Analytics",
    pageTitle: "Analytics Overview",
    icon: AnalyticsIcon.src,
    path: "/super-admin/analytics",
  },
  {
    label: "Support",
    pageTitle: "Support and Issue Resolution",
    icon: SupportIcon.src,
    path: "/super-admin/support",
  },
  {
    label: "Settings",
    pageTitle: "Platform Settings",
    icon: SettingIcon.src,
    path: "/super-admin/settings",
  },
  {
    label: "Announcements",
    pageTitle: "Announcements & Communication",
    icon: AnnouncementIcon.src,
    path: "/super-admin/announcements",
  },
];
