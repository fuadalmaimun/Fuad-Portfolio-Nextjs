"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SITE, SOCIALS } from "../data/site";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
  // Honeypot — hidden from real visitors, tempting for bots.
  company: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD_LIMITS = {
  name: { min: 2, max: 80 },
  subject: { max: 120 },
  message: { min: 10, max: 2000 },
};

/** Validates a single field and returns an empty string when valid. */
function validateField(field, rawValue) {
  const value = String(rawValue ?? "").trim();

  switch (field) {
    case "name":
      if (!value) return "Please enter your name.";
      if (value.length < FIELD_LIMITS.name.min)
        return `Name must be at least ${FIELD_LIMITS.name.min} characters.`;
      if (value.length > FIELD_LIMITS.name.max)
        return `Name must be under ${FIELD_LIMITS.name.max} characters.`;
      return "";

    case "email":
      if (!value) return "Please enter your email address.";
      if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address.";
      return "";

    case "subject":
      if (value.length > FIELD_LIMITS.subject.max)
        return `Subject must be under ${FIELD_LIMITS.subject.max} characters.`;
      return "";

    case "message":
      if (!value) return "Please write a message.";
      if (value.length < FIELD_LIMITS.message.min)
        return `Message must be at least ${FIELD_LIMITS.message.min} characters.`;
      if (value.length > FIELD_LIMITS.message.max)
        return `Message must be under ${FIELD_LIMITS.message.max} characters.`;
      return "";

    default:
      return "";
  }
}

const CHANNELS = [
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: Mail,
  },
  {
    label: "WhatsApp",
    value: SITE.phone,
    href: SOCIALS.whatsapp,
    icon: FaWhatsapp,
  },
  {
    label: "LinkedIn",
    value: "Connect with Fuad",
    href: SOCIALS.linkedin,
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    value: "View my repositories",
    href: SOCIALS.github,
    icon: FaGithub,
  },
];

