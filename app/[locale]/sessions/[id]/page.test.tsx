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

  it("calls notFound() when the session doesn't exist", async () => {
    fetchSessionById.mockResolvedValue(null);

    // notFound() throws (it never returns), marked with Next's fallback
    // digest so the framework's error boundary renders the 404 UI instead
    // of this bubbling up as a real crash.
    await expect(
      SessionDetailPage({ params: Promise.resolve({ id: "unknown" }) }),
    ).rejects.toMatchObject({ digest: "NEXT_HTTP_ERROR_FALLBACK;404" });
  });
});
