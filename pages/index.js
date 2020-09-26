import Head from 'next/head'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";

//import ListItem from '../components/ListItem'

export default function Home() {
    // START JAVASCRIPT HERE.
    // You can technically write Javascript anywhere inside this file, but these start and end points are done for teaching purposes. 

    // STATE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // use state when you know that variable is changed by the page or can change the page

    // toDoArray: an array of tasks that need to be done; setToDoArray: a function that allows you to modify the task variable. 
    const [toDoArray, setToDoArray] = useState(['create a todo app', 'wear a mask', 'play roblox'])

    // doneArray: an array of tasks that are done; setToDoArray: a function that allows you to modify the task variable
    const [doneArray, setDoneArray] = useState(['be a winner', 'become a tech bro'])

    // taskInputValue: a string of the name of task that you want to add; setToDoArray: a function that allows you to edit the taskInputValue
    const [taskInputValue, setTaskInputValue] = useState('')

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // FUNCTIONS ____________________________________________________________________________________________________________________________
    // deals with actions that HTML calls apon 

    // addTask: adds a task to toDoArray by adding the taskInputValue
    function addTask() {
        console.log('addTask called')
        if (!!taskInputValue) { // makes sure that taskInputValue is not blank
            setToDoArray(toDoArray.concat(taskInputValue))
            setTaskInputValue('')
        }
    }

    // finishTask: finishes a task by removing it from the toDoArray and adding it to the doneArray
    function finishTask(task, index) {
        console.log('finishTask called')
        // to remove an item from an state that is an array you must first make a copy and then splice the copy and then set the copy as the new state
        // https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react
        let copyToDoArray = [...toDoArray]
        copyToDoArray.splice(index, 1)
        setToDoArray(copyToDoArray)
        // to add an item to an state that is an array you must use concat
        // https://medium.com/javascript-in-plain-english/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc 
        setDoneArray(doneArray.concat(task))
    }

    function undoTask(task, index) {
        console.log('undoTask called')
        // to remove an item from an state that is an array you must first make a copy and then splice the copy and then set the copy as the new state
        // https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react
        let copyDoneArray = [...doneArray]
        copyDoneArray.splice(index, 1)
        setDoneArray(copyDoneArray)
        // to add an item to an state that is an array you must use concat
        // https://medium.com/javascript-in-plain-english/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc 
        setToDoArray(toDoArray.concat(task))

    }

    // ______________________________________________________________________________________________________________________________________

    // LISTITEM COMPONENT
    function ListItem(props) {

        // returns either the finishTask or undoTask function to handle clicking on the icon depending the type property
        function handleClick() {
            if (props.type == 'todo') {
                return finishTask(props.task, props.index)
            }

            else if (props.type == 'done') {
                return undoTask(props.task, props.index)
            }
        }

        let icon
        if (props.type == 'todo') {
            icon = '✅'
        }
        else if (props.type == 'done') {
            icon = '↩️'
        }

        return (
            <li key={props.index}>
                <div className="listItem">
                    {props.task}
                    <div
                        className="icon"
                        onClick={() => handleClick()}
                    >
                        {icon}
                    </div>
                </div>
                <style jsx>
                    {`
                        .listItem {
                            display: flex;
                            flex-direction: row;
                            height: 20px;
                            line-height: 20px;
                            list-style-type: circle;
                        }
                
                        .icon {
                            margin-left: auto;
                            //padding-right: auto;
                            cursor: pointer;
                        }
                
                        .icon:hover {
                            opacity: 0.6;
                        }
                        `}
                </style>
            </li>
        );
    }

    // END JAVASCRIPT HERE.
    return (
        // START HTML HERE.
        // You can also encapsulate HTML inside a Javascript const/function/object and return it here was well. 
        <div className='globalContainer'>
            {/* HTML for the Header starts here */}
            <Header></Header>
            {/* HTML for Header ends here */}
            <div className='contentContainer'>
                <h2>
                    You have have {toDoArray.length} task(s) left to do.
                </h2>
                <p>This site was created by BLANK NAME, a TPEO Member.</p>
                <div className='inputContainer'>
                    <h3>Add a task</h3>
                    <input
                        className='inputTask'
                        value={taskInputValue}
                        onChange={(event) => setTaskInputValue(event.target.value)}
                    ></input>
                    <button onClick={() => addTask()}>Add</button>
                </div>
                <div className='toDoContainer'>
                    <h3>To Do</h3>
                    <ul>
                        {/* The map function is a javascript function that lists out everything in the toDoArray so the properties can be accessed by the HTML*/}
                        {toDoArray.map((task, index) => (
                            <ListItem
                                task={task}
                                type='todo'
                                index={index}
                            >
                            </ListItem>
                        ))
                        }
                    </ul>
                </div>
                <div className='doneContainer'>
                    <h3>Done</h3>
                    <ul>
                        {/* The map function is a javascript function that lists out everything in the toDoArray so the properties can be accessed by the HTML*/}
                        {doneArray.map((task, index) => (
                            <ListItem
                                task={task}
                                type='done'
                                index={index}
                            >
                            </ListItem>
                        ))
                        }
                    </ul>
                </div>
            </div>
            <style jsx>
                {`
                    /*
                     START CSS HERE.
                        CSS can also be written directly inside HTML elements or imported from another file,
                        but writing inside style jsx tags is the best practice. 
                    */
                    .globalContainer {
                        align-items: center;
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        width: 100%;
                    }
                
                    .contentContainer {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        max-width: 2000px;
                        padding: 5%;
                    }

                    .inputContainer {
                        align-self: center;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }

                    .inputTask {
                        height: 25px;
                        width: 300px;
                        margin-left: 10px;
                        margin-right: 10px;
                    }

                    .listItem {
                        display: flex;
                        flex-direction: row;
                        height: 20px;
                        line-height: 20px;
                        list-style-type: circle;
                    }

                    .icon {
                        padding-left: 5px;
                        cursor: pointer;
                    }

                    .icon:hover {
                        opacity: 0.6;
                    }
                    /*
                     STOP CSS HERE.
                    */
                `}
            </style>
        </div>
        // STOP HTML HERE.
    )
}
