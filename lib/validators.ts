import { z } from "zod";

export const githubRepoSchema = z
  .string()
  .min(1, "GitHub repository URL is required")
  .url("Must be a valid URL")
  .regex(
    /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/,
    "Must be a valid GitHub repository URL (e.g. https://github.com/user/repo)"
  );

export const githubCommitSchema = z
  .string()
  .min(1, "Commit URL is required")
  .url("Must be a valid URL")
  .regex(
    /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/commit\/[a-f0-9]+\/?$/,
    "Must be a valid GitHub commit URL (e.g. https://github.com/user/repo/commit/abc123)"
  );

export const linkedinSchema = z
  .string()
  .min(1, "LinkedIn post URL is required")
  .url("Must be a valid URL")
  .regex(
    /^https?:\/\/(www\.)?linkedin\.com\/.+/,
    "Must be a valid LinkedIn URL"
  );

export const reflectionSchema = z
  .string()
  .min(50, "Write at least 50 characters — what did you learn today?")
  .max(1000, "Keep it under 1000 characters");

export const submissionSchema = z.object({
  githubRepo: githubRepoSchema,
  commitUrl: githubCommitSchema,
  linkedinUrl: linkedinSchema,
  reflection: reflectionSchema,
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;
