import { SurfaceCard } from "@/components/atoms/surface-card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { formatSessionLevel } from "@/utils/session-level";
import { Box, Text } from "@chakra-ui/react";

interface SessionBlockProps {
  session: Session;
  top: number;
  height: number;
}

export function SessionBlock({ session, top, height }: SessionBlockProps) {
  return (
    <Link href={`/sessions/${session.id}`}>
      <Box
        position="absolute"
        insetX="1"
        top={`${top}px`}
        height={`${height}px`}
      >
        <SurfaceCard>
          <Text fontWeight="medium" color="var(--text-primary)" truncate>
            {session.title}
          </Text>
          {/*
            Level comes before speaker: this line truncates on narrow
            timeline columns, and the level is what the ticket wants
            reliably visible here — the speaker's still on the detail
            page this card links to.
          */}
          <Text color="var(--text-muted)" truncate>
            {session.startTime} · {formatSessionLevel(session.level)} ·{" "}
            {session.speaker}
          </Text>
        </SurfaceCard>
      </Box>
    </Link>
  );
}
