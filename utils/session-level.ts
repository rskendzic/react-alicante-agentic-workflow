import type { Level } from "@/types/session";

/** "beginner" -> "Beginner", for display next to the track badge. */
export function formatSessionLevel(level: Level): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}
