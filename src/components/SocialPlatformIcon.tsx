import type { SocialPlatform } from "@/types/user";

export default function SocialPlatformIcon({
  platform,
  className = "",
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const classes = `h-4 w-4 ${className}`.trim();

  switch (platform) {
    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={classes}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "github":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={classes}
          fill="currentColor"
        >
          <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.03c.56.1.76-.24.76-.54v-2.09c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1-.68.07-.67.07-.67 1.12.08 1.7 1.14 1.7 1.14.98 1.69 2.6 1.2 3.23.9.1-.72.39-1.2.7-1.47-2.47-.29-5.08-1.24-5.08-5.5 0-1.22.44-2.2 1.14-2.97-.11-.28-.5-1.42.11-2.95 0 0 .93-.3 3.05 1.13a10.6 10.6 0 0 1 5.56 0c2.11-1.43 3.04-1.13 3.04-1.13.6 1.53.22 2.67.1 2.95.71.77 1.14 1.75 1.14 2.97 0 4.28-2.61 5.2-5.1 5.49.4.35.76 1.03.76 2.08v3.08c0 .3.2.64.77.53A11.3 11.3 0 0 0 12 .7Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={classes}
          fill="currentColor"
        >
          <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.07 2.07 0 1 0 5.3 7.14 2.07 2.07 0 0 0 5.25 3ZM20.44 12.42c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.37 1.87V8.5H9.38V20h3.37v-6.38c0-1.68.32-3.3 2.4-3.3 2.06 0 2.09 1.92 2.09 3.4V20h3.37v-7.58Z" />
        </svg>
      );
    case "x":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={classes}
          fill="currentColor"
        >
          <path d="M18.9 3h2.93l-6.4 7.31L23 21h-6l-4.7-6.16L6.9 21H4l6.84-7.82L1 3h6.15l4.25 5.62L18.9 3Zm-1.02 16.28h1.62L6.3 4.64H4.56l13.32 14.64Z" />
        </svg>
      );
    default:
      return null;
  }
}
