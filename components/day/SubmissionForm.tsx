"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import {
  GitBranch,
  GitCommitHorizontal,
  Link2,
  Send,
  AlertCircle,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { submissionSchema, type SubmissionFormData } from "@/lib/validators";

interface SubmissionFormProps {
  dayId: number;
  onSuccess: (data: SubmissionFormData) => void;
  isAlreadySubmitted?: boolean;
}

// The thoughtful feature: Reflection Prompt Assistant
const REFLECTION_PROMPTS = [
  "What surprised you most while building today?",
  "What would you do differently if you started over?",
  "What's the one thing you want to remember from today?",
  "What concept clicked for you today that was confusing before?",
  "If you had to explain today's topic to a friend, how would you start?",
];

export function SubmissionForm({ dayId, onSuccess, isAlreadySubmitted }: SubmissionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const reflectionRef = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    setValue,
    watch,
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    mode: "onTouched",
  });

  const reflectionValue = watch("reflection") ?? "";
  const charCount = reflectionValue.length;

  const onSubmit = async (data: SubmissionFormData) => {
    if (isAlreadySubmitted) return;
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsLoading(false);
    onSuccess(data);
  };

  const handlePromptClick = (prompt: string) => {
    setValue("reflection", prompt + " ", { shouldDirty: true, shouldTouch: true });
    reflectionRef.current?.focus();
    setShowPrompts(false);
  };

  const rotatePrompt = () => {
    setPromptIndex((i) => (i + 1) % REFLECTION_PROMPTS.length);
  };

  const fields = [
    {
      name: "githubRepo" as const,
      label: "GitHub Repository",
      placeholder: "https://github.com/you/your-repo",
      icon: GitBranch,
      hint: "Link to the repository you worked on today",
      iconColor: "#FAFAFA",
    },
    {
      name: "commitUrl" as const,
      label: "Today's Commit",
      placeholder: "https://github.com/you/repo/commit/abc123",
      icon: GitCommitHorizontal,
      hint: "Direct link to the commit proving you worked today",
      iconColor: "#818cf8",
    },
    {
      name: "linkedinUrl" as const,
      label: "LinkedIn Post",
      placeholder: "https://linkedin.com/posts/yourname_day12...",
      icon: Link2,
      hint: "Your public post about today's work",
      iconColor: "#60a5fa",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: 0.28 }}
      className="px-4 py-2 pb-8"
    >
      <div
        className="card p-5"
        style={{
          background: "linear-gradient(135deg, var(--card) 0%, rgba(79, 70, 229, 0.04) 100%)",
          borderColor: isAlreadySubmitted
            ? "rgba(34, 197, 94, 0.3)"
            : "rgba(79, 70, 229, 0.25)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{
              background: isAlreadySubmitted
                ? "rgba(34, 197, 94, 0.12)"
                : "var(--primary-glow)",
              border: `1px solid ${isAlreadySubmitted ? "rgba(34, 197, 94, 0.3)" : "rgba(79, 70, 229, 0.3)"}`,
            }}
          >
            <Send size={13} style={{ color: isAlreadySubmitted ? "#4ade80" : "#818cf8" }} />
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: isAlreadySubmitted ? "#4ade80" : "#818cf8",
              letterSpacing: "0.1em",
            }}
          >
            {isAlreadySubmitted ? "Submission Received" : "Submit Proof of Work"}
          </span>
        </div>

        {isAlreadySubmitted ? (
          <div
            className="rounded-2xl p-4 text-center"
            style={{
              background: "rgba(34, 197, 94, 0.06)",
              border: "1px solid rgba(34, 197, 94, 0.2)",
            }}
          >
            <p className="text-2xl mb-2">✅</p>
            <p className="text-sm font-semibold" style={{ color: "#86efac" }}>
              You&apos;ve already submitted Day {dayId}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
              Come back tomorrow for the next challenge
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* URL Fields */}
            {fields.map((field) => {
              const Icon = field.icon;
              const hasError = !!errors[field.name];
              const isDirty = !!dirtyFields[field.name];

              return (
                <div key={field.name}>
                  <label
                    htmlFor={`field-${field.name}`}
                    className="flex items-center gap-2 mb-2"
                  >
                    <Icon size={14} style={{ color: field.iconColor }} />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {field.label}
                    </span>
                    <span style={{ color: "var(--danger)" }}>*</span>
                  </label>

                  <div className="relative">
                    <input
                      {...register(field.name)}
                      id={`field-${field.name}`}
                      type="url"
                      placeholder={field.placeholder}
                      autoComplete="url"
                      className={`custom-input${hasError ? " error" : ""}`}
                      aria-invalid={hasError}
                      aria-describedby={hasError ? `${field.name}-error` : `${field.name}-hint`}
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    {hasError ? (
                      <motion.p
                        key="error"
                        id={`${field.name}-error`}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-1.5 mt-1.5 text-xs"
                        style={{ color: "#f87171" }}
                        role="alert"
                      >
                        <AlertCircle size={12} />
                        {errors[field.name]?.message}
                      </motion.p>
                    ) : (
                      <p
                        key="hint"
                        id={`${field.name}-hint`}
                        className="mt-1.5 text-xs"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {field.hint}
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Reflection — with Prompt Assistant */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="reflection-textarea"
                  className="flex items-center gap-2"
                >
                  <Sparkles size={14} style={{ color: "#fbbf24" }} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    Learning Reflection
                  </span>
                  <span style={{ color: "var(--danger)" }}>*</span>
                </label>
                <span
                  className="text-xs"
                  style={{
                    color: charCount < 50 ? "var(--muted-foreground)" : "#4ade80",
                  }}
                >
                  {charCount}/1000
                </span>
              </div>

              {/* Prompt Assistant — thoughtful innovation */}
              <AnimatePresence>
                {!showPrompts && charCount === 0 && (
                  <motion.button
                    key="prompt-trigger"
                    type="button"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setShowPrompts(true)}
                    className="w-full mb-2 rounded-2xl p-3 flex items-center gap-2 text-left"
                    style={{
                      background: "rgba(245, 158, 11, 0.06)",
                      border: "1px dashed rgba(245, 158, 11, 0.35)",
                      cursor: "pointer",
                    }}
                    aria-label="Get a writing prompt for your reflection"
                  >
                    <Sparkles size={14} style={{ color: "#fbbf24" }} />
                    <span className="text-sm" style={{ color: "#fbbf24" }}>
                      Stuck? Get a writing prompt →
                    </span>
                  </motion.button>
                )}

                {showPrompts && (
                  <motion.div
                    key="prompt-panel"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-2 overflow-hidden"
                  >
                    <div
                      className="rounded-2xl p-3"
                      style={{
                        background: "rgba(245, 158, 11, 0.06)",
                        border: "1px solid rgba(245, 158, 11, 0.25)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold" style={{ color: "#fbbf24" }}>
                          ✨ Tap to use a prompt
                        </span>
                        <button
                          type="button"
                          onClick={rotatePrompt}
                          className="flex items-center gap-1 text-xs"
                          style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer" }}
                        >
                          <RefreshCw size={11} />
                          Another
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePromptClick(REFLECTION_PROMPTS[promptIndex])}
                        className="w-full text-left rounded-xl p-3"
                        style={{
                          background: "rgba(245, 158, 11, 0.08)",
                          border: "1px solid rgba(245, 158, 11, 0.2)",
                          cursor: "pointer",
                          color: "var(--foreground)",
                          fontSize: "0.875rem",
                          lineHeight: "1.5",
                          fontFamily: "inherit",
                        }}
                      >
                        {REFLECTION_PROMPTS[promptIndex]}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <textarea
                {...register("reflection")}
                id="reflection-textarea"
                ref={(el) => {
                  register("reflection").ref(el);
                  (reflectionRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
                }}
                placeholder="What did you build today? What did you learn? What broke and how did you fix it?"
                rows={5}
                onFocus={() => charCount === 0 && setShowPrompts(false)}
                className={`custom-input${errors.reflection ? " error" : ""}`}
                style={{ resize: "vertical", minHeight: "120px" }}
                aria-invalid={!!errors.reflection}
                aria-describedby={errors.reflection ? "reflection-error" : "reflection-hint"}
              />

              <AnimatePresence mode="wait">
                {errors.reflection ? (
                  <motion.p
                    key="error"
                    id="reflection-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5 mt-1.5 text-xs"
                    style={{ color: "#f87171" }}
                    role="alert"
                  >
                    <AlertCircle size={12} />
                    {errors.reflection.message}
                  </motion.p>
                ) : (
                  <p
                    key="hint"
                    id="reflection-hint"
                    className="mt-1.5 text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    50 character minimum. Be honest — this is for you, not for show.
                  </p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileTap={!isLoading ? { scale: 0.97 } : {}}
              className="btn btn-primary w-full"
              style={{
                opacity: isLoading ? 0.7 : 1,
                position: "relative",
                overflow: "hidden",
              }}
              id="submit-proof-btn"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white" }}
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Day {dayId}
                </>
              )}
            </motion.button>

            <p className="text-center text-xs" style={{ color: "var(--muted-foreground)" }}>
              Submissions are permanent. Make sure your links are correct.
            </p>
          </form>
        )}
      </div>
    </motion.div>
  );
}
