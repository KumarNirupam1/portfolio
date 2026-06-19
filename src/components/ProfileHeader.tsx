import React from "react";
import {
  FaLinkedin,
  FaXTwitter,
  FaGithub,
} from "react-icons/fa6";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";
import { SiLeetcode, SiMedium } from "react-icons/si";
import { RotatingText } from "@/components/rotating-text";

interface ProfileHeaderProps {
  name?: string;
  age?: string;
  title?: string;
  profileImage?: string;
  socialLinks?: {
    leetcode?: string;
    twitter?: string;
    resume?: string;
    github?: string;
    linkedin?: string;
    medium?: string;
  };
}

interface IconButtonProps {
  href?: string;
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  href,
  label,
  children,
  onClick,
}) => {
  const Wrapper = href ? "a" : "button";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Wrapper
          {...(href
            ? { href, target: "_blank", rel: "noopener noreferrer" }
            : { onClick })}
          aria-label={label}
          className="w-8 h-8 rounded-full flex items-center justify-center
                     bg-black/5 dark:bg-white/10
                     hover:bg-black/10 dark:hover:bg-white/20
                     transition text-lg"
        >
          {children}
        </Wrapper>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};

/* -------------------- Component -------------------- */

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name = "Kumar Nirupam",
  profileImage = "/profilepic.webp",
  socialLinks = {
    twitter: "https://x.com/KumarNirupam1",
    github: "https://github.com/KumarNirupam1",
    linkedin: "https://www.linkedin.com/in/kumarnirupam/",
    medium: "https://medium.com/@kumar.nirupam24",
    resume:
      "https://drive.google.com/file/d/1-APVoAU586ss5jyYiattgAmCPRWpin5M/view?usp=sharing",
    leetcode : "https://leetcode.com/u/user8723jT/",
  },
}) => {

  const socials = [
    { href: socialLinks.github, label: "GitHub", icon: <FaGithub /> },
    { href: socialLinks.twitter, label: "Twitter", icon: <FaXTwitter /> },
    { href: socialLinks.medium, label: "Medium", icon: <SiMedium /> },
    { href: socialLinks.leetcode, label: "Leetcode", icon: <SiLeetcode /> },
    { href: socialLinks.linkedin, label: "LinkedIn", icon: <FaLinkedin /> }
  ];

  return (
    <div className="flex-col -mt-10">
      {/* Avatar */}
      <div className="flex items-center justify-between mb-4 sm:mx-8 mx-4">
        <div
          className="w-24 h-24 sm:w-30 sm:h-30  bg-cover bg-center rounded-2xl "
          role="img"
          aria-label={name}
          style={{ backgroundImage: `url("${profileImage}")` }}
        />
      </div>

      {/* Name + Actions */}
      <div className="sm:flex sm:justify-between sm:items-center sm:px-8 px-4">
        <div>
          <h1 className="italic text-2xl sm:text-4xl font-medium tracking-[0.01em]">
            {name}
          </h1>
          <p className="opacity-40 text-xs sm:text-sm">
           <RotatingText />
          </p>
        </div>

        {/* Icons */}
        <div className="flex gap-2 mt-3 sm:mt-0">
          {socials.map(
            ({ href, label, icon }) =>
              href && (
                <IconButton key={label} href={href} label={label}>
                  {icon}
                </IconButton>
              )
          )}

          {/* <IconButton label="Toggle theme" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </IconButton> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
