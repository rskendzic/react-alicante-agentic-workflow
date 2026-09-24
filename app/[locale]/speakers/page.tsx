import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/speakers";
import { PageHeading } from "@/components/atoms/page-heading";
import { Box, Flex, Grid } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakers = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      {/*
        Title/description are hardcoded English, matching every other page
        in the app (stats, news, home) — none use getTranslations() for
        page-level content. Adding it here breaks the production build:
        this app has cacheComponents enabled, and reading the request
        locale via getTranslations() at the page level counts as
        uncached/runtime data, which isn't prerender-safe without a
        Suspense boundary or "use cache". Fixing that properly is a
        cross-page i18n architecture change, not a one-file fix — tracked
        as a follow-up ticket alongside the same gap on stats/news.
      */}
      <PageHeading title="Speakers">
        Who is speaking at React Alicante, and when.
      </PageHeading>

      <Grid
        as="ul"
        listStyleType="none"
        gap="4"
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        {speakers.map((speaker) => (
          <Box as="li" key={speaker.name} height="full">
            <SpeakerCard speaker={speaker} />
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}