const inputClass = (hasError) =>
  `contact-field${hasError ? " has-error" : ""}`;

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const isSubmitting = status.type === "loading";

  /** Live re-validation while typing, but only for fields already in error. */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }

    if (status.type === "error" || status.type === "success") {
      setStatus({ type: "idle", message: "" });
    }
  };

  /** Validate on blur so users get feedback before they submit. */
  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    // Validate everything up front and focus the first invalid field.
    const nextErrors = {};
    for (const field of ["name", "email", "subject", "message"]) {
      const message = validateField(field, form[field]);
      if (message) nextErrors[field] = message;
    }

    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      event.currentTarget.elements[firstInvalid]?.focus();
      return;
    }

    setStatus({ type: "loading", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (data.ok) {
        setStatus({
          type: "success",
          message:
            "Thanks! Your message has been sent — I'll get back to you within 24 hours.",
        });
        setForm(INITIAL_FORM);
        setErrors({});
        return;
      }

      // Email service not configured yet: degrade gracefully by opening the
      // visitor's mail app with the message pre-filled.
      if (data.code === "NOT_CONFIGURED") {
        const subject =
          form.subject.trim() || `Portfolio enquiry from ${form.name.trim()}`;
        const body = `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`;

        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;

        setStatus({
          type: "info",
          message:
            "Email delivery isn't configured on this site yet — your mail app should open with the message pre-filled.",
        });
        return;
      }

      if (data.code === "VALIDATION" && data.errors) {
        setErrors((prev) => ({ ...prev, ...data.errors }));
        setStatus({
          type: "error",
          message: "Some fields need attention.",
        });
        return;
      }

      if (data.code === "RATE_LIMITED") {
        setStatus({
          type: "error",
          message:
            "Too many messages in a short time — please wait a minute and try again.",
        });
        return;
      }

      setStatus({
        type: "error",
        message:
          data.message ||
          "Something went wrong sending your message. Please try again or email me directly.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "Network error — please check your connection and try again.",
      });
    }
  };

  const statusStyles = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    error: "border-red-500/30 bg-red-500/10 text-red-300",
    info: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  };

  const StatusIcon = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Mail,
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-[#05020D] py-24 font-preahvihear"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[20%] h-[460px] w-[460px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute right-[-10%] bottom-[15%] h-[460px] w-[460px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
      </div>

      <div className="container-safe relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1.5 text-xs tracking-[0.25em] text-purple-300 uppercase backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
              Work Together
            </span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
            Have a project in mind, a role to fill, or just want to say hi?
            Drop a message below — I usually reply within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* Left Column: Direct Channels */}
          <div className="flex flex-col gap-3.5">
            {CHANNELS.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-purple-500/20 bg-[#0d071b]/70 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-400/50 hover:bg-[#120824] sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-900/30 text-purple-300 transition-all duration-300 group-hover:border-purple-400/60 group-hover:bg-purple-600/30 group-hover:text-white">
                  <Icon size={19} />
                </span>

                <span className="min-w-0">
                  <span className="block text-xs font-semibold tracking-wider text-purple-400 uppercase">
                    {label}
                  </span>
                  <span className="block truncate text-sm text-slate-300 transition-colors group-hover:text-white">
                    {value}
                  </span>
                </span>
              </a>
            ))}

            {/* Availability */}
            <div className="flex flex-col gap-3 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/40 to-[#0d071b]/70 p-4 backdrop-blur-md sm:p-5">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Clock size={16} className="shrink-0 text-purple-400" />
                <span>
                  Response time:{" "}
                  <span className="font-semibold text-white">
                    usually within 24 hours
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <MapPin size={16} className="shrink-0 text-purple-400" />
                <span>
                  Bangladesh ·{" "}
                  <span className="font-semibold text-white">
                    open to remote roles
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl border border-purple-500/20 bg-[#0d071b]/80 p-5 shadow-2xl shadow-purple-950/40 backdrop-blur-xl sm:p-7"
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-xs font-medium text-slate-400"
                >
                  Name <span className="text-purple-400">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={inputClass(Boolean(errors.name))}
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                  >
                    <AlertCircle size={12} className="shrink-0" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-xs font-medium text-slate-400"
                >
                  Email <span className="text-purple-400">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={inputClass(Boolean(errors.email))}
                />
                {errors.email && (
                  <p
                    id="contact-email-error"
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                  >
                    <AlertCircle size={12} className="shrink-0" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="mt-5">
              <label
                htmlFor="contact-subject"
                className="mb-1.5 block text-xs font-medium text-slate-400"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Project enquiry, job opportunity, ..."
                value={form.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                className={inputClass(Boolean(errors.subject))}
              />
              {errors.subject && (
                <p
                  id="contact-subject-error"
                  className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                >
                  <AlertCircle size={12} className="shrink-0" />
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="mt-5">
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-xs font-medium text-slate-400"
              >
                Message <span className="text-purple-400">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me a little about your project, timeline, and how I can help..."
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${inputClass(Boolean(errors.message))} resize-y`}
              />
              <div className="mt-1.5 flex items-start justify-between gap-3">
                {errors.message ? (
                  <p
                    id="contact-message-error"
                    className="flex items-center gap-1.5 text-xs text-red-400"
                  >
                    <AlertCircle size={12} className="shrink-0" />
                    {errors.message}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  className={`text-[11px] tabular-nums ${
                    form.message.length > FIELD_LIMITS.message.max
                      ? "text-red-400"
                      : "text-slate-600"
                  }`}
                >
                  {form.message.length}/{FIELD_LIMITS.message.max}
                </span>
              </div>
            </div>

            {/* Honeypot (hidden from humans) */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            {/* Live Status Feedback */}
            {(status.type === "success" ||
              status.type === "error" ||
              status.type === "info") && (
              <div
                role={status.type === "error" ? "alert" : "status"}
                className={`animate-fade-in mt-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${statusStyles[status.type]}`}
              >
                {React.createElement(StatusIcon[status.type], {
                  size: 16,
                  className: "mt-0.5 shrink-0",
                })}
                <span>{status.message}</span>
              </div>
            )}

            {/* Submit */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-purple-600/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:brightness-100 sm:w-auto sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500 sm:text-right">
                Your details stay private — never shared or sold.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
