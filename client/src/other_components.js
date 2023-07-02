import { Button } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
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
    
    return (
        <Button 
            margin = '10'
            colorScheme='blue'  
            borderTopRadius="md"
            _hover={{
                bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}
            >
            Previous History
        </Button>
    );
}

export function AddNewTask()
{
    function create()
    {
        // pop new form
         
    }

    return (
        <Button 
            onClick={create}
            margin = '10'
            colorScheme='blue'  
            borderTopRadius="md"
            _hover={{
                bgGradient: 'linear(to-r, green.600, green.100)',
            }}
            >
            Add new Task
        </Button>
    );
}