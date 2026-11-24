"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  User,
  Info,
  Briefcase,
  Layers,
  GraduationCap,
  Wrench,
  MessageSquare,
  Settings as SettingsIcon,
  Plus,
  Trash2,
  Edit,
  Save,
  Check,
  X,
  ExternalLink,
  Loader2,
  AlertTriangle,
  RefreshCw,
  LogOut,
  Eye,
  Star,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { sortProjectsByDisplayOrder } from "@/lib/project-sorting";
import { SHOWCASE_SKILLS } from "@/data/showcase-skills";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Data states
  const [profile, setProfile] = useState<any>(null);
  const [about, setAbout] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [resumeUploadError, setResumeUploadError] = useState("");

  // Modal / Editing states
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [editingEducation, setEditingEducation] = useState<any>(null);
  const [editingService, setEditingService] = useState<any>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [viewingMessage, setViewingMessage] = useState<any>(null);

  // Authorized Admin Check
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  // Next free display number for a newly created project.
  const nextProjectOrder = () =>
    projects.reduce((max, project) => Math.max(max, Number(project.order) || 0), 0) + 1;

  useEffect(() => {
    async function verifyAdmin() {
      if (sessionLoading) return;

      // 1. Not logged in: strictly deny and redirect to sign-in
      if (!session?.user) {
        setIsAuthorized(false);
        setLoading(false);
        router.replace("/login?redirect=/dashboard/admin");
        return;
      }

      // 2. Logged in but not admin: strictly forbid access
      if (session.user.role !== "admin") {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      setIsAuthorized(true);
      loadAllData();
    }

    verifyAdmin();
  }, [session, sessionLoading, router]);

  // Load all CMS collections
  async function loadAllData() {
    setLoading(true);

    try {
      const [
        pRes,
        aRes,
        projRes,
        skRes,
        expRes,
        eduRes,
        srvRes,
        testRes,
        msgRes,
        settRes,
      ] = await Promise.all([
        fetch(`/api/admin/profile`).then((r) => r.json()).catch(() => ({})),
        fetch(`/api/admin/about`).then((r) => r.json()).catch(() => ({})),
        fetch(`/api/admin/projects`).then((r) => r.json()).catch(() => ({})),
        fetch(`/api/admin/skills`).then((r) => r.json()).catch(() => ({})),
        fetch(`/api/admin/experiences`).then((r) => r.json()).catch(() => ({})),
        fetch(`/api/admin/education`).then((r) => r.json()).catch(() => ({})),
        fetch(`/api/admin/services`).then((r) => r.json()).catch(() => ({})),
        fetch(`/api/admin/testimonials`).then((r) => r.json()).catch(() => ({})),
        fetch(`/api/admin/messages`)
          .then((r) => r.json())
          .catch(() => ({})),
        fetch(`/api/admin/settings`).then((r) => r.json()).catch(() => ({})),
      ]);

      if (pRes?.data) setProfile(pRes.data);
      if (aRes?.data) setAbout(aRes.data);
      if (projRes?.data) setProjects(sortProjectsByDisplayOrder(projRes.data));
      if (skRes?.data) setSkills(skRes.data);
      if (expRes?.data) setExperiences(expRes.data);
      if (eduRes?.data) setEducation(eduRes.data);
      if (srvRes?.data) setServices(srvRes.data);
      if (testRes?.data) setTestimonials(testRes.data);
      if (msgRes?.data) setMessages(msgRes.data);
      if (settRes?.data) setSettings(settRes.data);
    } catch (err) {
      console.error("[admin] Error loading CMS data:", err);
    } finally {
      setLoading(false);
    }
  }

  // Toast auto-clear
  const showToast = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Generic authenticated API caller
  const callAdminApi = async (path: string, method = "GET", body?: any) => {
    try {
      const res = await fetch(`/api/admin${path}`, {
        method,
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return {
          success: false,
          message: data.message || `Request failed with status ${res.status}`,
          ...data,
        };
      }

      return data;
    } catch (err: any) {
      console.error(`[callAdminApi] Error on ${method} ${path}:`, err);
      return {
        success: false,
        message: err.message || "Failed to communicate with backend server.",
      };
    }
  };

  /* ================= Save Handlers ================= */

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await callAdminApi("/api/profile", "PUT", profile);
    setSaving(false);
    if (res.success) {
      showToast("success", "Profile updated successfully!");
    } else {
      showToast("error", res.message || "Failed to update profile.");
    }
  };

  const saveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await callAdminApi("/api/about", "PUT", about);
    setSaving(false);
    if (res.success) {
      showToast("success", "About section updated successfully!");
    } else {
      showToast("error", res.message || "Failed to update about section.");
    }
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await callAdminApi("/api/settings", "PUT", settings);
    setSaving(false);
    if (res.success) {
      showToast("success", "Website settings updated successfully!");
    } else {
      showToast("error", res.message || "Failed to update website settings.");
    }
  };

  /* Projects */
  const saveProjectModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const isEdit = !!editingProject._id || projects.some((p) => p.id === editingProject.id);
    const endpoint = isEdit ? `/api/projects/${editingProject.id}` : `/api/projects`;
    const method = isEdit ? "PUT" : "POST";

    const parsedOrder = Number(editingProject.order);
    const projectOrder =
      Number.isFinite(parsedOrder) && parsedOrder > 0 ? parsedOrder : nextProjectOrder();
    const projectPayload = isEdit
      ? { ...editingProject, order: projectOrder }
      : { ...editingProject, order: projectOrder, createdAt: new Date().toISOString() };
    const res = await callAdminApi(endpoint, method, projectPayload);
    setSaving(false);
    if (res.success) {
      showToast("success", isEdit ? "Project updated!" : "Project created!");
      setEditingProject(null);
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to save project.");
    }
  };

  const deleteProject = async (id: string) => {
    const res = await callAdminApi(`/api/projects/${id}`, "DELETE");
    if (res.success) {
      showToast("success", "Project deleted!");
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to delete project.");
    }
  };

  /* Skills */
  const saveSkillModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const isEdit = Boolean(editingSkill._id || skills.some((skill) => String(skill.id || skill._id) === String(editingSkill.id)));
    const skillId = editingSkill.id || editingSkill._id;
    const endpoint = isEdit ? `/api/skills/${skillId}` : `/api/skills`;
    const method = isEdit ? "PUT" : "POST";

    const res = await callAdminApi(endpoint, method, editingSkill);
    setSaving(false);
    if (res.success) {
      showToast("success", isEdit ? "Skill updated!" : "Skill created!");
      setEditingSkill(null);
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to save skill.");
    }
  };

  const deleteSkill = async (id: string) => {
    const res = await callAdminApi(`/api/skills/${id}`, "DELETE");
    if (res.success) {
      showToast("success", "Skill deleted!");
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to delete skill.");
    }
  };

  const importShowcaseSkills = async () => {
    const missingSkills = SHOWCASE_SKILLS.filter((seedSkill) =>
      !skills.some((skill) => skill.name?.toLowerCase() === seedSkill.name.toLowerCase() && skill.category?.toLowerCase() === seedSkill.category)
    );
    if (!missingSkills.length) {
      showToast("success", "All default showcase skills are already in the database.");
      return;
    }
    setSaving(true);
    const results = await Promise.all(missingSkills.map((skill, index) =>
      callAdminApi("/api/skills", "POST", { ...skill, id: `showcase_${Date.now()}_${index}`, order: skills.length + index + 1 })
    ));
    setSaving(false);
    const failed = results.filter((result) => !result?.success);
    if (failed.length) {
      showToast("error", `Imported ${results.length - failed.length} of ${results.length} missing skills. ${failed[0]?.message || "Please refresh and retry."}`);
    } else {
      showToast("success", `${results.length} showcase skills added to the database.`);
    }
    await loadAllData();
  };

  /* Experiences */
  const saveExperienceModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const isEdit = !!editingExperience._id;
    const endpoint = isEdit ? `/api/experiences/${editingExperience.id}` : `/api/experiences`;
    const method = isEdit ? "PUT" : "POST";

    const res = await callAdminApi(endpoint, method, editingExperience);
    setSaving(false);
    if (res.success) {
      showToast("success", isEdit ? "Experience updated!" : "Experience added!");
      setEditingExperience(null);
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to save experience.");
    }
  };

  const deleteExperience = async (id: string) => {
    const res = await callAdminApi(`/api/experiences/${id}`, "DELETE");
    if (res.success) {
      showToast("success", "Experience deleted!");
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to delete experience.");
    }
  };

  /* Education */
  const saveEducationModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const isEdit = !!editingEducation._id;
    const endpoint = isEdit ? `/api/education/${editingEducation.id}` : `/api/education`;
    const method = isEdit ? "PUT" : "POST";

    const res = await callAdminApi(endpoint, method, editingEducation);
    setSaving(false);
    if (res.success) {
      showToast("success", isEdit ? "Education updated!" : "Education added!");
      setEditingEducation(null);
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to save education.");
    }
  };

  const deleteEducation = async (id: string) => {
    const res = await callAdminApi(`/api/education/${id}`, "DELETE");
    if (res.success) {
      showToast("success", "Education record deleted!");
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to delete education record.");
    }
  };

  /* Services */
  const saveServiceModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const isEdit = !!editingService._id;
    const endpoint = isEdit ? `/api/services/${editingService.id}` : `/api/services`;
    const method = isEdit ? "PUT" : "POST";

    const res = await callAdminApi(endpoint, method, editingService);
    setSaving(false);
    if (res.success) {
      showToast("success", isEdit ? "Service updated!" : "Service created!");
      setEditingService(null);
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to save service.");
    }
  };

  const deleteService = async (id: string) => {
    const res = await callAdminApi(`/api/services/${id}`, "DELETE");
    if (res.success) {
      showToast("success", "Service deleted!");
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to delete service.");
    }
  };

  /* Testimonials */
  const saveTestimonialModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const isEdit = !!editingTestimonial._id;
    const endpoint = isEdit ? `/api/testimonials/${editingTestimonial.id}` : `/api/testimonials`;
    const method = isEdit ? "PUT" : "POST";

    const res = await callAdminApi(endpoint, method, editingTestimonial);
    setSaving(false);
    if (res.success) {
      showToast("success", isEdit ? "Testimonial updated!" : "Testimonial created!");
      setEditingTestimonial(null);
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to save testimonial.");
    }
  };

  const deleteTestimonial = async (id: string) => {
    const res = await callAdminApi(`/api/testimonials/${id}`, "DELETE");
    if (res.success) {
      showToast("success", "Testimonial deleted!");
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to delete testimonial.");
    }
  };

  /* Messages */
  const toggleMessageRead = async (id: string, currentRead: boolean) => {
    const res = await callAdminApi(`/api/messages/${id}/read`, "PATCH", {
      isRead: !currentRead,
    });
    if (res.success) {
      showToast("success", currentRead ? "Marked as unread" : "Marked as read");
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to update message status.");
    }
  };

  const deleteMessage = async (id: string) => {
    const res = await callAdminApi(`/api/messages/${id}`, "DELETE");
    if (res.success) {
      showToast("success", "Message deleted!");
      if (viewingMessage?.id === id) setViewingMessage(null);
      loadAllData();
    } else {
      showToast("error", res.message || "Failed to delete message.");
    }
  };

  /* Sign out */
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  /* Unauthorized / Loading View */
  if (sessionLoading || isAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#08050d] text-white flex flex-col items-center justify-center font-preahvihear">
        <Loader2 size={36} className="animate-spin text-purple-400 mb-4" />
        <p className="text-sm text-gray-400">Verifying administrator credentials with backend...</p>
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-[#08050d] text-white flex flex-col items-center justify-center p-4 sm:p-6 text-center font-preahvihear">
        <div className="h-16 w-16 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400 flex items-center justify-center mb-5">
          <Shield size={32} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-sm text-gray-400 max-w-md mb-6">
          This area is restricted to authorized administrators. Backend role verification confirmed that your account does not have admin permissions.
        </p>
        <div className="flex gap-4">
          <Link
            href="/login?redirect=/dashboard/admin"
            className="rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-purple-500 transition"
          >
            Sign in as Admin
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-semibold text-gray-300 hover:text-white transition"
          >
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen overflow-x-clip bg-[#07040f] text-white font-preahvihear flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-2 border-b border-purple-500/20 bg-[#0a0516]/95 px-3 py-2.5 backdrop-blur-xl sm:px-8 sm:py-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-purple-400/40 bg-purple-950/60 text-purple-300 sm:h-9 sm:w-9">
            <Shield size={18} className="text-purple-400" />
          </span>
          <div className="min-w-0">
            <h1 className="flex items-center gap-1.5 whitespace-nowrap text-xs font-bold text-white sm:gap-2 sm:text-base">
              Fuad Portfolio <span className="rounded-full border border-purple-400/30 bg-purple-950/80 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-purple-400 sm:px-2 sm:text-xs sm:tracking-widest">Admin</span>
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <Link
            href="/"
            target="_blank"
            aria-label="View Live Site"
            title="View Live Site"
            className="inline-flex min-h-9 min-w-9 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2 sm:px-3.5 sm:py-1.5 sm:text-xs text-gray-300 transition hover:border-purple-400/40 hover:text-white"
          >
            <Eye size={14} />
            <span className="hidden sm:inline">View Live Site</span>
            <ExternalLink size={12} />
          </Link>

          <button
            onClick={() => loadAllData()}
            title="Refresh CMS Data"
            className="flex min-h-9 min-w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2 text-gray-300 transition hover:border-purple-400/40 hover:text-white"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={handleSignOut}
            aria-label="Sign Out"
            title="Sign Out"
            className="inline-flex min-h-9 min-w-9 items-center justify-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-2 py-1.5 text-xs text-red-300 transition hover:bg-red-500/20 sm:px-3.5"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Toast Banner */}
      {statusMessage && (
        <div
          className={`fixed bottom-3 left-3 right-3 z-50 flex items-center gap-2.5 rounded-2xl px-4 py-3 text-xs font-semibold shadow-2xl backdrop-blur-xl transition-all sm:bottom-6 sm:left-auto sm:right-6 sm:px-5 sm:py-3.5 ${
            statusMessage.type === "success"
              ? "border border-emerald-500/40 bg-emerald-950/90 text-emerald-200"
              : "border border-red-500/40 bg-red-950/90 text-red-200"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 size={16} className="text-emerald-400" />
          ) : (
            <AlertTriangle size={16} className="text-red-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Layout */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 p-3 sm:gap-6 sm:p-6 md:flex-row">
        {/* Navigation Sidebar */}
        <aside aria-label="Dashboard sections" className="dashboard-nav-scrollbar sticky top-[58px] z-30 -mx-3 flex w-[calc(100%+1.5rem)] shrink-0 snap-x snap-mandatory flex-row gap-1.5 overflow-x-auto border-y border-purple-500/20 bg-[#0d071b]/95 px-3 py-2 backdrop-blur-xl sm:static sm:mx-0 sm:w-full sm:gap-2 sm:rounded-2xl sm:border sm:p-3 md:w-64 md:flex-col md:gap-1 md:overflow-visible md:self-start md:bg-[#0d071b]/80">
          {[
            { id: "overview", label: "Overview", icon: Layers },
            { id: "profile", label: "Hero Profile", icon: User },
            { id: "about", label: "About Section", icon: Info },
            { id: "projects", label: "Projects", icon: Briefcase, count: projects.length },
            { id: "skills", label: "Skills", icon: Wrench, count: skills.length },
            { id: "experience", label: "Experience", icon: Briefcase, count: experiences.length },
            { id: "education", label: "Education", icon: GraduationCap, count: education.length },
            { id: "services", label: "Services", icon: Layers, count: services.length },
            { id: "testimonials", label: "Testimonials", icon: Star, count: testimonials.length },
            { id: "messages", label: "Messages", icon: MessageSquare, badge: unreadMessagesCount },
            { id: "settings", label: "Settings & SEO", icon: SettingsIcon },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex min-h-10 w-auto shrink-0 snap-start items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs font-medium transition md:min-h-0 md:w-full md:px-3.5 md:py-2.5 ${
                  isActive
                    ? "bg-purple-600/30 border border-purple-400/40 text-purple-200"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5 whitespace-nowrap">
                  <Icon size={15} className={isActive ? "text-purple-300" : "text-gray-400"} />
                  <span>{item.label}</span>
                </div>
                {typeof item.count === "number" && (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-300">
                    {item.count}
                  </span>
                )}
                {typeof item.badge === "number" && item.badge > 0 && (
                  <span className="rounded-full bg-fuchsia-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="min-w-0 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-purple-500/20 bg-[#0d071b]/80 p-4 sm:p-6 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white mb-2">Welcome, {profile?.name || "Fuad"}!</h2>
                <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
                  Manage your portfolio dynamically from this dashboard. Content updates are stored directly in MongoDB and synced immediately with the public portfolio.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("projects")}
                  aria-label={`View projects (${projects.length})`}
                  className="rounded-2xl border border-purple-500/20 bg-[#0d071b]/60 p-4 text-left transition hover:border-purple-400/50 hover:bg-[#160d29]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  <p className="text-xs uppercase text-gray-400">Total Projects</p>
                  <p className="text-2xl font-bold text-purple-300 mt-1">{projects.length}</p>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("skills")}
                  aria-label={`View skills (${skills.length})`}
                  className="rounded-2xl border border-purple-500/20 bg-[#0d071b]/60 p-4 text-left transition hover:border-fuchsia-400/50 hover:bg-[#160d29]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
                >
                  <p className="text-xs uppercase text-gray-400">Total Skills</p>
                  <p className="text-2xl font-bold text-fuchsia-300 mt-1">{skills.length}</p>
                </button>
                <div className="rounded-2xl border border-purple-500/20 bg-[#0d071b]/60 p-4">
                  <p className="text-xs uppercase text-gray-400">Total Messages</p>
                  <p className="text-2xl font-bold text-violet-300 mt-1">{messages.length}</p>
                </div>
                <div className="rounded-2xl border border-purple-500/20 bg-[#0d071b]/60 p-4">
                  <p className="text-xs uppercase text-gray-400">Unread Messages</p>
                  <p className="text-2xl font-bold text-red-400 mt-1">{unreadMessagesCount}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl border border-purple-500/20 bg-[#0d071b]/60 p-4 sm:p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-purple-300">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setEditingProject({
                        title: "",
                        category: "Full Stack Web Application",
                        description: "",
                        detailedDescription: "",
                        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
                        image: "",
                        githubUrl: "",
                        backendGithubUrl: "",
                        liveUrl: "",
                        role: "Full Stack Developer",
                        status: "Live Project",
                        features: [],
                        challenges: [],
                        order: nextProjectOrder(),
                      });
                      setActiveTab("projects");
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-600/30 border border-purple-400/40 px-4 py-2.5 text-xs font-semibold text-purple-200 hover:bg-purple-600/40"
                  >
                    <Plus size={15} /> Add New Project
                  </button>

                  <button
                    onClick={() => {
                      setEditingSkill({ name: "", category: "frontend", proficiency: "advanced", description: "" });
                      setActiveTab("skills");
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-gray-300 hover:text-white"
                  >
                    <Plus size={15} /> Add Skill
                  </button>

                  <button
                    onClick={() => setActiveTab("messages")}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-gray-300 hover:text-white"
                  >
                    <MessageSquare size={15} /> View Inbox ({unreadMessagesCount} unread)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === "profile" && profile && (
            <form onSubmit={saveProfile} className="space-y-6">
              <div className="rounded-2xl border border-purple-500/20 bg-[#0d071b]/80 p-4 sm:p-6 space-y-5 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-white">Hero & Profile Information</h2>
                    <p className="text-xs text-gray-400">Configure your hero headlines, intro text, and photo.</p>
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg hover:brightness-110 disabled:opacity-50"
                  >
                    <Save size={14} />
                    <span>{saving ? "Saving..." : "Save Profile"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 rounded-xl border border-purple-500/20 bg-purple-950/20 p-4">
                    <label htmlFor="resume-file" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-purple-300">
                      Upload CV (PDF, DOC or DOCX · up to 3 MB)
                    </label>
                    <input
                      id="resume-file"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        setResumeUploadError("");
                        if (!file) return;
                        const allowed = /\.(pdf|doc|docx)$/i.test(file.name);
                        if (!allowed) { setResumeUploadError("Choose a PDF, DOC or DOCX file."); event.target.value = ""; return; }
                        if (file.size > 3 * 1024 * 1024) { setResumeUploadError("The file must be 3 MB or smaller."); event.target.value = ""; return; }
                        const reader = new FileReader();
                        reader.onload = () => setProfile({ ...profile, resumeUrl: reader.result, resumeDownloadName: file.name });
                        reader.onerror = () => setResumeUploadError("Could not read this file. Please try again.");
                        reader.readAsDataURL(file);
                      }}
                      className="block w-full text-xs text-gray-300 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-600 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-purple-500"
                    />
                    {resumeUploadError && <p role="alert" className="mt-2 text-xs text-red-300">{resumeUploadError}</p>}
                    <p className="mt-2 text-[11px] text-gray-400">Select a file, then click “Save Profile” to publish it.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={profile.name || ""}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                      Welcome Badge
                    </label>
                    <input
                      type="text"
                      value={profile.welcomeBadge || ""}
                      onChange={(e) => setProfile({ ...profile, welcomeBadge: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                    Rotating Headline Titles (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(profile.rotatingTexts) ? profile.rotatingTexts.join(", ") : ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        rotatingTexts: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                    Hero Bio Description
                  </label>
                  <textarea
                    rows={3}
                    value={profile.description || ""}
                    onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                  />
                </div>

                {/* Profile Image with ImageBB Upload */}
                <ImageUploadField
                  label="Profile Picture (ImageBB Hosted)"
                  value={profile.profileImage}
                  token={session?.session?.token}
                  onChange={(url: string) => setProfile({ ...profile, profileImage: url })}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email || ""}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={profile.phone || ""}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                      Resume PDF URL
                    </label>
                    <input
                      type="text"
                      value={profile.resumeUrl || ""}
                      onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                      Resume Download Filename
                    </label>
                    <input
                      type="text"
                      value={profile.resumeDownloadName || ""}
                      onChange={(e) => setProfile({ ...profile, resumeDownloadName: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: ABOUT */}
          {activeTab === "about" && about && (
            <form onSubmit={saveAbout} className="space-y-6">
              <div className="rounded-2xl border border-purple-500/20 bg-[#0d071b]/80 p-4 sm:p-6 space-y-5 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-white">About Section Management</h2>
                    <p className="text-xs text-gray-400">Update about section texts, journey, and strengths.</p>
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg hover:brightness-110 disabled:opacity-50"
                  >
                    <Save size={14} />
                    <span>{saving ? "Saving..." : "Save About"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                      Section Badge
                    </label>
                    <input
                      type="text"
                      value={about.badge || ""}
                      onChange={(e) => setAbout({ ...about, badge: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                      Title Prefix
                    </label>
                    <input
                      type="text"
                      value={about.title || ""}
                      onChange={(e) => setAbout({ ...about, title: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
                    Section Subtitle / Summary
                  </label>
                  <textarea
                    rows={3}
                    value={about.summary || ""}
                    onChange={(e) => setAbout({ ...about, summary: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                  />
                </div>

                {/* Pillars Editor */}
                <div className="pt-4 border-t border-purple-500/20">
                  <h3 className="text-sm font-bold text-white mb-3 text-purple-300">Core Pillars (Journey, Work, Hobbies)</h3>
                  <div className="space-y-4">
                    {about.pillars?.map((pillar: any, pIdx: number) => (
                      <div key={pIdx} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <input
                            type="text"
                            value={pillar.title || ""}
                            onChange={(e) => {
                              const newPillars = [...about.pillars];
                              newPillars[pIdx].title = e.target.value;
                              setAbout({ ...about, pillars: newPillars });
                            }}
                            className="font-bold text-sm text-purple-200 bg-transparent border-b border-white/10 focus:border-purple-400 outline-none pb-1"
                          />
                          <span className="text-xs text-gray-400">Icon: {pillar.icon}</span>
                        </div>
                        <textarea
                          rows={2}
                          value={pillar.description || ""}
                          onChange={(e) => {
                            const newPillars = [...about.pillars];
                            newPillars[pIdx].description = e.target.value;
                            setAbout({ ...about, pillars: newPillars });
                          }}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">Project Case Studies</h2>
                  <p className="text-xs text-gray-400">Manage all full-stack & frontend projects.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingProject({
                      id: `proj_${Date.now()}`,
                      title: "",
                      category: "Full Stack Web Application",
                      description: "",
                      detailedDescription: "",
                      technologies: [],
                      image: "",
                      githubUrl: "",
                      backendGithubUrl: "",
                      liveUrl: "",
                      role: "Full Stack Developer",
                      status: "Live Project",
                      features: [],
                      challenges: [],
                      order: nextProjectOrder(),
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-purple-500"
                >
                  <Plus size={15} /> Add Project
                </button>
              </div>

              {/* Projects List */}
              <div className="grid grid-cols-1 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id || proj._id}
                    className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-purple-500/20 bg-[#0d071b]/80 p-4 sm:flex-row sm:items-center sm:p-5"
                  >
                    <div className="flex min-w-0 w-full items-center gap-3 sm:gap-4">
                      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#120824]">
                        {proj.image ? (
                          <img src={proj.image} alt={proj.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-gray-500">No Image</div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-purple-400">{proj.category}</span>
                        <h3 className="break-words text-sm font-bold text-white sm:text-base">{proj.title}</h3>
                        <p className="text-xs text-gray-400 line-clamp-1">{proj.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link
                        href={`/projects/${proj.id}`}
                        target="_blank"
                        className="rounded-xl border border-white/10 p-2 text-gray-400 hover:text-white"
                        title="View Public Page"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <button
                        onClick={() => setEditingProject({ ...proj })}
                        className="rounded-xl border border-purple-500/30 bg-purple-950/40 p-2 text-purple-300 hover:text-white"
                        title="Edit Project"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-red-400 hover:text-white hover:bg-red-500"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit / Create Project Modal */}
              {editingProject && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:items-center sm:p-4">
                  <div className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-3xl border border-purple-500/30 bg-[#0d071b] p-4 text-white shadow-2xl sm:p-6">
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-5">
                      <h3 className="text-base font-bold text-white">
                        {editingProject._id ? "Edit Project" : "Add New Project"}
                      </h3>
                      <button
                        onClick={() => setEditingProject(null)}
                        className="rounded-full p-1 text-gray-400 hover:text-white"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <form onSubmit={saveProjectModal} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={editingProject.title || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">
                          Project Number (Display Order)
                        </label>
                        <input
                          type="number"
                          min={1}
                          step={1}
                          placeholder="e.g. 1"
                          value={editingProject.order ?? ""}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              order: e.target.value === "" ? "" : Number(e.target.value),
                            })
                          }
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                        <p className="mt-1 text-[11px] text-gray-400">
                          Lower numbers appear first on the portfolio.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Category</label>
                        <input
                          type="text"
                          value={editingProject.category || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Short Description</label>
                        <textarea
                          rows={2}
                          required
                          value={editingProject.description || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Detailed Case Study Description</label>
                        <textarea
                          rows={3}
                          value={editingProject.detailedDescription || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, detailedDescription: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>

                      {/* ImageBB Upload */}
                      <ImageUploadField
                        label="Project Preview Image (ImageBB Hosted)"
                        value={editingProject.image}
                        token={session?.session?.token}
                        onChange={(url: string) => setEditingProject({ ...editingProject, image: url })}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Live Demo URL</label>
                          <input
                            type="text"
                            value={editingProject.liveUrl || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Client GitHub URL</label>
                          <input
                            type="text"
                            value={editingProject.githubUrl || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Backend GitHub URL</label>
                          <input
                            type="text"
                            value={editingProject.backendGithubUrl || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, backendGithubUrl: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">
                          Technologies (Comma-separated)
                        </label>
                        <input
                          type="text"
                          value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(", ") : ""}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                            })
                          }
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-purple-500/20">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="rounded-xl border border-white/10 px-4 py-2 text-xs text-gray-300 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white hover:bg-purple-500 disabled:opacity-50"
                        >
                          {saving ? "Saving..." : "Save Project"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SKILLS */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">Skills & Technologies</h2>
                  <p className="text-xs text-gray-400">Manage technical skills displayed on the portfolio.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingSkill({
                      id: `skill_${Date.now()}`,
                      name: "",
                      category: "frontend",
                      proficiency: "advanced",
                      description: "",
                      order: skills.length + 1,
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-purple-500"
                >
                  <Plus size={15} /> Add Skill
                </button>
              </div>

              {SHOWCASE_SKILLS.some((seedSkill) => !skills.some((skill) => skill.name?.toLowerCase() === seedSkill.name.toLowerCase() && skill.category?.toLowerCase() === seedSkill.category)) && (
                <div className="rounded-xl border border-purple-500/20 bg-purple-950/20 p-4 text-xs text-gray-300">
                  <p>Some of the original showcase skills are not in the database. Add the missing defaults to manage them here.</p>
                  <button type="button" disabled={saving} onClick={importShowcaseSkills} className="mt-3 rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white disabled:opacity-50">
                    {saving ? "Importing..." : "Add missing showcase skills"}
                  </button>
                </div>
              )}

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.id || skill._id}
                    className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-[#0d071b]/80 p-3.5"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{skill.name}</span>
                        <span className="rounded-full bg-purple-950/60 border border-purple-500/20 px-2 py-0.5 text-[10px] text-purple-300">
                          {skill.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">{skill.proficiency}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingSkill({ ...skill })}
                        className="p-1.5 text-purple-300 hover:text-white"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => deleteSkill(skill.id || skill._id)}
                        className="p-1.5 text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill Modal */}
              {editingSkill && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:items-center sm:p-4">
                  <div className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl border border-purple-500/30 bg-[#0d071b] p-4 text-white shadow-2xl sm:p-6 space-y-4">
                    <h3 className="text-base font-bold text-white">
                      {editingSkill._id || skills.some((skill) => String(skill.id || skill._id) === String(editingSkill.id)) ? "Edit Skill" : "Add Skill"}
                    </h3>
                    <form onSubmit={saveSkillModal} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Skill Name</label>
                        <input
                          type="text"
                          required
                          value={editingSkill.name || ""}
                          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Category</label>
                          <select
                            value={editingSkill.category || "frontend"}
                            onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-[#120824] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                          >
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="database">Database</option>
                            <option value="tools">Tools</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Proficiency</label>
                          <select
                            value={editingSkill.proficiency || "intermediate"}
                            onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-[#120824] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                          >
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Icon Name</label>
                          <input type="text" value={editingSkill.icon || "Code"} onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })} placeholder="React, JS, Mongo, Code..." className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Description</label>
                          <input type="text" value={editingSkill.description || ""} onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })} className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setEditingSkill(null)}
                          className="rounded-xl border border-white/10 px-4 py-2 text-xs text-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: EXPERIENCE */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">Experience Timeline</h2>
                  <p className="text-xs text-gray-400">Manage journey and experience items.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingExperience({
                      id: `exp_${Date.now()}`,
                      title: "",
                      description: "",
                      date: "Present",
                      type: "learning",
                      icon: "BookOpen",
                      details: [],
                      tags: [],
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-purple-500"
                >
                  <Plus size={15} /> Add Experience
                </button>
              </div>

              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div
                    key={exp.id || exp._id}
                    className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-[#0d071b]/80 p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-white">{exp.title}</h3>
                        <span className="text-xs text-purple-400">({exp.date})</span>
                      </div>
                      <p className="text-xs text-gray-400">{exp.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditingExperience({ ...exp })} className="p-1.5 text-purple-300">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => deleteExperience(exp.id)} className="p-1.5 text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {editingExperience && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:items-center sm:p-4">
                  <div className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl border border-purple-500/30 bg-[#0d071b] p-4 text-white sm:p-6 space-y-4">
                    <h3 className="text-base font-bold text-white">
                      {editingExperience._id ? "Edit Experience" : "Add Experience"}
                    </h3>
                    <form onSubmit={saveExperienceModal} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={editingExperience.title || ""}
                          onChange={(e) => setEditingExperience({ ...editingExperience, title: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Date Period</label>
                        <input
                          type="text"
                          value={editingExperience.date || ""}
                          onChange={(e) => setEditingExperience({ ...editingExperience, date: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingExperience.description || ""}
                          onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>
                      <div className="flex justify-end gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setEditingExperience(null)}
                          className="rounded-xl border border-white/10 px-4 py-2 text-xs text-gray-300"
                        >
                          Cancel
                        </button>
                        <button type="submit" disabled={saving} className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: EDUCATION */}
          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">Education & Qualifications</h2>
                  <p className="text-xs text-gray-400">Manage academic degrees and bootcamp training.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingEducation({
                      id: `edu_${Date.now()}`,
                      degree: "",
                      institution: "",
                      period: "",
                      type: "Academic Education",
                      grade: "",
                      location: "Bangladesh",
                      description: "",
                      skills: [],
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-purple-500"
                >
                  <Plus size={15} /> Add Education
                </button>
              </div>

              <div className="space-y-3">
                {education.map((edu) => (
                  <div
                    key={edu.id || edu._id}
                    className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-[#0d071b]/80 p-4"
                  >
                    <div>
                      <h3 className="font-bold text-sm text-white">{edu.degree}</h3>
                      <p className="text-xs text-purple-300">{edu.institution} · {edu.period}</p>
                      <p className="text-[11px] text-gray-400">{edu.grade}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditingEducation({ ...edu })} className="p-1.5 text-purple-300">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => deleteEducation(edu.id)} className="p-1.5 text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {editingEducation && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:items-center sm:p-4">
                  <div className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl border border-purple-500/30 bg-[#0d071b] p-4 text-white sm:p-6 space-y-4">
                    <h3 className="text-base font-bold text-white">
                      {editingEducation._id ? "Edit Education" : "Add Education"}
                    </h3>
                    <form onSubmit={saveEducationModal} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Degree / Course</label>
                        <input
                          type="text"
                          required
                          value={editingEducation.degree || ""}
                          onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Institution</label>
                        <input
                          type="text"
                          required
                          value={editingEducation.institution || ""}
                          onChange={(e) => setEditingEducation({ ...editingEducation, institution: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Period</label>
                          <input
                            type="text"
                            value={editingEducation.period || ""}
                            onChange={(e) => setEditingEducation({ ...editingEducation, period: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Grade / Status</label>
                          <input
                            type="text"
                            value={editingEducation.grade || ""}
                            onChange={(e) => setEditingEducation({ ...editingEducation, grade: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setEditingEducation(null)}
                          className="rounded-xl border border-white/10 px-4 py-2 text-xs text-gray-300"
                        >
                          Cancel
                        </button>
                        <button type="submit" disabled={saving} className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 8: SERVICES */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">Services Offered</h2>
                  <p className="text-xs text-gray-400">Manage service cards and capabilities.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingService({
                      id: `srv_${Date.now()}`,
                      title: "",
                      description: "",
                      longDescription: "",
                      icon: "Code",
                      features: [],
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-purple-500"
                >
                  <Plus size={15} /> Add Service
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((srv) => (
                  <div key={srv.id || srv._id} className="rounded-2xl border border-purple-500/20 bg-[#0d071b]/80 p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-bold text-base text-white">{srv.title}</h3>
                      <div className="flex gap-1.5">
                        <button onClick={() => setEditingService({ ...srv })} className="p-1 text-purple-300">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => deleteService(srv.id)} className="p-1 text-red-400">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">{srv.description}</p>
                  </div>
                ))}
              </div>

              {editingService && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:items-center sm:p-4">
                  <div className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl border border-purple-500/30 bg-[#0d071b] p-4 text-white sm:p-6 space-y-4">
                    <h3 className="text-base font-bold text-white">
                      {editingService._id ? "Edit Service" : "Add Service"}
                    </h3>
                    <form onSubmit={saveServiceModal} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={editingService.title || ""}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingService.description || ""}
                          onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>
                      <div className="flex justify-end gap-3 pt-3">
                        <button type="button" onClick={() => setEditingService(null)} className="rounded-xl border border-white/10 px-4 py-2 text-xs text-gray-300">
                          Cancel
                        </button>
                        <button type="submit" disabled={saving} className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 9: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">Testimonials & Reviews</h2>
                  <p className="text-xs text-gray-400">Manage client recommendations and quotes.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingTestimonial({
                      id: `testi_${Date.now()}`,
                      name: "",
                      role: "Client",
                      company: "",
                      avatar: "",
                      text: "",
                      rating: 5,
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-purple-500"
                >
                  <Plus size={15} /> Add Testimonial
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testimonials.map((testi) => (
                  <div key={testi.id || testi._id} className="rounded-2xl border border-purple-500/20 bg-[#0d071b]/80 p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-purple-950 border border-purple-400/30 flex items-center justify-center text-xs text-purple-300">
                          {testi.avatar ? <img src={testi.avatar} alt={testi.name} className="h-full w-full object-cover" /> : testi.name?.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-white">{testi.name}</h3>
                          <p className="text-xs text-purple-300">{testi.role} {testi.company && `at ${testi.company}`}</p>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => setEditingTestimonial({ ...testi })} className="p-1 text-purple-300">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => deleteTestimonial(testi.id)} className="p-1 text-red-400">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 italic">&ldquo;{testi.text}&rdquo;</p>
                  </div>
                ))}
              </div>

              {editingTestimonial && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:items-center sm:p-4">
                  <div className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl border border-purple-500/30 bg-[#0d071b] p-4 text-white sm:p-6 space-y-4">
                    <h3 className="text-base font-bold text-white">
                      {editingTestimonial._id ? "Edit Testimonial" : "Add Testimonial"}
                    </h3>
                    <form onSubmit={saveTestimonialModal} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Author Name</label>
                        <input
                          type="text"
                          required
                          value={editingTestimonial.name || ""}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Role / Title</label>
                          <input
                            type="text"
                            value={editingTestimonial.role || ""}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Company</label>
                          <input
                            type="text"
                            value={editingTestimonial.company || ""}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white outline-none focus:border-purple-400"
                          />
                        </div>
                      </div>
                      {/* ImageBB Avatar Upload */}
                      <ImageUploadField
                        label="Avatar (ImageBB Hosted)"
                        value={editingTestimonial.avatar}
                        token={session?.session?.token}
                        onChange={(url: string) => setEditingTestimonial({ ...editingTestimonial, avatar: url })}
                      />
                      <div>
                        <label className="block text-xs font-semibold uppercase text-purple-300 mb-1">Testimonial Quote</label>
                        <textarea
                          rows={3}
                          required
                          value={editingTestimonial.text || ""}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                        />
                      </div>
                      <div className="flex justify-end gap-3 pt-3">
                        <button type="button" onClick={() => setEditingTestimonial(null)} className="rounded-xl border border-white/10 px-4 py-2 text-xs text-gray-300">
                          Cancel
                        </button>
                        <button type="submit" disabled={saving} className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 10: MESSAGES (CONTACT INBOX) */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">Contact Messages Inbox</h2>
                  <p className="text-xs text-gray-400">View and manage messages sent from your portfolio contact form.</p>
                </div>
                <span className="rounded-full bg-purple-950 border border-purple-500/30 px-3 py-1 text-xs text-purple-300">
                  {messages.length} Total ({unreadMessagesCount} unread)
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="rounded-2xl border border-purple-500/20 bg-[#0d071b]/60 p-12 text-center text-gray-400 text-xs">
                  No contact messages received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id || msg._id}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border p-4 transition ${
                        !msg.isRead
                          ? "border-purple-500/50 bg-purple-950/20"
                          : "border-white/10 bg-[#0d071b]/60"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                            !msg.isRead ? "bg-fuchsia-400 animate-pulse" : "bg-slate-600"
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-white">{msg.name}</h3>
                            <span className="text-xs text-purple-300">({msg.email})</span>
                          </div>
                          <p className="text-xs font-medium text-gray-200 mt-0.5">{msg.subject}</p>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{msg.message}</p>
                          <span className="text-[10px] text-gray-500 mt-1 block">
                            {new Date(msg.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            setViewingMessage(msg);
                            if (!msg.isRead) toggleMessageRead(msg.id, false);
                          }}
                          className="rounded-xl border border-purple-500/30 bg-purple-950/40 px-3 py-1.5 text-xs text-purple-200 hover:bg-purple-600/30"
                        >
                          Read
                        </button>
                        <button
                          onClick={() => toggleMessageRead(msg.id, msg.isRead)}
                          className="rounded-xl border border-white/10 p-1.5 text-gray-400 hover:text-white"
                          title={msg.isRead ? "Mark as unread" : "Mark as read"}
                        >
                          <Check size={14} className={msg.isRead ? "text-emerald-400" : ""} />
                        </button>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="rounded-xl border border-red-500/30 p-1.5 text-red-400 hover:bg-red-500 hover:text-white"
                          title="Delete message"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* View Message Modal */}
              {viewingMessage && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:items-center sm:p-4">
                  <div className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-purple-500/30 bg-[#0d071b] p-4 text-white sm:p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-purple-400">Message Details</span>
                        <h3 className="text-base font-bold text-white">{viewingMessage.subject}</h3>
                      </div>
                      <button onClick={() => setViewingMessage(null)} className="p-1 text-gray-400 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <p><span className="text-purple-300 font-semibold">From:</span> {viewingMessage.name} &lt;{viewingMessage.email}&gt;</p>
                      <p><span className="text-purple-300 font-semibold">Date:</span> {new Date(viewingMessage.createdAt).toLocaleString()}</p>
                      {viewingMessage.ip && (
                        <p><span className="text-purple-300 font-semibold">IP:</span> {viewingMessage.ip}</p>
                      )}
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-xs leading-relaxed text-gray-200 whitespace-pre-wrap">
                      {viewingMessage.message}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-purple-500/20">
                      <a
                        href={`mailto:${viewingMessage.email}?subject=Re: ${encodeURIComponent(viewingMessage.subject)}`}
                        className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-500 flex items-center gap-1.5"
                      >
                        <Mail size={14} /> Reply via Email
                      </a>
                      <button
                        onClick={() => deleteMessage(viewingMessage.id)}
                        className="rounded-xl border border-red-500/30 px-4 py-2 text-xs text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        Delete Message
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 11: SETTINGS, SEO & SOCIALS */}
          {activeTab === "settings" && settings && (
            <form onSubmit={saveSettings} className="space-y-6">
              <div className="rounded-2xl border border-purple-500/20 bg-[#0d071b]/80 p-4 sm:p-6 space-y-5 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-white">Website Settings & SEO</h2>
                    <p className="text-xs text-gray-400">Configure global metadata, OpenGraph, and social channels.</p>
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg hover:brightness-110 disabled:opacity-50"
                  >
                    <Save size={14} />
                    <span>{saving ? "Saving..." : "Save Settings"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-purple-300 mb-1.5">Site Title</label>
                    <input
                      type="text"
                      value={settings.siteTitle || ""}
                      onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-purple-300 mb-1.5">Author</label>
                    <input
                      type="text"
                      value={settings.author || ""}
                      onChange={(e) => setSettings({ ...settings, author: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-purple-300 mb-1.5">Site Meta Description</label>
                  <textarea
                    rows={2}
                    value={settings.siteDescription || ""}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-purple-300 mb-1.5">SEO Keywords (Comma-separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(settings.keywords) ? settings.keywords.join(", ") : ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        keywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400"
                  />
                </div>

                {/* OpenGraph Image with ImageBB Upload */}
                <ImageUploadField
                  label="OpenGraph Social Banner (ImageBB Hosted)"
                  value={settings.ogImage}
                  token={session?.session?.token}
                  onChange={(url: string) => setSettings({ ...settings, ogImage: url })}
                />

                {/* Social Links */}
                <div className="pt-4 border-t border-purple-500/20 space-y-4">
                  <h3 className="text-sm font-bold text-purple-300">Social Media & Contact Channels</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-gray-300 mb-1">GitHub URL</label>
                      <input
                        type="text"
                        value={settings.socials?.github || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            socials: { ...settings.socials, github: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-gray-300 mb-1">LinkedIn URL</label>
                      <input
                        type="text"
                        value={settings.socials?.linkedin || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            socials: { ...settings.socials, linkedin: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-gray-300 mb-1">WhatsApp Link</label>
                      <input
                        type="text"
                        value={settings.socials?.whatsapp || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            socials: { ...settings.socials, whatsapp: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-gray-300 mb-1">Facebook URL</label>
                      <input
                        type="text"
                        value={settings.socials?.facebook || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            socials: { ...settings.socials, facebook: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
