import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./speakers";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    level: "beginner",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups a speaker's sessions together and sorts speakers alphabetically", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Sofia Almeida", title: "Talk 1" }),
      session({ id: "s2", speaker: "Diego Castellanos", title: "Talk 2" }),
      session({ id: "s3", speaker: "Sofia Almeida", title: "Talk 3" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual([
      "Diego Castellanos",
      "Sofia Almeida",
    ]);
    expect(speakers[1].sessions.map((s) => s.title)).toEqual([
      "Talk 1",
      "Talk 3",
    ]);
  });

  it("excludes the closing panel's placeholder speaker", () => {
    const speakers = groupSessionsBySpeaker([
      session({ speaker: "Full speaker lineup" }),
    ]);

    expect(speakers).toEqual([]);
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
