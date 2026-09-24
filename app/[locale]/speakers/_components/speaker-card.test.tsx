import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";
import type { SpeakerSessions } from "@/utils/speakers";

import { SpeakerCard } from "./speaker-card";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "opening-keynote",
    title: "Opening Keynote",
    speaker: "Marta Fernandez",
    track: "React",
    level: "beginner",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

function speaker(overrides: Partial<SpeakerSessions> = {}): SpeakerSessions {
  return {
    name: "Marta Fernandez",
    sessions: [session()],
    ...overrides,
  };
}

describe("SpeakerCard", () => {
  it("shows the speaker's name and each session's title and start time", () => {
    render(
      <SpeakerCard
        speaker={speaker({
          sessions: [
            session({ id: "s1", title: "Talk One", startTime: "09:00" }),
            session({ id: "s2", title: "Talk Two", startTime: "11:15" }),
          ],
        })}
      />,
    );

    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
    expect(screen.getByText("Talk One")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Talk Two")).toBeInTheDocument();
    expect(screen.getByText("11:15")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    render(
      <SpeakerCard
        speaker={speaker({ sessions: [session({ id: "opening-keynote" })] })}
      />,
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });

  it("includes the speaker's name in each session link's accessible name", () => {
    render(
      <SpeakerCard
        speaker={speaker({
          name: "Sofia Almeida",
          sessions: [session({ title: "Micro-Frontends" })],
        })}
      />,
    );

    // Ensures a screen reader user navigating by links list/rotor can tell
    // which speaker a link belongs to, not just jsdom's name computation.
    expect(
      screen.getByRole("link", {
        name: /Sofia Almeida[\s\S]*Micro-Frontends/,
      }),
    ).toBeInTheDocument();
  });
});
