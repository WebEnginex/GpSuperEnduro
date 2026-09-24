"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contactCategories, contactPageLabels } from "@/data/contact";
import type { ContactFormData } from "@/types";
import { EventButton } from "@/components/ui/EventButton";
import { useIsMounted } from "@/hooks/useIsMounted";

const initialForm: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  category: "general",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { form: labels } = contactPageLabels;
  const isMounted = useIsMounted();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error || "Envoi impossible.");
        return;
      }

      setSubmitted(true);
      setForm(initialForm);
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError("Erreur réseau. Réessaie dans un instant.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-background border border-line-strong rounded-sm px-4 py-3 text-foreground placeholder:text-subtle focus:outline-none focus:border-brand-red/50 transition-colors";

  return (
    <motion.form
      initial={isMounted ? { opacity: 0, x: 20 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm text-muted mb-2">
            {labels.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder={labels.namePlaceholder}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-muted mb-2">
            {labels.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={labels.emailPlaceholder}
            className={inputClasses}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm text-muted mb-2">
          {labels.subject}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          placeholder={labels.subjectPlaceholder}
          className={inputClasses}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm text-muted mb-2">
          {labels.category}
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className={inputClasses}
        >
          {contactCategories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-muted mb-2">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder={labels.messagePlaceholder}
          rows={5}
          className={`${inputClasses} resize-none`}
          required
        />
      </div>

      <EventButton
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={loading}
      >
        {loading ? "Envoi…" : labels.submit}
      </EventButton>

      {error ? (
        <p className="text-brand-red text-sm" role="alert">
          {error}
        </p>
      ) : null}

      {submitted && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-700 text-sm"
        >
          {labels.success}
        </motion.p>
      )}
    </motion.form>
  );
}
