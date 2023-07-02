import { Button } from "@chakra-ui/react"
import React , {useState , useEffect} from 'react';
import { Text } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { Select } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
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


export function MainHeading()
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

export function PreviousHistory()
{
       
}

export function AddNewTask()
{
    
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
               
             })
             .catch((err) => {
                console.log(err.message);
             });

    }

    return (
          <>
            <Button onClick={onOpen}>Add Task</Button>
            
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