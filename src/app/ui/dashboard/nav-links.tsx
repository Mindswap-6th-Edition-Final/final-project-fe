"use client";

import Link from "next/link";
import { LinkType, LinkTypeSub, NavLinksProps } from "@/app/lib/types";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  UserRound,
  GraduationCap,
  BookCheck,
  BookOpenText,
  LibraryBig,
  Home,
} from "lucide-react";

export const linkDashboard: LinkType = {
  name: "Dashboard",
  href: "/dashboard",
  icon: Home,
  role: ["student", "teacher", "admin"],
};

export const linksub: LinkTypeSub[] = [
  {
    name: "My-Courses",
    href: "/dashboard/my-courses",
    icon: BookOpenText,
    role: ["student", "admin"],
    sublinks: [
      {
        name: "My Applied Courses",
        href: "/dashboard/my-courses/my-applied-courses",
        icon: BookCheck,
      },
      {
        name: "My Enrolled Courses",
        href: "/dashboard/my-courses/my-enrolled-courses",
        icon: GraduationCap,
      },
    ],
  },
];

export const links: LinkType[] = [
  {
    name: "My Courses",
    href: "/dashboard/my-courses-teacher",
    icon: BookOpenText,
    role: ["teacher", "admin"],
  },
  {
    name: "All Courses",
    href: "/dashboard/all-courses",
    icon: LibraryBig,
    role: ["student", "admin"],
  },
  {
    name: "All Courses",
    href: "/dashboard/all-courses-teacher",
    icon: LibraryBig,
    role: ["teacher", "admin"],
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: UserRound,
    role: ["student", "admin", "teacher"],
  },
];

// filter links based on role
// function filterLinksByRole(links: LinkType[], role: string) {
//   return links.filter(link => link.role.includes(role));
// }

export default function NavLinks() {
  //export default function NavLinks ({ links }: NavLinksProps) {
  const [openSublinks, setOpenSublinks] = useState<string | null>(null);

  return (
    <>
      <div className="flex justify-start items-start">
        <Link
          className="flex justify-start items-start pt-2 pb-2"
          key={linkDashboard.href}
          href={linkDashboard.href}
        >
          {linkDashboard.icon && (
            <linkDashboard.icon className="flex justify-start items-start mr-2" />
          )}
          <p className="hidden md:block">{linkDashboard.name}</p>
        </Link>
      </div>

      {linksub.map((link, idx) => (
        <div className="flex justify-start items-start" key={idx}>
          <details open={openSublinks === link.name} className="pt-2 pb-2">
            <summary className="list-none pl-0 flex justify-between items-center">
              {link.icon && (
                <link.icon className="flex justify-start items-start mr-2" />
              )}{" "}
              {link.name}{" "}
              {link.sublinks &&
                (openSublinks === link.name ? (
                  <ChevronUp className="flex justify-end ml-28" />
                ) : (
                  <ChevronDown className="flex justify-end ml-28" />
                ))}
            </summary>
            <ul>
              {link.sublinks &&
                link.sublinks.map((sublink) => (
                  <li key={sublink.href}>
                    <Link href={sublink.href}>
                      {sublink.icon && (
                        <sublink.icon className="flex justify-start items-start mr-2" />
                      )}{" "}
                      {sublink.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </details>
        </div>
      ))}

      {links.map((link, idx) => (
        // write the code to test the role
        <div className="flex justify-start items-start" key={idx}>
          <Link
            className="flex justify-start items-start pt-2 pb-2"
            key={link.href}
            href={link.href}
          >
            {link.icon && (
              <link.icon className="flex justify-start items-start mr-2" />
            )}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        </div>
      ))}
    </>
  );
}
