"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

import {
  parseSocialLinks,
  serializeSocialLinks,
  socialPlatformOptions,
} from "@/lib/social";
import type { SocialLink, User, UserAccent, UserUpdate } from "@/types/user";
import useUsers from "@/hooks/useUsers";

const accentOptions: { value: UserAccent; label: string }[] = [
  { value: "indigo", label: "Indigo" },
  { value: "cyan", label: "Cyan" },
  { value: "emerald", label: "Emerald" },
];

function toEditableProfile(user: User): UserUpdate {
  return {
    uname: user.uname ?? "",
    fname: user.fname ?? "",
    lname: user.lname ?? "",
    bio: user.bio ?? "",
    phone: user.phone ?? "",
    address: user.address ?? "",
    birth_location: user.birth_location ?? "",
    birth_date: user.birth_date ?? "",
    gender: user.gender ?? "",
    status_relationship: user.status_relationship ?? "",
    prodi: user.prodi ?? "",
    accent: accentOptions.some((option) => option.value === user.accent)
      ? user.accent
      : "indigo",
    url_social: user.url_social ?? [],
    npm: user.npm ?? "",
  };
}

export default function EditProfileModal({
  open,
  user,
  onClose,
}: {
  open: boolean;
  user: User | null;
  onClose: () => void;
}) {
  const { editUser, deleteUser } = useUsers();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!open || !user) {
    return null;
  }

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setSaving(true);
    setError(null);
    try {
      await deleteUser(user.id);
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete account.",
      );
      setSaving(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleSubmit = async (data: UserUpdate) => {
    setSaving(true);
    setError(null);
    try {
      await editUser(user.id, data);
      onClose();
      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update profile.",
      );
      setSaving(false);
    }
  };

  return (
    <>
      <EditProfileDialog
        key={user.id}
        user={user}
        saving={saving}
        error={error}
        onClose={onClose}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="glass-card w-full max-w-sm rounded-none border border-white/10 bg-zinc-950 p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-red-500">
              <span className="material-symbols-outlined text-3xl">warning</span>
              <h3 className="text-xl font-bold">Delete Account</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-300">
              Are you absolutely sure? All of your profile data will be permanently removed from Deadliners. This action <strong>cannot</strong> be undone.
            </p>
            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={saving}
                className="border border-white/10 px-4 py-2 text-sm font-bold text-zinc-300 transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={saving}
                className="flex items-center gap-2 bg-red-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-600 disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    Deleting...
                  </>
                ) : (
                  <>Delete Account</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function EditProfileDialog({
  user,
  saving,
  error,
  onClose,
  onSubmit,
  onDelete,
}: {
  user: User;
  saving: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (data: UserUpdate) => Promise<void>;
  onDelete: () => void;
}) {
  const [form, setForm] = useState<UserUpdate>(() => toEditableProfile(user));
  const [validationError, setValidationError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    const parsed = parseSocialLinks(user.url_social);
    return parsed.length > 0
      ? parsed
      : [{ platform: "instagram", url: "" }];
  });

  const formError = validationError ?? error;

  const updateField =
    (field: keyof UserUpdate) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const { value } = event.target;
      setForm((current) => {
        return {
          ...current,
          [field]: value,
        };
      });
    };

  const validateIdentityStep = () => {
    if (!form.uname.trim() || !form.fname.trim() || !form.lname.trim() || !form.prodi.trim() || !form.accent) {
      setValidationError(
        "Username, first name, last name, department, and accent are required.",
      );
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleNextStep = () => {
    if (!validateIdentityStep()) {
      return;
    }

    setStep(2);
  };

  const handlePreviousStep = () => {
    setValidationError(null);
    setStep((current) => (current === 3 ? 2 : 1));
  };

  const updateSocialLink =
    (index: number, field: keyof SocialLink) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
      const { value } = event.target;

      setSocialLinks((current) =>
        current.map((link, currentIndex) =>
          currentIndex === index
            ? {
                ...link,
                [field]: value,
              }
            : link,
        ),
      );
    };

  const addSocialLink = () => {
    setSocialLinks((current) => {
      if (current.length >= 4) {
        return current;
      }

      const usedPlatforms = new Set(current.map((link) => link.platform));
      const nextPlatform =
        socialPlatformOptions.find(
          (option) => !usedPlatforms.has(option.value),
        )?.value ?? "instagram";

      return [
        ...current,
        {
          platform: nextPlatform,
          url: "",
        },
      ];
    });
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks((current) => {
      if (current.length === 1) {
        return [{ platform: "instagram", url: "" }];
      }

      return current.filter((_, currentIndex) => currentIndex !== index);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 1) {
      handleNextStep();
      return;
    }

    if (step === 2) {
      setValidationError(null);
      setStep(3);
      return;
    }

    const serializedSocialLinks = serializeSocialLinks(socialLinks);
    const invalidLink = socialLinks.find((link) => {
      const trimmedUrl = link.url.trim();

      if (!trimmedUrl) {
        return false;
      }

      try {
        new URL(
          /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`,
        );
        return false;
      } catch {
        return true;
      }
    });

    if (invalidLink) {
      setValidationError(
        "Each social link must use a valid URL, for example https://instagram.com/username.",
      );
      return;
    }

    const nextForm: UserUpdate = {
      uname: form.uname.trim(),
      fname: form.fname.trim(),
      lname: form.lname.trim(),
      bio: form.bio.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      birth_location: form.birth_location.trim(),
      birth_date: form.birth_date,
      gender: form.gender,
      status_relationship: form.status_relationship,
      prodi: form.prodi.trim(),
      accent: form.accent,
      url_social: serializedSocialLinks,
      npm: form.npm.trim(),
    };

    if (
      !nextForm.uname ||
      !nextForm.fname ||
      !nextForm.lname ||
      !nextForm.prodi ||
      !nextForm.accent
    ) {
      setValidationError(
        "Username, first name, last name, department, and accent are required.",
      );
      return;
    }

    setValidationError(null);
    await onSubmit(nextForm);
  };

  const renderStepOne = () => (
    <div className="grid gap-6 px-6 py-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div className="overflow-hidden border border-white/10 bg-zinc-900">
          {user.img_url ? (
            <Image
              src={user.img_url}
              alt={`${user.fname} ${user.lname}`.trim() || "Profile"}
              width={240}
              height={240}
              className="aspect-square h-auto w-full object-cover"
              unoptimized
            />
          ) : (
            <div className="flex aspect-square items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-white/30">
                account_circle
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3 border border-white/10 bg-black/30 p-4 text-sm">
          <div>
            <p className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Avatar Source
            </p>
            <p className="mt-2 text-white">Google Profile Photo</p>
            <p className="mt-2 text-xs leading-6 text-zinc-400">
              Avatar stays read-only in v1. Change it from your Google account
              if you want a different image here.
            </p>
          </div>
          <div className="border-t border-white/10 pt-3">
            <p className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Email
            </p>
            <p className="mt-1 break-all text-white">{user.gmail}</p>
          </div>
        </div>
      </aside>

      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Username
            </span>
            <input
              value={form.uname}
              onChange={updateField("uname")}
              className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/50"
              placeholder="@your_handle"
            />
          </label>

          <label className="space-y-2">
            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Department
            </span>
            <input
              value={form.prodi}
              onChange={updateField("prodi")}
              className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/50"
              placeholder="Computer Science"
            />
          </label>

          <label className="space-y-2">
            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              First Name
            </span>
            <input
              value={form.fname}
              onChange={updateField("fname")}
              className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/50"
            />
          </label>

          <label className="space-y-2">
            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Last Name
            </span>
            <input
              value={form.lname}
              onChange={updateField("lname")}
              className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/50"
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Origin
            </span>
            <input
              value={form.birth_location}
              onChange={updateField("birth_location")}
              className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/50"
              placeholder="Jakarta, ID"
            />
          </label>

          <label className="space-y-2">
            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Birth Date
            </span>
            <input
              type="date"
              value={form.birth_date}
              onChange={updateField("birth_date")}
              className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors focus:border-accent/50 [&::-webkit-calendar-picker-indicator]:invert"
            />
          </label>

          <label className="space-y-2">
            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              NPM
            </span>
            <input
              type="text"
              value={form.npm}
              onChange={updateField("npm")}
              className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors focus:border-accent/50"
            />
          </label>

          <label className="space-y-2">
            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Gender
            </span>
            <div className="relative">
              <select
                value={form.gender}
                onChange={updateField("gender")}
                className="w-full appearance-none border border-white/10 bg-black/30 px-4 py-3 pr-10 text-white outline-none transition-colors focus:border-accent/50"
              >
                <option value="" disabled className="text-zinc-500">Select Gender</option>
                <option value="Male" className="bg-zinc-900 text-white">Male</option>
                <option value="Female" className="bg-zinc-900 text-white">Female</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                expand_more
              </span>
            </div>
          </label>

          <label className="space-y-2 md:max-w-xs">
            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Accent
            </span>
            <div className="relative">
              <select
                value={form.accent}
                onChange={updateField("accent")}
                className="w-full appearance-none border border-white/10 bg-black/30 px-4 py-3 pr-10 text-white outline-none transition-colors focus:border-accent/50"
              >
                {accentOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-zinc-900 text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                expand_more
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="grid gap-6 px-6 py-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div className="space-y-4 border border-white/10 bg-black/30 p-4">
          <div>
            <p className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Public Directory
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              These fields control the profile summary and contact metadata shown
              on the Deadliners directory.
            </p>
          </div>

          <div className="border-t border-white/10 pt-4 text-sm">
            <p className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              NPM
            </p>
            <p className="mt-1 text-white">{user.npm || "-"}</p>
          </div>

          <div className="border-t border-white/10 pt-4 text-sm">
            <p className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Current Accent
            </p>
            <p className="mt-1 text-white capitalize">{form.accent}</p>
          </div>
        </div>
      </aside>

      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Phone
            </span>
            <input
              value={form.phone}
              onChange={updateField("phone")}
              className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/50"
              placeholder="+62..."
            />
          </label>

          <label className="space-y-2">
            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Address
            </span>
            <input
              value={form.address}
              onChange={updateField("address")}
              className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/50"
              placeholder="Street, city, province"
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Relationship Status
            </span>
            <div className="relative">
              <select
                value={form.status_relationship}
                onChange={updateField("status_relationship")}
                className="w-full appearance-none border border-white/10 bg-black/30 px-4 py-3 pr-10 text-white outline-none transition-colors focus:border-accent/50"
              >
                <option value="" disabled className="text-zinc-500">Select Status</option>
                <option value="Single" className="bg-zinc-900 text-white">Single</option>
                <option value="Dating" className="bg-zinc-900 text-white">In a relationship</option>
                <option value="Married" className="bg-zinc-900 text-white">Married</option>
                <option value="Complicated" className="bg-zinc-900 text-white">It&apos;s complicated</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                expand_more
              </span>
            </div>
          </label>
        </div>

        <label className="block space-y-2">
          <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
            Bio
          </span>
          <textarea
            value={form.bio}
            onChange={updateField("bio")}
            rows={7}
            className="w-full resize-none border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/50"
            placeholder="Write a short public profile summary..."
          />
        </label>
      </div>
    </div>
  );

  const renderStepThree = () => (
    <div className="grid gap-6 px-6 py-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div className="space-y-4 border border-white/10 bg-black/30 p-4">
          <div>
            <p className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Social Links
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Add up to four public links. These will be rendered directly on
              your profile card.
            </p>
          </div>

          <div className="border-t border-white/10 pt-4 text-sm">
            <p className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Limit
            </p>
            <p className="mt-1 text-white">Maximum 4 social entries</p>
          </div>

          <div className="border-t border-white/10 pt-4 text-sm">
            <p className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Tip
            </p>
            <p className="mt-1 text-zinc-400">
              Use full URLs for the cleanest result.
            </p>
          </div>
        </div>
      </aside>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              Social Directory
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Platform + URL pairs, ready for the public card.
            </p>
          </div>
          <button
            type="button"
            onClick={addSocialLink}
            disabled={socialLinks.length >= 4}
            className="flex items-center gap-2 border border-white/10 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add Social
          </button>
        </div>

        <div className="space-y-4">
          {socialLinks.map((link, index) => (
            <div
              key={`${link.platform}-${index}`}
              className="grid gap-4 border border-white/10 bg-black/30 p-4 md:grid-cols-[180px_minmax(0,1fr)_auto]"
            >
              <label className="space-y-2">
                <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                  Platform
                </span>
                <div className="relative">
                  <select
                    value={link.platform}
                    onChange={updateSocialLink(index, "platform")}
                    className="w-full appearance-none border border-white/10 bg-black/40 px-4 py-3 pr-10 text-white outline-none transition-colors focus:border-accent/50"
                  >
                    {socialPlatformOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-zinc-900 text-white"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    expand_more
                  </span>
                </div>
              </label>

              <label className="space-y-2">
                <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                  URL
                </span>
                <input
                  value={link.url}
                  onChange={updateSocialLink(index, "url")}
                  className="w-full border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/50"
                  placeholder="https://instagram.com/username"
                />
              </label>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="flex h-[50px] items-center justify-center border border-white/10 px-4 text-zinc-400 transition-colors hover:border-red-500/40 hover:text-red-400"
                >
                  <span className="material-symbols-outlined text-base">
                    delete
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={saving ? undefined : onClose}
    >
      <div
        className="glass-card flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-none border-white/10 bg-zinc-950/95 relative"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="scanline bg-gradient-to-r from-transparent via-accent to-transparent opacity-100" />

        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-label text-[10px] tracking-[0.25em] text-zinc-500 uppercase">
                Profile Control
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                Edit Your Profile
              </h2>
              <p className="mt-2 max-w-xl text-sm text-zinc-400">
                Update the public profile fields used across the Deadliners
                directory. Your avatar is still sourced from your Google
                account.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className={`font-label flex items-center gap-2 border px-3 py-2 text-[10px] tracking-[0.2em] uppercase ${
                    step === 1
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-white/10 text-zinc-500"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[9px]">
                    1
                  </span>
                  Identity
                </div>
                <div className="h-px w-8 bg-white/10" />
                <div
                  className={`font-label flex items-center gap-2 border px-3 py-2 text-[10px] tracking-[0.2em] uppercase ${
                    step === 2
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-white/10 text-zinc-500"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[9px]">
                    2
                  </span>
                  Public Details
                </div>
                <div className="h-px w-8 bg-white/10" />
                <div
                  className={`font-label flex items-center gap-2 border px-3 py-2 text-[10px] tracking-[0.2em] uppercase ${
                    step === 3
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-white/10 text-zinc-500"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[9px]">
                    3
                  </span>
                  Social
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-400 transition-colors hover:border-accent/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-col overflow-hidden">
          <div className="overflow-y-auto">
            {step === 1
              ? renderStepOne()
              : step === 2
                ? renderStepTwo()
                : renderStepThree()}
          </div>

          <div className="shrink-0 border-t border-white/10 px-6 py-4">
            {formError ? (
              <div className="mb-4 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {formError}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={onDelete}
                  disabled={saving}
                  className="flex items-center gap-2 text-sm font-bold text-red-500/80 transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                  Delete Account
                </button>
                <p className="hidden text-xs text-zinc-500 xl:block">
                  Required fields: username, first name, last name.
                </p>
              </div>
              <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              {step === 2 ? (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  disabled={saving}
                  className="flex items-center gap-2 border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-base">
                    arrow_back
                  </span>
                  Back
                </button>
              ) : null}
              {step === 3 ? (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  disabled={saving}
                  className="flex items-center gap-2 border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-base">
                    arrow_back
                  </span>
                  Back
                </button>
              ) : null}
              {step === 1 || step === 2 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (step === 1) {
                      handleNextStep();
                      return;
                    }
                    setValidationError(null);
                    setStep(3);
                  }}
                  className="flex min-w-32 items-center justify-center gap-2 bg-accent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-accent/90"
                >
                  Next
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center justify-center gap-2 bg-accent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-base">
                        progress_activity
                      </span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">
                        save
                      </span>
                      Save Profile
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}
