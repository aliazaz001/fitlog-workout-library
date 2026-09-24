"use client";

import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch(() => setWorkouts([]))
      .finally(() => setLoading(false));
  }, []);

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return a.duration - b.duration;
    });
  }, [workouts, sortBy]);

  return (
    <section id="library" className="bg-black px-6 py-14 lg:py-20">
      <div className="mx-auto max-w-[1232px]">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-[Oswald] text-[30px] font-bold leading-[36px] tracking-[-0.75px] text-white">
              THE LIBRARY
            </h2>

            <p className="mt-1 text-xs text-[#9ca3af]">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <label className="text-xs text-[#9ca3af]">
            Sort by{" "}
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="ml-2 rounded border border-[#222630] bg-[#15171d] px-3 py-2 text-xs text-white outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm font-semibold text-[#c2f800]">
            Loading workouts...
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="overflow-hidden rounded-lg border border-[#222630] bg-[#15171d] transition hover:-translate-y-1 hover:border-[#c2f800]"
              >
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups.map((group) => (
                      <span
                        key={group}
                        className="rounded-full bg-[#c2f800] px-2 py-1 text-[9px] font-bold text-black"
                      >
                        {group.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-3 text-sm font-bold uppercase text-white">
                    {workout.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#9ca3af]">
                    {workout.equipment}
                  </p>

                  <div className="mt-4 flex items-center gap-3 text-[11px] text-[#9ca3af]">
                    <span className="flex items-center gap-1">
                      <Clock3 size={14} />
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1">
                      <Flame size={14} />
                      {workout.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1">
                      <Star size={14} />
                      {workout.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}