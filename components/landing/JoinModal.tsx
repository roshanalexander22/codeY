"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flame, Rocket, CheckCircle2 } from "lucide-react";

const joinSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  githubHandle: z
    .string()
    .min(2, "GitHub handle is required")
    .regex(/^[a-zA-Z0-9-]+$/, "Invalid GitHub username format"),
  track: z.enum(["frontend", "fullstack", "ai", "devops"]),
});

type JoinFormData = z.infer<typeof joinSchema>;

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      fullName: "",
      email: "",
      githubHandle: "",
      track: "fullstack",
    },
  });

  const onSubmit = async (data: JoinFormData) => {
    setIsSubmitting(true);
    // Simulate lightweight submit delay
    await new Promise((res) => setTimeout(res, 800));
    setIsSubmitting(false);

    toast.success("Welcome to ABTalks 60-Day Challenge! 🔥", {
      description: `Streak tracking activated for @${data.githubHandle} (${data.track.toUpperCase()} track).`,
      duration: 5000,
    });

    reset();
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Commit to 60 Days"
      description="Enter your details below to activate your streak tracking and join 5,000+ builders."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#FAFAFA] flex items-center justify-between">
            <span>Full Name</span>
            {errors.fullName && (
              <span className="text-[#EF4444] text-[11px]">{errors.fullName.message}</span>
            )}
          </label>
          <Input
            placeholder="e.g. Alex Rivera"
            {...register("fullName")}
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#FAFAFA] flex items-center justify-between">
            <span>Email Address</span>
            {errors.email && (
              <span className="text-[#EF4444] text-[11px]">{errors.email.message}</span>
            )}
          </label>
          <Input
            type="email"
            placeholder="alex@example.com"
            {...register("email")}
          />
        </div>

        {/* GitHub Handle */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#FAFAFA] flex items-center justify-between">
            <span>GitHub Username</span>
            {errors.githubHandle && (
              <span className="text-[#EF4444] text-[11px]">{errors.githubHandle.message}</span>
            )}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-xs text-[#A1A1AA]">github.com/</span>
            <Input
              className="pl-24"
              placeholder="username"
              {...register("githubHandle")}
            />
          </div>
        </div>

        {/* Track Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#FAFAFA]">Select Track</label>
          <select
            {...register("track")}
            className="flex h-12 w-full rounded-[16px] border border-[#27272A] bg-[#18181B] px-4 text-sm text-[#FAFAFA] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40"
          >
            <option value="fullstack">🚀 Fullstack Track (Next.js & Node)</option>
            <option value="frontend">🎨 Frontend Track (React & Tailwind)</option>
            <option value="ai">🤖 AI Engineering Track (LLMs & Python/TS)</option>
            <option value="devops">☁️ DevOps & Cloud Track (Docker & K8s)</option>
          </select>
        </div>

        {/* Commit Agreement notice */}
        <div className="p-3 rounded-[12px] bg-[#09090B] border border-[#27272A] text-xs text-[#A1A1AA] flex items-start gap-2.5">
          <Flame className="h-4 w-4 text-[#F59E0B] shrink-0 mt-0.5" />
          <span>By starting, you commit to publishing daily code commits for 60 consecutive days.</span>
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="lg"
            className="w-full gap-2 text-base h-12"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Activating Streak...
              </span>
            ) : (
              <>
                <Rocket className="h-5 w-5" />
                Start My 60-Day Challenge
              </>
            )}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
