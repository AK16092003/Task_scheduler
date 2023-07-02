import React , {useState , useEffect} from 'react';
import { MainHeading , AddNewTask , PreviousHistory} from './other_components.js';
import { ChakraProvider } from '@chakra-ui/react'
import { Box, Flex } from "@chakra-ui/react"
import { Progress } from '@chakra-ui/react'
import { CheckCircleIcon,CloseIcon } from '@chakra-ui/icons'
import { Stack } from '@chakra-ui/react'
import { Skeleton} from '@chakra-ui/react'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

export default function App()
{
  const [data , setData] = useState([{}])

  useEffect(() => {
    fetch("/info").then(
      res => res.json()
    ).then(

      data => {
        setData(data)
        console.log(data)
      }
    )

  },  [])

  return (
    
    <ChakraProvider>
      <Box
        bgGradient="linear(to-b , yellow.200 , orange.200)"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
      <MainHeading />
      </Box>

      <Box
         w='100%'
         h='1000px'
         bgGradient='linear(to-b, orange.100, purple.300)'
      >

      <center>

      <TableContainer>
        <Table  size='md' variant='simple'>
          <TableCaption>Task List</TableCaption>
          <Thead>
            <Tr>
              <Th>SNo.</Th>
              <Th>Task Name</Th>
              <Th padding = '0'>Status</Th>
            </Tr>
          </Thead>

                {(typeof data.taskdata  === 'undefined' ) ? (
                  <Tr>
                    <Td>
                      <Stack>
                          <Skeleton height='20px' />
                          <Skeleton height='20px' />
                          <Skeleton height='20px' />
                      </Stack>
                    </Td>
                    <Td>
                      <Stack>
                          <Skeleton height='20px' />
                          <Skeleton height='20px' />
                          <Skeleton height='20px' />
                      </Stack>
                    </Td>
                    <Td>
                      <Stack>
                          <Skeleton height='20px' />
                          <Skeleton height='20px' />
                          <Skeleton height='20px' />
                      </Stack>
                    </Td>
                  </Tr>

                  ):(

                    data.taskdata.map((member , i) => (
                      <Tr>
                        <Td>{member.id}</Td>
                        <Td>{member.name}</Td>

                        { 
                         (member.status == 'true') ?
                         (
                          <CheckCircleIcon  
                            color='green.500' 
                            boxSize='10' 
                            _hover={{
                              color:'green.300' 
                            }}
                          />
                         )
                          :                        
                        (
                          <CloseIcon  color='red.500'  boxSize='10'/>
                        )  
                      }
                      </Tr>
                    ))

                  )
                }

              
        </Table>
      </TableContainer>

        <PreviousHistory />

        <AddNewTask />

      </center>

      </Box>
    </ChakraProvider>
  )
}
