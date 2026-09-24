import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

const { fetchSessionById } = vi.hoisted(() => ({
  fetchSessionById: vi.fn(),
}));

vi.mock("@/services/sessions", () => ({
  fetchSessionById,
  fetchSessions: vi.fn(async () => []),
}));

import SessionDetailPage from "./page";

const session: Session = {
  id: "build-your-agentic-workflow",
  title: "Build Your Agentic Workflow",
  speaker: "Evangelia Mitsopoulou",
  track: "Agentic AI",
  level: "intermediate",
  room: "Workshop Room A",
  startTime: "09:45",
  durationMinutes: 180,
  description: "Hands-on workshop.",
};

describe("SessionDetailPage", () => {
  it("shows both the track and the level as badges", async () => {
    fetchSessionById.mockResolvedValue(session);

    render(
      await SessionDetailPage({
        params: Promise.resolve({ id: session.id }),
      }),
    );

    expect(screen.getByText("Agentic AI")).toBeInTheDocument();
    expect(screen.getByText("Intermediate")).toBeInTheDocument();
  });
});
