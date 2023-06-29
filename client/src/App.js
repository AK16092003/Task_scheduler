import React , {useState , useEffect} from 'react';
import {Main_heading} from './other_components.js';
import {Previous_history} from './other_components.js';

export default function App()
{
  const [data , setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(

      data => {
        setData(data)
        console.log(data)
      }
    )

  },  [])

  return (
    
    <body bgcolor = "yellow">
      <Main_heading />

      <div id = "task_box">
      {(typeof data.members  === 'undefined' ) ? (

          <div id = "load_box">Loading... </div>

        ):(

          data.members.map((member , i) => (
            <div id = "task_entity" >{member}</div>
          ))

        )
      }
      </div>
      <Previous_history />
    </body>
  )
}
