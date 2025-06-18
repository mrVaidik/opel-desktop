import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
});

export const fetchUserProfile = async (clerkid: string) => {
  const response = await httpClient.get(`/auth/${clerkid}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response.data);
  return response.data;
};

export const updateStudioSettings = async (
  id: string,
  screen: string,
  audio: string,
  preset: "HD" | "SD"
) => {
  const response = await httpClient.post(
    `/studio/${id}`,
    { screen, audio, preset },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

//this is using the ipc renderer from electron.
//This lets us send event data to the electron main js
//The main js handle the creation of the electron window
//and its communication to the OS
//we use a context bridge to expose the renderer api
//to handle these event transmissions
export const onCloseApp = () => window.ipcRenderer.send("closeApp");

export const getMediaSources = async () => {
  const displays = await window.ipcRenderer.invoke("getSources");
  const enumerateDevices =
    await window.navigator.mediaDevices.enumerateDevices();
  const audioInputs = enumerateDevices.filter(
    (device) => device.kind == "audioinput"
  );
  console.log("getting sources");
  return { displays, audio: audioInputs };
};

export const resizeWindow = (shrink: boolean) =>
  window.ipcRenderer.send("resize-studio", { shrink });

export const hidePluginWindow = (state: boolean) => {
  window.ipcRenderer.send("hide-plugin", { state });
};

//timer
export const videoRecordingTime = (ms: number) => {
  const second = Math.floor((ms / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const minute = Math.floor((ms / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");
  const hour = Math.floor(ms / 1000 / 60 / 60)
    .toString()
    .padStart(2, "0");
  return { length: `${hour}:${minute}:${second}`, minute };
};
