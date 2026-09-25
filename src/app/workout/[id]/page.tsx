import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WorkoutActions from "../../components/WorkoutActions";
import { notFound } from "next/navigation";

type Workout = {
  id: number;
  name: string;
  image: string;
  description?: string;
  muscleGroups: string[];
  equipment: string;
  difficulty?: string;
  sets?: number;
  reps?: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  instructions?: string[];
};

export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    notFound();
  }

  const workout: Workout = await response.json();

  const details = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty || "Intermediate"],
    ["SETS", workout.sets || "4"],
    ["REPS", workout.reps || "6–8"],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.caloriesBurned} kcal`],
    ["RATING", workout.rating],
  ];

  const instructions = workout.instructions || [
    "Set up with a stable position and keep your core engaged.",
    "Use a controlled movement through the full range of motion.",
    "Pause briefly, then return slowly with good form.",
    "Keep shoulders stable and breathe throughout each repetition.",
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0c0d10] px-6 py-10">
        <section className="mx-auto max-w-[1232px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div>
              <img
                src={workout.image}
                alt={workout.name}
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="font-[Oswald] text-[32px] font-bold leading-tight text-white">
                {workout.name.toUpperCase()}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#9ca3af]">
                {workout.description ||
                  "A compound movement that builds strength, control, and confidence with every set."}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {workout.muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="rounded-full bg-[#c2f800] px-3 py-1 text-[10px] font-bold text-black"
                  >
                    {group.toUpperCase()}
                  </span>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-lg border border-[#222630]">
                {details.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-[#222630] px-4 py-3 text-xs last:border-b-0"
                  >
                    <span className="text-[#9ca3af]">{label}</span>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h2 className="font-[Oswald] text-lg font-bold text-white">
                  INSTRUCTIONS
                </h2>

                <ol className="mt-3 list-decimal space-y-2 pl-4 text-xs leading-5 text-[#9ca3af]">
                  {instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>

              <WorkoutActions workout={workout} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}