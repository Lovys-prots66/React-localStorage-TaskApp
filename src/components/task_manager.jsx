import { useCallback, useReducer, useRef, useState } from 'react'
import useLocalStorage from "./customHooks/useLocalStorage";

function TaskManager(){
  
  const [taskInput, setTaskInput] = useState("")
  
  const inputRef = useRef("")
  
  
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    return useLocalStorage([], 0);
  })
  

  const handleAddTask = useCallback(() => {

    if(taskInput.trim() !== ""){
      dispatch(
        {
          type : 'ADDTASK',
          payload : {id: Date.now(), text: taskInput}
        }
      );
      setTaskInput("");
      inputRef.current.focus()
    }
    console.log(tasks);
  }, [taskInput])



  const handlDeleteTask = useCallback((id) => {
    dispatch({type : 'DELETETASK', payload: id})
  }, []);

  const handleDone = useCallback((id) => {
    dispatch({type : 'TOGGLECOMPLETED', payload: id})
  }, []);

  useLocalStorage(tasks, 1);

  return(
    <>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="task">
          Task: 
          <input 
            type="text" 
            id='task' 
            ref={inputRef} 
            value={taskInput} 
            onChange={(e) => setTaskInput(e.target.value)}
            />
        </label>
        <button type='submit' onClick={() =>{handleAddTask()}}></button>
      </form>
      <ul>
        {tasks && tasks?.map(task => {
          return <li key={task.id}>{task.text}
            <input type='checkbox' checked={task.completed} onChange={() => handleDone(task.id)} />
            <button onClick={() => handlDeleteTask(task.id)}>delete</button>
          </li>
        })}
      </ul>
    </>
  )
}

function taskReducer(tasks, action){

  switch (action.type){

    case 'ADDTASK':
      return [
        ...tasks,
        {
          id : action.payload.id,
          text : action.payload.text,
          completed : false
        }
      ];

    case 'DELETETASK':
      return tasks.filter(task => task.id !== action.payload);

    case 'TOGGLECOMPLETED':
      return tasks.map(task => {
        return task.id == action.payload ? {...task, completed : !task.completed} : task
      });
  }
}

export default TaskManager;