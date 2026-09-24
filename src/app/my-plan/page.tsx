"use client";

import Link from "next/link";
import {
  Check,
  Clock3,
  Flame,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPlan(JSON.parse(localStorage.getItem("fitlog-plan") || "[]"));
    setSaved(JSON.parse(localStorage.getItem("fitlog-saved") || "[]"));
    setLoaded(true);
  }, []);

  const updatePlan = (nextPlan: Workout[]) => {
    setPlan(nextPlan);
    localStorage.setItem("fitlog-plan", JSON.stringify(nextPlan));
    window.dispatchEvent(new Event("fitlog-updated"));
  };

  const updateSaved = (nextSaved: Workout[]) => {
    setSaved(nextSaved);
    localStorage.setItem("fitlog-saved", JSON.stringify(nextSaved));
    window.dispatchEvent(new Event("fitlog-updated"));
  };

  const removeWorkout = (id: number) => {
    if (activeTab === "plan") {
      updatePlan(plan.filter((workout) => workout.id !== id));
    } else {
      updateSaved(saved.filter((workout) => workout.id !== id));
    }
  };

  const currentWorkouts = activeTab === "plan" ? plan : saved;

  const sortedWorkouts = useMemo(() => {
    return [...currentWorkouts].sort((a, b) => {
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return a.duration - b.duration;
    });
  }, [currentWorkouts, sortBy]);

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0c0d10] px-6 py-9">
        <section className="mx-auto max-w-[1232px]">
          <h1 className="font-[Oswald] text-[30px] font-bold text-white">
            MY PLAN
          </h1>

          <p className="mt-1 text-xs text-[#9ca3af]">
            Cap of five lifts for today. Finish them, then load more.
          </p>

          {/* Metrics */}
          <div className="mt-6 grid rounded-xl border border-[#222630] bg-[#15171d] sm:grid-cols-3">
            <div className="p-5 sm:border-r sm:border-[#222630]">
              <p className="text-[10px] text-[#9ca3af]">Exercises</p>
              <p className="mt-1 text-2xl font-bold text-[#c2f800]">
                {plan.length}
              </p>
            </div>

            <div className="border-t border-[#222630] p-5 sm:border-t-0 sm:border-r">
              <p className="text-[10px] text-[#9ca3af]">Minutes</p>
              <p className="mt-1 text-2xl font-bold text-white">
                {totalMinutes}
              </p>
            </div>

            <div className="border-t border-[#222630] p-5 sm:border-t-0">
              <p className="text-[10px] text-[#9ca3af]">Calories</p>
              <p className="mt-1 text-2xl font-bold text-white">
                {totalCalories}
              </p>
            </div>
          </div>

          {/* Tabs and sort */}
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-fit rounded-lg border border-[#222630] bg-[#15171d] p-1 text-[10px]">
              <button
                onClick={() => setActiveTab("plan")}
                className={`rounded-md px-4 py-2 transition ${
                  activeTab === "plan"
                    ? "bg-[#222630] font-semibold text-white"
                    : "text-[#9ca3af]"
                }`}
              >
                Today&apos;s Plan
              </button>

              <button
                onClick={() => setActiveTab("saved")}
                className={`rounded-md px-4 py-2 transition ${
                  activeTab === "saved"
                    ? "bg-[#222630] font-semibold text-white"
                    : "text-[#9ca3af]"
                }`}
              >
                Saved
              </button>
            </div>

            <label className="text-[10px] text-[#9ca3af]">
              Sort By
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="ml-2 rounded-md border border-[#222630] bg-[#15171d] px-3 py-2 text-[10px] text-white outline-none"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </label>
          </div>

          {!loaded ? (
            <p className="py-20 text-center text-sm text-[#9ca3af]">
              Loading your plan...
            </p>
          ) : sortedWorkouts.length === 0 ? (
            <div className="mt-5 flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-[#222630] text-center">
              <h2 className="font-[Oswald] text-xl font-bold text-white">
                NOTHING HERE YET
              </h2>

              <p className="mt-1 text-xs text-[#9ca3af]">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/#library"
                className="mt-5 rounded-full bg-[#c2f800] px-5 py-2 text-xs font-bold text-black hover:bg-white"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {sortedWorkouts.map((workout) => (
                <article
                  key={workout.id}
                  className="flex flex-col gap-4 rounded-xl border border-[#222630] bg-[#15171d] p-3 sm:flex-row sm:items-center"
                >
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-20 w-full rounded-lg object-cover sm:w-36"
                  />

                  <div className="min-w-0 flex-1">
                    <h2 className="text-xs font-bold uppercase text-white">
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-[10px] text-[#9ca3af]">
                      {workout.equipment}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-[#9ca3af]">
                      <span className="flex items-center gap-1">
                        <Clock3 size={12} className="text-[#c2f800]" />
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-1">
                        <Flame size={12} className="text-[#c2f800]" />
                        {workout.caloriesBurned} kcal
                      </span>

                      <span className="flex items-center gap-1">
                        <Star size={12} className="text-[#c2f800]" />
                        {workout.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-full border border-[#526071] px-4 py-2 text-[10px] font-medium text-white transition hover:border-[#c2f800]"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" ? (
                      <button
                        onClick={() => removeWorkout(workout.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-[#c2f800] px-4 py-2 text-[10px] font-bold text-black transition hover:bg-white"
                      >
                        <Check size={13} />
                        Mark as Done
                      </button>
                    ) : (
                      <button
                        onClick={() => removeWorkout(workout.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-[#c2f800] px-4 py-2 text-[10px] font-bold text-black transition hover:bg-white"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    )}

                    <button
                      onClick={() => removeWorkout(workout.id)}
                      className="p-2 text-[#9ca3af] transition hover:text-white"
                      aria-label="Remove workout"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}