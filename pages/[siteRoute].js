import NextLink from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Text, Flex, Button, VStack, SlideFade, Link, useColorModeValue, 
    Wrap, Image, Tag, HStack, useColorMode, Center, Spinner
} from '@chakra-ui/react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useMediaQuery } from 'react-responsive'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWebsiteControls } from '@/hooks/services/website/useWebsiteControls'
import { usePaymentControls } from '@/hooks/usePaymentControls'
import Template1 from '@/components/services/Website/SiteTemplates/Template1'
import Template2 from '@/components/services/Website/SiteTemplates/Template2'
import Template3 from '@/components/services/Website/SiteTemplates/Template3'
import posthog from 'posthog-js'

import config from '@/config/index'

const UserWebsite = () => {
    const router = useRouter();
    const { userWebsite } = useWebsite();
    const { 
        getWebsiteByRoute, 
        userWebsiteErrors,
        checkSubscription
    } = useWebsiteControls();
    const siteRoute = router.query.siteRoute;

    useEffect(() => {
        if (!siteRoute) return;
        getWebsiteByRoute(siteRoute);
    }, [siteRoute])

    useEffect(() => {
        if (!userWebsite) return;
        checkSubscription();
    }, [userWebsite])

    const { colorMode } = useColorMode();

    return (
        <>
            {userWebsite ? (
                <div>
                    <Head>
                        <title>{userWebsite?.components?.title}</title>
                        <link rel="shortcut icon" type="image/png" href={userWebsite?.meta?.favicon} />
                        <meta name="title" content={userWebsite?.components?.title} />
                        <meta name="description" content={userWebsite?.components?.description} />
                        <meta name="keywords" content={`nfthost, ${userWebsite?.components?.title}`} />
                        <meta name="robots" content={userWebsite?.meta?.robot} />
                        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                        <meta name="language" content={userWebsite?.meta?.language} />

                        <meta property="og:type" content='website' />
                        <meta property="og:url" content={`https://${siteRoute}.${config.frontendUrl}`} />
                        <meta property="og:title" content='NFT Host' />
                        <meta property="og:description" content={userWebsite?.components?.description} />
                        <meta property="og:image" content={userWebsite?.components?.unrevealedImage} />

                        <meta property="twitter:card" content="summary_large_image" />
                        <meta property="twitter:url" content={`https://${siteRoute}.${config.frontendUrl}`} />
                        <meta property="twitter:title" content={userWebsite?.components?.title} />
                        <meta property="twitter:description" content={userWebsite?.components?.description} />
                        <meta property="twitter:image" content={userWebsite?.components?.unrevealedImage} />

                        {userWebsite?.components?.script && parse(userWebsite?.components?.script)}
                    </Head>
                    <main>
                        {{
                            Template1: <Template1 />,
                            Template2: <Template2 />,
                            Template3: <Template3 />
                        }[userWebsite?.components?.template]}
                    </main>
                </div>
            ) : (
                <Center style={{ minHeight: '100vh' }}>
                    {userWebsiteErrors?.length > 0 ? (
                        <VStack spacing='1em'>
                            <NextLink href='/' shallow passHref>
                                <HStack spacing='1em' cursor='pointer'>
                                    <Image src={colorMode === 'dark' ? '/assets/logo_full_white.png' : '/assets/logo_full_black.png'} alt='NFT Host Logo' width='170px' />
                                </HStack>
                            </NextLink>
                            <VStack>
                                {userWebsiteErrors?.map((err, idx) => (
                                    <Text key={idx} fontSize='10pt'>
                                        {err}
                                    </Text>
                                ))}
                            </VStack>
                        </VStack>
                    ) : (
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='rgb(117,63,229)'
                            size='lg'
                        />
                    )}
                </Center>
            )}
        </>
    )
}

export default UserWebsite