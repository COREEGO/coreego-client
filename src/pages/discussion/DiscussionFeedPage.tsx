'use client'

import { Box, Divider, Grid, GridItem, Stack } from "@chakra-ui/react";

import TitlePageUx from "../../components/react-ux/TitlePageUx";
import useSWR from "swr";
import DiscussionCard from "../../components/card/DiscussionCard";
import { Suspense } from "react";



const DiscussionList = () => {
    const { data } = useSWR('/discussions', { suspense: true })
    if (data) console.log(data)

    return (
        <Grid templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
        }}
            gap={6}>
            {
                data.map((discussion: any) => {
                    return (
                        <GridItem w='100%' key={discussion.id}>
                            <DiscussionCard
                                discussion={discussion}
                            />
                        </GridItem>
                    )
                })
            }
        </Grid>
    )

}

export default function DiscussionFeed() {

    return (
        <Box>
            <Stack spacing={5}>
                <Stack spacing={5}>
                    <TitlePageUx title="Espace discussion" />
                    <p>Filtre</p>
                </Stack>
                <Divider borderBottomWidth={2} />
                <Suspense fallback={<p>loading</p>}>
                    <DiscussionList />
                </Suspense>
            </Stack>
        </Box>
    )

}