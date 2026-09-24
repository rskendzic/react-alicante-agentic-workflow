import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerSessions } from "@/utils/speakers";
import { Flex, Text } from "@chakra-ui/react";

export function SpeakerCard({ speaker }: { speaker: SpeakerSessions }) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle fontSize="md">{speaker.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="3">
          {speaker.sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Flex
                direction="column"
                transition="color 0.2s"
                _hover={{ color: "var(--accent-hex)" }}
              >
                <Text fontSize="xs" color="var(--text-muted)">
                  {session.startTime}
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  {session.title}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
