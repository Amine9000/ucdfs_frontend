import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, Image, Lock, Mail, User, UserCog } from "lucide-react";
import React from "react";
import { useState } from "react";

interface Option {
  label: string;
  desc: string;
  icon: React.ReactNode; // To hold the Lucide icon component
  component?: React.FC; // Optional component for leaf nodes
  children?: Option[];
}

const options: Option[] = [
  {
    label: "Personal Information",
    desc: "Update your personal details.",
    icon: <UserCog size={20} />,
    children: [
      {
        label: "First Name",
        desc: "Update your first name.",
        icon: <User size={20} />,
        component: () => <div>First Name Component</div>,
      },
      {
        label: "Last Name",
        desc: "Update your last name.",
        icon: <User size={20} />,
        component: () => <div>Last Name Component</div>,
      },
      {
        label: "Email",
        desc: "Update your email address.",
        icon: <Mail size={20} />,
        component: () => <div>Email Component</div>,
      },
      {
        label: "Password",
        desc: "Change your password.",
        icon: <Lock size={20} />,
        component: () => <div>Password Component</div>,
      },
      {
        label: "Avatar",
        desc: "Update your profile picture.",
        icon: <Image size={20} />,
        component: () => <div>Avatar Component</div>,
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
            component: () => <div>2FA Component</div>,
          },
          {
            label: "Login Alerts",
            desc: "Set up login alerts for suspicious activities.",
            icon: <Lock size={20} />,
            component: () => <div>Login Alerts Component</div>,
          },
        ],
      },
      {
        label: "Account Deletion",
        desc: "Delete your account permanently.",
        icon: <Lock size={20} />,
        component: () => <div>Account Deletion Component</div>,
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
        component: () => <div>Email Notifications Component</div>,
      },
      {
        label: "Push Notifications",
        desc: "Manage push notification settings.",
        icon: <Mail size={20} />,
        component: () => <div>Push Notifications Component</div>,
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
        component: () => <div>Profile Visibility Component</div>,
      },
      {
        label: "Data Download",
        desc: "Download your account data.",
        icon: <Lock size={20} />,
        component: () => <div>Data Download Component</div>,
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
        component: () => <div>Language Settings Component</div>,
      },
      {
        label: "Time Zone",
        desc: "Set your time zone.",
        icon: <Mail size={20} />,
        component: () => <div>Time Zone Component</div>,
      },
    ],
  },
];

export function Paramerters() {
  const [history, setHistory] = useState<
    { level: number; options: Option[] }[]
  >([{ level: 0, options }]);
  const [step, setStep] = useState<
    null | "slideLeft" | "hidden" | "slideRight"
  >(null);

  const handleOptionClick = (option: Option) => {
    const newHistory = [
      ...history,
      { level: history.length, options: option.children || [] },
    ];
    setHistory(newHistory);
    setStep("slideLeft");
    setTimeout(() => {
      setStep("slideRight");
      setTimeout(() => setStep(null), 500);
    }, 200);
  };

  const handleGoBack = () => {
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
  };

  const currentLevel = history[history.length - 1];

  return (
    <div className="w-full relative overflow-hidden h-full bg-gray-100 flex flex-col items-center">
      <ParametersNavbar handleGoBack={handleGoBack} history={history} />
      <div
        className={cn(
          `w-1/2 h-full transition-transform duration-500 ease-in-out`,
          {
            "animate-slideLeft": step === "slideLeft",
            hidden: step === "hidden",
            "animate-slideRight": step === "slideRight",
          }
        )}
      >
        {currentLevel.options ? (
          <Options
            options={currentLevel.options}
            onOptionClick={handleOptionClick}
          />
        ) : (
          <div>No Options Available</div>
        )}
      </div>
    </div>
  );
}

interface ParametersNavBarProps {
  history: { level: number; options: Option[] }[];
  handleGoBack: () => void;
}

const ParametersNavbar: React.FC<ParametersNavBarProps> = ({
  history,
  handleGoBack,
}) => {
  return (
    <div className="h-12 px-4 py-1 w-full bg-white rounded ">
      {history.length > 1 && (
        <Button
          className="bg-gray-50 hover:bg-gray-50 text-gray-600"
          onClick={handleGoBack}
        >
          <ChevronLeft size={20} />
        </Button>
      )}
    </div>
  );
};

interface OptionsProps {
  options: Option[];
  onOptionClick: (option: Option) => void;
}

const Options: React.FC<OptionsProps> = ({ options, onOptionClick }) => {
  return (
    <div className="p-4">
      {options.map((option, index) => (
        <div
          key={index}
          className="mb-1 cursor-pointer p-4 bg-white shadow rounded hover:bg-gray-50"
          onClick={() => (option.children ? onOptionClick(option) : null)}
        >
          <div className="flex items-center justify-start gap-2">
            <div className="h-12 w-12 rounded text-gray-500 bg-gray-50 flex items-center justify-center">
              {option.icon}
            </div>
            <div className="h-12 flex flex-col items-start justify-center">
              <h3 className="font-semibold">{option.label}</h3>
              <small className="text-gray-600 text-sm">{option.desc}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
