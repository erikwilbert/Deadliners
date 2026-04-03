import type { SocialLink, SocialPlatform } from "@/types/user";

export const socialPlatformOptions: {
  value: SocialPlatform;
  label: string;
  icon: string;
}[] = [
  { value: "instagram", label: "Instagram", icon: "photo_camera" },
  { value: "github", label: "GitHub", icon: "code" },
  { value: "linkedin", label: "LinkedIn", icon: "business_center" },
  { value: "x", label: "X", icon: "alternate_email" },
];

const socialPlatformMap = new Map(
  socialPlatformOptions.map((option) => [option.value, option]),
);

export function parseSocialLinks(
  values?: string[] | null,
): SocialLink[] {
  if (!values || values.length === 0) {
    return [];
  }

  return values
    .map((value, index) => parseSocialLink(value, index))
    .filter((value): value is SocialLink => value !== null)
    .slice(0, 4);
}

function parseSocialLink(
  value: string,
  index: number,
): SocialLink | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.includes("|")) {
    const [platform, ...rest] = trimmed.split("|");
    const url = rest.join("|").trim();

    if (isSocialPlatform(platform) && url) {
      return {
        platform,
        url,
      };
    }

    return null;
  }

  if (!looksLikeUrl(trimmed)) {
    return null;
  }

  const fallbackPlatform = socialPlatformOptions[index]?.value ?? "instagram";

  return {
    platform: fallbackPlatform,
    url: trimmed,
  };
}

export function serializeSocialLinks(links: SocialLink[]): string[] {
  return links
    .map((link) => ({
      platform: link.platform,
      url: link.url.trim(),
    }))
    .filter((link) => link.url)
    .slice(0, 4)
    .map((link) => `${link.platform}|${link.url}`);
}

export function normalizeSocialHref(url: string): string {
  const trimmed = url.trim();

  if (!trimmed) {
    return "#";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function getSocialPlatformMeta(platform: SocialPlatform) {
  return socialPlatformMap.get(platform) ?? socialPlatformOptions[0];
}

function isSocialPlatform(value: string): value is SocialPlatform {
  return socialPlatformMap.has(value as SocialPlatform);
}

function looksLikeUrl(value: string) {
  return /^(https?:\/\/|www\.)/i.test(value);
}
