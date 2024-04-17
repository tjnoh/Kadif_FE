// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import { useEffect, useState } from 'react';
import { gParameterAlias } from 'utils/alias';
import { getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';

export default function ModalGlobalSetting(props: { isOpen:any; onClose:any; username:any; }) {
  const { isOpen,onClose,username } = props;
  const [gParameter, setGParameter] = useState<Record<string, string>>({});
  const keys = Object.keys(gParameter);

  useEffect(() => {
    fetchGParameter();
  }, [username]);

  const fetchGParameter = async () => {

    try {
      const response = await fetch(`${backIP}/policy/gp?username=${username}`);
      const data = await response.json();
      setGParameter(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (key: string, value: string) => {
    setGParameter({
      ...gParameter,
      [key]: value,
    });
  };

  return (
    <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={'6xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
			{keys.map((key: any) => {
			return (
			<Flex width={'100%'} mb={'5px'} height={'25px'} key={key}>
				<Box
				width={'25%'}
				height={'25px'}
				lineHeight={'25px'}
				fontWeight={'bold'}
				>
				{gParameterAlias[key]} :{' '}
				</Box>
				<Input
				width={'50%'}
				height={'25px'}
				value={gParameter ? gParameter[key] : ''}
				onChange={(e) => handleChange(key, e.target.value)}
				/>
			</Flex>
			);
			})}
		  </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  );
}
