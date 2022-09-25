import { useState } from 'react'
import { VStack, Button, Flex, HStack, Text, Divider, Heading,
    Tag, TagLabel, TagLeftIcon, Wrap
} from '@chakra-ui/react'
import { MdCircle } from 'react-icons/md'
import { useWebsite } from '@/providers/WebsiteProvider'
import Question from '@/components/Question'
import General from './General'
import Domain from './Domain'
import Advanced from './Advanced'
import Design from './Design'
import { websiteSettingsArr } from '@/utils/json'

const Settings = () => {
    const { editingWebsite } = useWebsite();
    const [currentSettingsIdx, setCurrentSettingsIdx] = useState(0);

    return (
        <Flex flexDir='column' mt='1em' p='1em'>
            <HStack alignItems='center' w='full'>
                <Text fontSize='10pt'>
                    Website Settings
                </Text>
                <Divider flex='1' />
            </HStack>
            <HStack mt='1em' alignItems='center' spacing='1em'>
                <Heading as='h2' fontSize='2em' fontWeight='500'>
                    {editingWebsite?.components?.title}
                </Heading>
                <Wrap spacing='1em' mt='1em' overflow='visible'>
                    <Question prompt={editingWebsite?.isPremium ? 'This minting website is subscribed to the premium plan.' : 'This minting website is subscribed to the free plan called Hobby.'}>
                        <Tag alignItems='center' size='sm'>
                            <TagLeftIcon color={editingWebsite?.isPremium ? 'rgb(255,167,1)' : 'gray.500'}>
                                <MdCircle fontSize='16pt' />
                            </TagLeftIcon>
                            <TagLabel fontSize='10pt'>
                                {editingWebsite?.isPremium ? 'Premium' : 'Hobby'}
                            </TagLabel>
                        </Tag>
                    </Question>
                    <Question prompt={editingWebsite?.isPublished ? 'This website is viewable to your minters.' : 'This website is NOT viewable to your minters. Go to Advanced tab to publish.'}>
                        <Tag alignItems='center' size='sm'>
                            <TagLeftIcon color={editingWebsite?.isPublished ? 'green.500' : 'gray.500'}>
                                <MdCircle fontSize='16pt' />
                            </TagLeftIcon>
                            <TagLabel fontSize='10pt'>
                                {editingWebsite?.isPublished ? 'Published' : 'Not Published'}
                            </TagLabel>
                        </Tag>
                    </Question>
                </Wrap>
            </HStack>
            <HStack>
                <Flex flexDir='column' mt='1em'>
                    <Question prompt='Current design template of your website. Go to Templates tab to change.'>
                        <Text fontSize='10pt' variant='subtle'>
                            CURRENT TEMPLATE
                        </Text>
                    </Question>
                    <Text fontSize='10pt'>
                        {editingWebsite?.components?.template}
                    </Text>
                </Flex>
            </HStack>
            <Flex mt='3em' gap='2em'>
                <VStack alignItems='flex-start' flex='1' maxW='255px' mt='1em'>
                    {websiteSettingsArr?.map((setting, idx) => (
                        <Button 
                            key={idx} 
                            bg='transparent' 
                            w='full' 
                            justifyContent='flex-start' 
                            fontSize='10pt'
                            onClick={() => setCurrentSettingsIdx(idx)}
                            color={idx === currentSettingsIdx ? 'rgb(52,140,212)' : 'white'}
                            _hover={{
                                color: 'rgb(52,140,212)',
                                bg: 'transparent'
                            }}
                            _focus={{
                                bg: 'transparent'
                            }}
                        >
                            {setting.name}
                        </Button>
                    ))}
                </VStack>
                <Flex flexDir='column' flex='1'>
                    <Text fontSize='16pt'>
                        {websiteSettingsArr[currentSettingsIdx]?.name}
                    </Text>
                    {{
                        general: <General />,
                        design: <Design />,
                        domain: <Domain />,
                        advanced: <Advanced />
                    }[websiteSettingsArr[currentSettingsIdx]?.name?.toLowerCase()]}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Settings