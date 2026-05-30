import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  CameraIcon,
  ShuffleIcon,
  ShipWheelIcon,
  LoaderIcon,
} from "lucide-react";
import { COUNTRIES } from "../constants";
import ReactCountryFlag from "react-country-flag";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCountries = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Onboarding complete");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const index = Math.floor(Math.random() * 100) + 1;
    const RandomAvatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${index}`
    setFormState({...formState, profilePic: RandomAvatar})
    toast.success("Avatar updated");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <ShipWheelIcon className="size-7 text-primary" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Set up your profile
          </h1>
          <p className="text-base-content/50 mt-2 text-sm">
            Tell the community a bit about yourself
          </p>
        </div>

        <div className="bg-base-200 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="size-20 rounded-2xl bg-base-300 overflow-hidden flex items-center justify-center">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CameraIcon className="size-8 text-base-content opacity-30" />
                )}
              </div>
            </div>

            <div>
              <p className="font-medium text-sm mb-1">Profile photo</p>
              <p className="text-xs text-base-content/50 mb-3">
                Choose a random avatar to get started
              </p>

              <button
                type="button"
                onClick={handleRandomAvatar}
                className="btn btn-sm btn-outline gap-2"
              >
                <ShuffleIcon className="size-3.5" />
                Randomize
              </button>
            </div>
          </div>

          <div className="divider my-0" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="input input-bordered w-full bg-base-100"
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea textarea-bordered w-full bg-base-100 h-24 resize-none"
                placeholder="Tell others about yourself"
              />
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-sm font-medium">Country</label>

              <div
                onClick={() => setIsOpen(!isOpen)}
                className="input input-bordered bg-base-100 w-full flex items-center cursor-pointer"
              >
                {formState.location ? (
                  <span className="flex items-center gap-2">
                    {(() => {
                      const c = COUNTRIES.find((c) => c.name === formState.location);
                      return c ? <ReactCountryFlag countryCode={c.code} svg style={{ width: "1.2em", height: "1.2em" }} /> : null;
                    })()}
                    {formState.location}
                  </span>
                ) : (
                  <span className="text-base-content/50">
                    Select your country
                  </span>
                )}
              </div>

              {isOpen && (
                <div className="absolute z-50 mt-2 w-full bg-base-200 border border-base-300 rounded-xl shadow-lg">
                  <div className="p-2 border-b border-base-300">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search country..."
                      className="input input-sm input-bordered w-full bg-base-100"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <ul className="max-h-60 overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <li key={country.code}>
                        <button
                          type="button"
                          onClick={() => {
                            setFormState({
                              ...formState,
                              location: country.name,
                            });
                            setIsOpen(false);
                            setSearch("");
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-base-300 flex items-center gap-2"
                        >
                          <ReactCountryFlag countryCode={country.code} svg style={{ width: "1.2em", height: "1.2em" }} />
                          {country.name}
                        </button>
                      </li>
                    ))}

                    {filteredCountries.length === 0 && (
                      <li className="px-3 py-2 text-sm opacity-60">
                        No countries found 😢
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <button
              className="btn btn-primary w-full mt-2"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-4" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-4" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;