"use client";

import { UserPreferences, LearningStyleOption, DifficultyPreferenceOption } from "@/lib/preferences";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";

interface LearningSettingsProps {
  preferences: UserPreferences;
  onUpdate: (updater: Partial<UserPreferences>) => void;
}

export function LearningSettings({ preferences, onUpdate }: LearningSettingsProps) {
  const learn = preferences.learning;

  const updateLearn = (fields: Partial<typeof learn>) => {
    onUpdate({
      learning: {
        ...learn,
        ...fields,
      },
    });
    toast.success("Learning preferences updated!");
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--foreground)" }}>
          Learning & Resource Preferences
        </h3>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Tailor how technical content, documentation, and mentor tips are delivered.
        </p>
      </div>

      {/* Preferred Style */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
          Preferred Learning Style
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: "handson", label: "Hands-on Building", desc: "Jump straight into code" },
            { id: "docs", label: "Documentation First", desc: "Read official MDN & React docs" },
            { id: "video", label: "Video Tutorials", desc: "Watch visual step-by-step walkthroughs" },
            { id: "visual", label: "Visual Diagrams", desc: "CSS schematics & architecture" },
          ].map((style) => {
            const isSelected = learn.style === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => updateLearn({ style: style.id as LearningStyleOption })}
                className="p-3 rounded-xl text-left transition-all"
                style={{
                  background: isSelected ? "var(--primary-glow)" : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${isSelected ? "var(--primary)" : "var(--border)"}`,
                }}
              >
                <p className="text-xs font-bold" style={{ color: isSelected ? "var(--primary)" : "var(--foreground)" }}>
                  {style.label}
                </p>
                <p className="text-[0.65rem] mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                  {style.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Level */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
          Target Challenge Difficulty
        </label>
        <select
          value={learn.difficulty}
          onChange={(e) => updateLearn({ difficulty: e.target.value as DifficultyPreferenceOption })}
          className="w-full px-3.5 py-2.5 rounded-xl text-sm"
          style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid var(--border)", color: "var(--foreground)" }}
        >
          <option value="beginner">Beginner — Step-by-step guidance</option>
          <option value="intermediate">Intermediate — Balanced real-world projects</option>
          <option value="advanced">Advanced — Production architecture & optimization</option>
        </select>
      </div>

      {/* Toggles */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-white/[0.02]">
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
              Show Mentor Tips Card
            </p>
            <p className="text-[0.68rem]" style={{ color: "var(--muted-foreground)" }}>
              Display advice and gotchas from senior developers.
            </p>
          </div>
          <input
            type="checkbox"
            checked={learn.showTips}
            onChange={(e) => updateLearn({ showTips: e.target.checked })}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer flex-shrink-0"
          />
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-white/[0.02]">
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
              Enable Daily Reflection Prompt Assistant
            </p>
            <p className="text-[0.68rem]" style={{ color: "var(--muted-foreground)" }}>
              Show prompt cards (*&quot;What surprised you most today?&quot;*) on proof submission.
            </p>
          </div>
          <input
            type="checkbox"
            checked={learn.enableReflections}
            onChange={(e) => updateLearn({ enableReflections: e.target.checked })}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
