import type { Session } from "@/types/session";

export interface SpeakerSessions {
  name: string;
  sessions: Session[];
}

/**
 * The closing panel's `speaker` field is a placeholder ("Full speaker
 * lineup"), not an individual person — it must not show up as its own card
 * on the Speakers page.
 */
const NON_SPEAKER_PLACEHOLDERS = new Set(["Full speaker lineup"]);

/**
 * Groups sessions by speaker and sorts speakers alphabetically by name, so
 * the Speakers page lists everyone in a stable, predictable order regardless
 * of the order sessions come back in. Each speaker's own sessions keep the
 * chronological order `fetchSessions()` already returns them in. Sessions
 * whose `speaker` is a placeholder rather than a person (e.g. the closing
 * panel) are excluded.
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (NON_SPEAKER_PLACEHOLDERS.has(session.speaker)) continue;

    const existing = bySpeaker.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      bySpeaker.set(session.speaker, [session]);
    }
  }

  return Array.from(bySpeaker, ([name, speakerSessions]) => ({
    name,
    sessions: speakerSessions,
  })).sort((a, b) => a.name.localeCompare(b.name));
}
