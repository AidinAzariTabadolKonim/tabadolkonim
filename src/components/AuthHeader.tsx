"use client";

import { ClerkLoaded } from "@clerk/nextjs";
import dynamic from "next/dynamic";

// Dynamically import Clerk components to ensure they only load on the client
const SignInButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignInButton),
  {
    ssr: false,
  }
);

const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  {
    ssr: false,
  }
);
const SignedIn = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignedIn),
  {
    ssr: false,
  }
);
const SignedOut = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignedOut),
  {
    ssr: false,
  }
);

export default function AuthHeader() {
  return (
    <ClerkLoaded>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton mode="modal">
            <button
              style={{
                backgroundColor: "#f28c38", // Orange color
                color: "#fff", // White text
                fontFamily: "Far_Nazanin, Arial, sans-serif", // Custom font
                padding: "8px 16px", // Standard button padding
                borderRadius: "4px", // Rounded corners
                border: "none", // No border
                cursor: "pointer", // Hand cursor on hover
                transition: "background-color 0.3s", // Smooth hover transition
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e07b30")
              } // Darker orange on hover
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f28c38")
              } // Original orange on hover out
            >
              ورود
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </ClerkLoaded>
  );
}
