import { SITE } from "../data/site";
import { projectsData } from "../data/projects";
import { getAllSkills } from "../data/skills";
import { experiences } from "../data/experience";
import { educationData } from "../data/education";
import { sortProjectsNewestFirst } from "@/lib/project-sorting";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "";

function backendApiUrl(path: string) {
  if (!BACKEND_URL) throw new Error("BACKEND_URL is not configured");
  return `${BACKEND_URL}${path}`;
}

/**
 * Helper to make requests to backend with credentials & session token
 */
export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; [key: string]: any }> {
  try {
    const url = backendApiUrl(path.startsWith("/") ? path : `/${path}`);
    const headers = new Headers(options.headers || {});

    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers,
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message ||
          `Request failed with status ${response.status}`,
        ...result,
      };
    }

    return result;
  } catch (error: any) {
    console.error(`[apiFetch] Network/error connecting to ${path}:`, error);
    return {
      success: false,
      message: error.message || "Network error connecting to backend server",
    };
  }
}

/* ================= Public Fetchers with Fallbacks ================= */

export async function fetchProfile() {
  try {
    const res = await fetch(backendApiUrl("/api/profile"), {
      next: { revalidate: 60 },
    }).then((r) => (r.ok ? r.json() : null));

    if (res?.success && res?.data) {
      return res.data;
    }
  } catch {
    // fallback
  }
  return {
    name: "Fuad Al Maimun",
    rotatingTexts: [
      "Fuad Al Maimun",
      "Full Stack Developer",
      "Passionate Web Developer",
      "Building Modern Web Apps",
    ],
    welcomeBadge: "Welcome to my portfolio",
    headlinePrefix: "Hi, I'm",
    description:
      "I specialize in crafting high-performance, modern web applications using React, Next.js, TypeScript, and clean architecture.",
    profileImage: "/images/profile.png.jpeg",
    resumeUrl: "/Fuad Al Maimun_Full Stack_ Resume.pdf",
    resumeDownloadName: "Fuad Al Maimun_Full Stack_ Resume.pdf",
    email: "fuadmaymun0@gmail.com",
    phone: "+880 1300 725948",
  };
}

export async function fetchAbout() {
  try {
    const res = await fetch(backendApiUrl("/api/about"), {
      next: { revalidate: 60 },
    }).then((r) => (r.ok ? r.json() : null));

    if (res?.success && res?.data) {
      return res.data;
    }
  } catch {
    // fallback
  }
  return {
    badge: "Get To Know Me",
    title: "About",
    titleHighlight: "Me",
    summary:
      "A developer dedicated to engineering modern, responsive, and human-friendly web applications with clean code and high attention to detail.",
  };
}

export async function fetchProjects() {
  try {
    const res = await fetch(backendApiUrl("/api/projects"), {
      cache: "no-store",
    }).then((r) => (r.ok ? r.json() : null));

    if (res?.success && Array.isArray(res?.data) && res.data.length > 0) {
      return sortProjectsNewestFirst(res.data);
    }
  } catch {
    // fallback
  }
  return sortProjectsNewestFirst(projectsData);
}

export async function fetchProjectById(id: string) {
  try {
    const res = await fetch(backendApiUrl(`/api/projects/${encodeURIComponent(id)}`), {
      cache: "no-store",
    }).then((r) => (r.ok ? r.json() : null));

    if (res?.success && res?.data) {
      return res.data;
    }
  } catch {
    // fallback
  }
  return projectsData.find((p) => String(p.id) === String(id)) || null;
}

export async function fetchSkills() {
  try {
    const res = await fetch(backendApiUrl("/api/skills"), {
      cache: "no-store",
    }).then((r) => (r.ok ? r.json() : null));

    if (res?.success && Array.isArray(res?.data) && res.data.length > 0) {
      return res.data;
    }
  } catch {
    // fallback
  }
  return getAllSkills();
}

export async function fetchExperiences() {
  try {
    const res = await fetch(backendApiUrl("/api/experiences"), {
      cache: "no-store",
    }).then((r) => (r.ok ? r.json() : null));

    if (res?.success && Array.isArray(res?.data) && res.data.length > 0) {
      return res.data;
    }
  } catch {
    // fallback
  }
  return experiences;
}

export async function fetchEducation() {
  try {
    const res = await fetch(backendApiUrl("/api/education"), {
      cache: "no-store",
    }).then((r) => (r.ok ? r.json() : null));

    if (res?.success && Array.isArray(res?.data) && res.data.length > 0) {
      return res.data;
    }
  } catch {
    // fallback
  }
  return educationData;
}

export async function fetchServices() {
  try {
    const res = await fetch(backendApiUrl("/api/services"), {
      cache: "no-store",
    }).then((r) => (r.ok ? r.json() : null));

    if (res?.success && Array.isArray(res?.data) && res.data.length > 0) {
      return res.data;
    }
  } catch {
    // fallback
  }
  return [];
}

export async function fetchTestimonials() {
  try {
    const res = await fetch(backendApiUrl("/api/testimonials"), {
      cache: "no-store",
    }).then((r) => (r.ok ? r.json() : null));

    if (res?.success && Array.isArray(res?.data) && res.data.length > 0) {
      return res.data;
    }
  } catch {
    // fallback
  }
  return [];
}

export async function fetchSettings() {
  try {
    const res = await fetch(backendApiUrl("/api/settings"), {
      cache: "no-store",
    }).then((r) => (r.ok ? r.json() : null));

    if (res?.success && res?.data) {
      return res.data;
    }
  } catch {
    // fallback
  }
  return null;
}

/* ================= Public Contact Form Submission ================= */

export async function submitContactMessage(payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  company?: string;
}) {
  return apiFetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

/* ================= Admin Upload ================= */

export async function uploadImageToBackend(file: File, token?: string) {
  const formData = new FormData();
  formData.append("image", file);

  // Keep uploads behind the Next.js route, which verifies Better Auth on every request.
  void token;
  try {
    const localResponse = await fetch("/api/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    return await localResponse.json();
  } catch (err: any) {
    console.error("[uploadImageToBackend] Upload error:", err);
    return {
      success: false,
      message: err.message || "Failed to upload image to ImageBB.",
    };
  }
}
