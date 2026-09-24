import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerSessions } from "@/utils/speakers";
import { Flex, Text, VisuallyHidden } from "@chakra-ui/react";

export function SpeakerCard({ speaker }: { speaker: SpeakerSessions }) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle fontSize="md">{speaker.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex as="ul" direction="column" gap="3" listStyleType="none">
          {speaker.sessions.map((session) => (
            <Flex as="li" key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Flex
                  direction="column"
                  paddingY="2"
                  transition="color 0.2s"
                  _hover={{ color: "var(--accent-muted)" }}
                >
                  <VisuallyHidden>{speaker.name}: </VisuallyHidden>
                  <Text fontSize="xs" color="var(--text-secondary)">
                    {session.startTime}
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    {session.title}
                  </Text>
                </Flex>
              </Link>
            </Flex>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
