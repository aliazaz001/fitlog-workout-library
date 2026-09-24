"use client";

import { Bookmark, ClipboardPlus } from "lucide-react";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const addToPlan = () => {
    const plan = JSON.parse(localStorage.getItem("fitlog-plan") || "[]");

    if (plan.some((item: Workout) => item.id === workout.id)) {
      alert("This workout is already in your plan.");
      return;
    }

    localStorage.setItem("fitlog-plan", JSON.stringify([...plan, workout]));
    alert("Workout added to your plan!");
  };

  const saveWorkout = () => {
    const saved = JSON.parse(localStorage.getItem("fitlog-saved") || "[]");

    if (saved.some((item: Workout) => item.id === workout.id)) {
      alert("Workout is already saved.");
      return;
    }

    localStorage.setItem("fitlog-saved", JSON.stringify([...saved, workout]));
    alert("Workout saved!");
  };

  return (
    <div className="mt-7 flex flex-wrap items-center gap-3">
      <button
        onClick={addToPlan}
        className="inline-flex h-9 items-center gap-2 rounded-md bg-[#c2f800] px-4 text-[11px] font-semibold text-black transition hover:bg-white"
      >
        <ClipboardPlus size={14} strokeWidth={2} />
        Add to today&apos;s plan
      </button>

      <button
        onClick={saveWorkout}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-[#222630] bg-[#15171d] px-4 text-[11px] font-medium text-white transition hover:border-[#c2f800]"
      >
        <Bookmark size={14} strokeWidth={2} />
        Save for later
      </button>
    </div>
  );
}