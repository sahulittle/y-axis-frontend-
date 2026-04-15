import React from "react";
import { useToast } from "../../../app/providers/ToastProvider";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import { useUpdateUserProfileMutation, useUploadUserAvatarMutation, useUserProfileQuery } from "./hooks";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  phone: "",
  country: "",
  avatarUrl: "",
  profile: {
    dateOfBirth: "",
    educationLevel: "",
    yearsOfExperience: "",
    currentCountry: "",
    targetCountry: "",
  },
};

const UserProfilePage = () => {
  const toast = useToast();
  const [form, setForm] = React.useState(EMPTY_FORM);

  const profileQuery = useUserProfileQuery();
  const updateMutation = useUpdateUserProfileMutation();
  const uploadAvatarMutation = useUploadUserAvatarMutation();

  React.useEffect(() => {
    if (!profileQuery.data) {
      return;
    }

    const profile = profileQuery.data;
    setForm({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      phone: profile.phone || "",
      country: profile.country || "",
      avatarUrl: profile.avatarUrl || "",
      profile: {
        dateOfBirth: profile.profile?.dateOfBirth
          ? new Date(profile.profile.dateOfBirth).toISOString().slice(0, 10)
          : "",
        educationLevel: profile.profile?.educationLevel || "",
        yearsOfExperience:
          profile.profile?.yearsOfExperience === undefined || profile.profile?.yearsOfExperience === null
            ? ""
            : String(profile.profile.yearsOfExperience),
        currentCountry: profile.profile?.currentCountry || "",
        targetCountry: profile.profile?.targetCountry || "",
      },
    });
  }, [profileQuery.data]);

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const setProfileField = (key, value) => {
    setForm((current) => ({
      ...current,
      profile: {
        ...current.profile,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      country: form.country.trim(),
      avatarUrl: form.avatarUrl.trim(),
      profile: {
        dateOfBirth: form.profile.dateOfBirth || undefined,
        educationLevel: form.profile.educationLevel.trim(),
        yearsOfExperience:
          form.profile.yearsOfExperience === "" ? undefined : Number(form.profile.yearsOfExperience),
        currentCountry: form.profile.currentCountry.trim(),
        targetCountry: form.profile.targetCountry.trim(),
      },
    };

    try {
      await updateMutation.mutateAsync(payload);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const updated = await uploadAvatarMutation.mutateAsync(formData);
      setField("avatarUrl", updated?.avatarUrl || "");
      toast.success("Profile photo updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to upload profile photo");
    } finally {
      event.target.value = "";
    }
  };

  if (profileQuery.isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Loading profile...</div>;
  }

  if (profileQuery.error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
        {profileQuery.error.message || "Failed to load profile"}
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">My Profile</h2>
        <p className="mt-1 text-sm text-slate-600">Update your personal details used across applications and support flows.</p>
      </div>

      <form className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 md:p-5" onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Profile Photo</h3>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <img
              src={form.avatarUrl || "https://placehold.co/120x120?text=Avatar"}
              alt="Profile avatar"
              className="h-20 w-20 rounded-2xl border border-slate-200 object-cover"
            />
            <div className="space-y-2">
              <input type="file" accept="image/*" onChange={handleAvatarUpload} />
              <p className="text-xs text-slate-500">Upload JPG, PNG, or WEBP image.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Input
            placeholder="First Name"
            value={form.firstName}
            onChange={(event) => setField("firstName", event.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={form.lastName}
            onChange={(event) => setField("lastName", event.target.value)}
          />
          <Input placeholder="Email" value={profileQuery.data?.email || ""} disabled />
          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(event) => setField("phone", event.target.value)}
          />
          <Input
            placeholder="Country"
            value={form.country}
            onChange={(event) => setField("country", event.target.value)}
          />
          <Input
            placeholder="Avatar URL"
            value={form.avatarUrl}
            onChange={(event) => setField("avatarUrl", event.target.value)}
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Additional Profile</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <Input
              type="date"
              value={form.profile.dateOfBirth}
              onChange={(event) => setProfileField("dateOfBirth", event.target.value)}
            />
            <Input
              placeholder="Education Level"
              value={form.profile.educationLevel}
              onChange={(event) => setProfileField("educationLevel", event.target.value)}
            />
            <Input
              type="number"
              placeholder="Years of Experience"
              value={form.profile.yearsOfExperience}
              onChange={(event) => setProfileField("yearsOfExperience", event.target.value)}
            />
            <Input
              placeholder="Current Country"
              value={form.profile.currentCountry}
              onChange={(event) => setProfileField("currentCountry", event.target.value)}
            />
            <Input
              placeholder="Target Country"
              value={form.profile.targetCountry}
              onChange={(event) => setProfileField("targetCountry", event.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={updateMutation.isPending || uploadAvatarMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UserProfilePage;
