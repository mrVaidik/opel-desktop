import { updateStudioSettings } from "@/lib/utils";
import { updateStudioSettingsSchema } from "@/schemas/studio-settings.schema";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useZodForm } from "./useZodForm";

export const useStudioSettings = (
  id: string,
  screen?: string | null,
  audio?: string | null,
  preset?: "HD" | "SD",
  plan?: "PRO" | "FREE"
) => {
  const { register, watch } = useZodForm(updateStudioSettingsSchema, {
    screen: screen!,
    audio: audio!,
    preset: preset!,
  });

  const [onPreset, setPreset] = useState<"HD" | "SD" | undefined>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-studio"],
    mutationFn: (data: {
      screen: string;
      id: string;
      audio: string;
      preset: "HD" | "SD";
    }) => updateStudioSettings(data.id, data.screen, data.audio, data.preset),
    onSuccess: (data) => {
      return toast(data.status === 200 ? "Success" : "Error", {
        description: data.message,
      });
    },
  });

  useEffect(() => {
    //set sources on mount
    if (screen && audio && preset)
      window.ipcRenderer.send("media-sources", {
        screen,
        id: id,
        audio,
        preset,
        plan,
      });
  }, []);

  useEffect(() => {
    //set sources on change
    const subscribe = watch((values) => {
      setPreset(values.preset);
      mutate({
        screen: values.screen!,
        id: id,
        audio: values.audio!,
        preset: values.preset!,
      });
      //we send the user id to the second screen to sync the studio tray
      window.ipcRenderer.send("media-sources", {
        screen: values.screen,
        id: id,
        audio: values.audio,
        preset: values.preset,
        plan,
      });
    });
    return () => subscribe.unsubscribe();
  }, [watch]);

  return { register, isPending, onPreset };
};
