import React, { useState } from 'react'
import './Todo.css'
import {MdDeleteOutline} from "react-icons/md"

export default function Todo(props) {
    const {details, deleteItem, dataDetails, getDataCall} = props
    const {id, name, completed} = details

    const[active, setActive] = useState(completed)


    const classStyle = active? "line-through": "no-line"

    const deleteTheItem = () =>{
      deleteItem(id)
    }

    const selectedItem = () =>{
      setActive(!active)
      const updatedData = dataDetails.map((each) =>{
        if(each.id === id){
          return {...each, completed: !active}
        }
        return each
      })
      localStorage.setItem("TodoCourses", JSON.stringify(updatedData))
      getDataCall()
    }

  return (
    <li className='list-item'>
        <div className='input-label'>
          <input className='input' type="checkbox" checked={active} onChange={selectedItem} id={`check${id}`}/>
          <label className={`label ${classStyle}`} htmlFor={`check${id}`}>{name}</label>
        </div>
        <button className='button' type='button' onClick={deleteTheItem}><MdDeleteOutline className="icon"/></button>
    </li>
  )
}
