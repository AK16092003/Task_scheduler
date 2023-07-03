import React , {useState , useEffect} from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { Box, Flex } from "@chakra-ui/react"
import { CheckCircleIcon} from '@chakra-ui/icons'
import { Stack } from '@chakra-ui/react'
import { Skeleton} from '@chakra-ui/react'
import { Text } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { Select } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react"
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

import { useBetween } from 'use-between';

const useShareableState = () => {
  
  const [data , setData] = useState([{}])
  return {
    data,
    setData
  }
}

export default function App()
{
  const {data , setData} = useBetween(useShareableState)

  function deletetask(task_id)
  {
    // delete task id 
    fetch("/delete_task", {
      method: 'POST',
      body: JSON.stringify({
        "taskid" : task_id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
        
        // update tasks
        fetch("/info").then(
          res => res.json()
        ).then(
          data => {
            setData(data)
            console.log(data)
          }
        )
      }
    ).catch((err) => {
      console.log(err.message);
   });

    
  }

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
         h='700px'
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
              <Th>Priority</Th>
              <Th padding = '0'>Check Here</Th>
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
                      (member.priority =='High')?(
                        <Tr backgroundColor = 'red.200'>
                          <Td>{i+1}</Td>
                          <Td>{member.name}</Td>
                          <Td>{member.priority}</Td>
                          <Td>
                          { 
                            <CheckCircleIcon  
                              color='green.500' 
                              boxSize='10' 
                              _hover={{
                                color:'green.300' 
                              }}
                              value = {member.id}
                              onClick= {() => deletetask(member.id)}
                            />
                          }
                          </Td>
                        </Tr>
  
                        ):(
                            (member.priority =='Medium')?(
                                  <Tr backgroundColor = 'orange.200'>
            
            
                                    <Td>{i+1}</Td>
                                    <Td>{member.name}</Td>
                                    <Td>{member.priority}</Td>
                                    <Td>
                                    { 
                                      <CheckCircleIcon  
                                        color='green.500' 
                                        boxSize='10' 
                                        _hover={{
                                          color:'green.300' 
                                        }}
                                        value = {member.id}
                                        onClick= {() => deletetask(member.id)}
                                      />
                                    }
                                    </Td>
                                  </Tr>
            
                            ):(
                                      <Tr backgroundColor = 'green.200'>
                                          <Td>{i+1}</Td>
                                          <Td>{member.name}</Td>
                                          <Td>{member.priority}</Td>
                                          <Td>
                                          { 
                                            <CheckCircleIcon  
                                              color='green.500' 
                                              boxSize='10' 
                                              _hover={{
                                                color:'green.300' 
                                              }}
                                              value = {member.id}
                                              onClick= {() => deletetask(member.id)}
                                            />
                                          }
                                          </Td>
                                        </Tr>
                            )
                          )
                        
                      )
                    )
                  )
                }

              
        </Table>
      </TableContainer>
        <AddNewTask />
      </center>

      </Box>
    </ChakraProvider>
  )
}

function AddNewTask()
{
    
    const {data , setData} = useBetween(useShareableState)

    const { isOpen, onOpen, onClose } = useDisclosure()  
    const [task_name_input, setValue1] = useState("")
    const [priority_input , setValue2] = useState("")
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const toast = useToast()
    const toastIdRef = React.useRef()

    function SaveDataToDatabase(event)
    {
        event.preventDefault();
        // post request
        fetch('/add_task', {
            method: 'POST',
            body: JSON.stringify({
              // Add parameters here
              "taskname" : task_name_input,
              "priority" : priority_input
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
             .then((response) => response.json())
             .then((data) => {

                console.log(data);
                (data.result === 'success')?
                (
                    toastIdRef.current = toast({ description: "Success" , status : 'success' , duration: 800})
                    // successfully added the task
                )
                :
                (
                    toastIdRef.current = toast({ description: "Failure" , status : 'error' , duration: 800})
                )
                // update tasks
                fetch("/info").then(
                  res => res.json()
                ).then(
                  data => {
                    setData(data)
                    console.log(data)
                  }
                )
               
             })
             .catch((err) => {
                console.log(err.message);
             });

    }

    return (
          <>
            <Button 
              onClick={onOpen} 
              bgGradient='linear(to-bl,blue.500,blue.400)'
              _hover={{
                bgGradient:'linear(to-bl,blue.300,blue.200)'
              }}
              >
                Add Task
                
            </Button>
            
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add a new Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Task Name</FormLabel>
                    <Input ref={initialRef} placeholder='Task Name' value = {task_name_input}
                    onChange={(e)=>setValue1(e.target.value)} />
                  </FormControl>
      
                  <FormControl mt={4}>
                    <FormLabel>Priority</FormLabel>
                    <Select placeholder='Select option' value={priority_input}  onChange={(e)=>setValue2(e.target.value)}>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                    </Select>
                  </FormControl>
                </ModalBody>
      
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick = {SaveDataToDatabase}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
          
    )
}

function MainHeading()
{
    return (
        <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='6xl'
            fontWeight='extrabold'
        >
               Task Scheduler
        </Text>
    );
}


