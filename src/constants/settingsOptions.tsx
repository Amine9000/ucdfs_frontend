import { ChangePwdPopUp } from "@/components/global/ChangePwdPopUp";
import { Image, Lock, Mail, User, UserCog } from "lucide-react";

import React from "react";

export type ComponentWithChildren<P = object> = React.FC<
  P & { children?: React.ReactNode }
>;

export interface SettingsOption {
  label: string;
  desc: string;
  icon: React.ReactNode; // To hold the Lucide icon component
  component?: ComponentWithChildren | null; // Optional component for leaf nodes
  children?: SettingsOption[];
}

export const options: SettingsOption[] = [
  {
    label: "Personal Information",
    desc: "Update your personal details.",
    icon: <UserCog size={20} />,
    children: [
      {
        label: "First Name",
        desc: "Update your first name.",
        icon: <User size={20} />,
        component: null,
      },
      {
        label: "Last Name",
        desc: "Update your last name.",
        icon: <User size={20} />,
        component: null,
      },
      {
        label: "Email",
        desc: "Update your email address.",
        icon: <Mail size={20} />,
        component: null,
      },
      {
        label: "Password",
        desc: "Change your password.",
        icon: <Lock size={20} />,
        component: ChangePwdPopUp,
      },
      {
        label: "Avatar",
        desc: "Update your profile picture.",
        icon: <Image size={20} />,
        component: null,
      },
    ],
  },
  {
    label: "Account Settings",
    desc: "Manage your account settings.",
    icon: <Lock size={20} />,
    children: [
      {
        label: "Security",
        desc: "Manage your security options.",
        icon: <Lock size={20} />,
        children: [
          {
            label: "Two-Factor Authentication",
            desc: "Enable or disable two-factor authentication.",
            icon: <Lock size={20} />,
            component: null,
          },
          {
            label: "Login Alerts",
            desc: "Set up login alerts for suspicious activities.",
            icon: <Lock size={20} />,
            component: null,
          },
        ],
      },
      {
        label: "Account Deletion",
        desc: "Delete your account permanently.",
        icon: <Lock size={20} />,
        component: null,
      },
    ],
  },
  {
    label: "Notifications",
    desc: "Set your notification preferences.",
    icon: <Mail size={20} />,
    children: [
      {
        label: "Email Notifications",
        desc: "Manage email notification settings.",
        icon: <Mail size={20} />,
        component: null,
      },
      {
        label: "Push Notifications",
        desc: "Manage push notification settings.",
        icon: <Mail size={20} />,
        component: null,
      },
    ],
  },
  {
    label: "Privacy Settings",
    desc: "Control your privacy preferences.",
    icon: <Lock size={20} />,
    children: [
      {
        label: "Profile Visibility",
        desc: "Manage who can see your profile.",
        icon: <User size={20} />,
        component: null,
      },
      {
        label: "Data Download",
        desc: "Download your account data.",
        icon: <Lock size={20} />,
        component: null,
      },
    ],
  },
  {
    label: "Language & Region",
    desc: "Customize your language and regional settings.",
    icon: <Mail size={20} />,
    children: [
      {
        label: "Language",
        desc: "Select your preferred language.",
        icon: <Mail size={20} />,
        component: null,
      },
      {
        label: "Time Zone",
        desc: "Set your time zone.",
        icon: <Mail size={20} />,
        component: null,
      },
    ],
  },
];
