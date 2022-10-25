import React, { useState, useEffect } from 'react'
import "./style.css"

const getItemData = (() => { //getting and return a task list from local storage
    const dataList = localStorage.getItem("todoData")
    if (dataList)
        return JSON.parse(dataList) //string to array of object
    else
        return []
})

const Todo = () => {

    const [currentData, updateData] = useState("")              //state used to handle current value in input fields
    const [itemList, updateItemList] = useState(getItemData())  //state for TaskList
    const [editItemData, updateEditItemData] = useState("")     //state used for edit action
    const [editButton, editButtonToggle] = useState(false)      //state used to toggle between edit or add button in input field.

    useEffect(() => {
        localStorage.setItem("todoData", JSON.stringify(itemList)) //saving task list to local storage
    }, [itemList])

    const additems = (() => {
        if (!currentData || currentData.length < 1) {
            alert("Task not entered")
        }
        else if (editButton === true) {     //check for editButton
            const updateList = itemList.map((value) => {  //updating previous value of task with new value
                if (value.id === editItemData)
                    value.name = currentData
            })

            updateEditItemData(updateList)  //update list with updated task value
            updateData("")                  //remove input field value to empty
            editButtonToggle(false)         //set back to false
        }
        else {
            const item = {
                id: new Date().getTime().toString(),
                name: currentData // used current data of state to make fill up json object
            }
            updateItemList([...itemList, item]) //spread operator. keep saved last values, as it is in arry structure
            updateData("") //after adding to array set remove current value
            console.log(itemList)
        }
        console.log(itemList.length)
    })

    //edit task with id -> get id, find task value from task list, set states for edit action.
    const editItem = ((id) => {
        editButtonToggle(true)

        const cValue = itemList.find((value) => {
            if (id === value.id)
                return value
        })
        updateData(cValue.name) //setting current data in input field
        updateEditItemData(id)  //setting id into edit state.
    })

    //remove item with id
    const removeItem = ((id) => {
        const updatedList = itemList.filter((value) => {
            console.log(value.name + " " + value.id)
            return id !== value.id
        })
        updateItemList(updatedList)
    })

    //remove all
    const removeAll = (() => {
        updateItemList([]) //setting emplty array again on remove all
    })

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="/image.png" alt="images" />
                        <figcaption> Add your List here 👇 </figcaption>
                    </figure>
                    <div className='addItem'>
                        <input type="text" placeholder="✍️ Add item" className='form-control '
                            value={currentData}
                            onChange={(event) => updateData(event.target.value)}>
                        </input>
                        {
                            editButton ? <i className="fa fa-edit add-btn" onClick={additems}></i>
                                : <i className="fa fa-plus add-btn" onClick={additems} ></i>
                        }
                    </div>
                    <div className='showItems'>
                        {
                            itemList.map((value, index) => {
                                console.log(value + " " + index)
                                return (
                                    <div className='eachItem' key={index}>
                                        <h3> {index + 1}.  {value.name} </h3>
                                        <div className='todo-btn'>
                                            <i className="far fa-edit add-btn" onClick={() => editItem(value.id)}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => removeItem(value.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove all" onClick={removeAll}>
                            <span>Check List</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo