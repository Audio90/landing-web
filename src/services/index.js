import axios from "axios";

const web3Forms = axios.create({
  baseURL: "https://api.web3forms.com",
  headers: {
    Accept: "application/json",
  },
  timeout: 15000,
});

const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function joinAudio90Waitlist(formData) {
  formData.set("access_key", web3FormsAccessKey);
  formData.set("subject", "New Audio 90 waitlist signup");
  formData.set("from_name", "Audio 90 Waitlist");

  const { data } = await web3Forms.post("/submit", formData);

  if (!data?.success) {
    throw new Error(data?.message || "Unable to join the waitlist");
  }

  return data;
}

export default api;
