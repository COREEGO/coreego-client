import { Box, Center, IconButton, Stack, Text } from "@chakra-ui/react";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Slider, Image, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import useSWR from "swr";
import AvatarUx from "../../components/react-ux/AvatarUx";
import LoadingPage from "../../components/LoadingPage";
import UserInfo from "../../components/card/_UserInfo";
import Category from "../../components/card/_Category";
import LikeButton from "../../components/buttons/LikeButton";
import CommentModule from "../components/modules/CommentModule";



const Detail: React.FC<any> = () => {

    const params = useParams()
    const { data, error, mutate } = useSWR('/discussions/' + params.id, { suspense: true })

    const BASE_URL = process.env.REACT_APP_BASE_URL;


    return (
        <Stack>
            <Box bg="white" p={3}>
                <Stack>
                    <UserInfo user={data.user} date={data.createdAt} />
                    <Category category={data.category} />
                    <Text as="h1" fontSize="large" fontWeight="bold" color="var(--coreego-blue)" > {data.title} </Text>
                    <Text as="p" whiteSpace="pre-line">{data.content}</Text>
                    {data.images.length &&
                        <Stack direction="row" flexWrap="wrap" justifyContent="center">
                            {
                                data.images.map((image: any) => {
                                    return (
                                        <Image key={image.id} maxH={300} w={300} maxW="100%" src={BASE_URL + image.filePath} />
                                    )
                                })
                            }
                        </Stack>
                    }
                </Stack>
            </Box>
            <Box bg="white" p={3}>
                <LikeButton discussionId={data.id} likes={data.likes} mutate={() => mutate()} />
            </Box>
            <CommentModule mutate={() => mutate()} discussionId={params.id} comments={data.comments} />
        </Stack>
    )
}

const DiscussionDetail = () => {

    return (
        <Suspense fallback={<LoadingPage type="page" />}>
            <Detail />
        </Suspense>
    )

}

export default DiscussionDetail