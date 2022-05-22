import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import "./LocalStorage.css"

export default function LocalStorage() {

    // const dataList = [{id: 1, name: "React Js", completed: false}]

    // localStorage.setItem("TodoCourses", JSON.stringify(dataList))

    const getTheData = () =>{
        const parseData = localStorage.getItem("TodoCourses")
        const parseList = JSON.parse(parseData)
        setDataList(parseList)
    }
    
    const[dataList, setDataList] = useState([])

    const completeList = dataList.filter(each => each.completed === true)

    const notCompleteList = dataList.filter(each => each.completed === false)

    const[names, setNames] = useState("")

    useEffect(() =>{
        getTheData()
    }, [])

    const changeCourse = (event) =>{
        setNames(event.target.value)
    }

    const addTheData = (event) =>{
        if(event.key === "Enter"){
            const newData = {
                id : dataList.length + 1,
                name : names,
                completed: false
            }
    
            localStorage.setItem("TodoCourses", JSON.stringify([...dataList,newData]))
            getTheData()
            setNames("")
        }
    }

    const deleteItem = (id) =>{
        const filteredData = dataList.filter((each) =>(each.id !== id))
        localStorage.setItem("TodoCourses", JSON.stringify(filteredData))
        getTheData()
    }
    

  return (
    <div className='server-container'>
        <h1>Todo List</h1>
        <input className='input-text' type="text" onChange={changeCourse} onKeyDown={addTheData} value={names} />
        {/* <button className='add-button' onClick={addTheData} >Add</button> */}
        <ul className='list-container'>
            {notCompleteList.map((each) =>(
                <Todo details={each} key={each.id} deleteItem={deleteItem} dataDetails={dataList} getDataCall={getTheData} />
            ))}
        </ul>
        {completeList.length !== 0 && <p className='complete'>Completed</p>}
        <ul className='list-container'>
            {completeList.map((each)=>(
                <Todo details={each} key={each.id} deleteItem={deleteItem} dataDetails={dataList} getDataCall={getTheData}/>
            ))}
        </ul>
    </div>
  )
}
