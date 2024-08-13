import axios from "axios";
import React, { useEffect, useState } from "react";

const TaskComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [taskId,setTaskId] = useState("");
    const [projectId,setProjectId] = useState("");
    const [title,setTitle] = useState("");
    const [status,setStatus] = useState("");
    const [dueDate,setDuedate] = useState("");
    const [edit,setEdit] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        taskList();
    }

    const taskList = () => {
        axios.get("http://localhost:8082/api/tasks")
            .then(response => {
                setTasks(response.data);
                console.log("data fetch successfully");
            })
            .catch(error =>
                console.log("Error for fecting the students", error)
            );
    }

    const handleGetProjectsBySchool = (e,projectId) => {
        e.preventDefault();
        axios.get(`http://localhost:8082/api/by-project/${projectId}`)
            .then(response => {
                setTasks(response.data);
                console.log("data fetch successfully");
            })
            .catch(error =>
                console.log("Error for fecting the students", error)
            );
    }

    const handleEditTask = (e,index) => {
        e.preventDefault();
        setEdit(true);

        setTaskId(tasks[index].id);
        setTitle(tasks[index].title);
        setStatus(tasks[index].status);
        setDuedate(tasks[index].dueDate);
        setSchoolId(tasks[index].projectId);
    }

    const handleDeleteTask = (e,index) => {
        e.preventDefault();
        const taskId = tasks[index].id;
        axios.delete(`http://localhost:8082/api/tasks/${studentId}`)
        .then( response => {
            console.log("Task got Deleteld");
            taskList();
        })
        .catch(error => {
            console.error("Error occured",error);
        })
    }

    useEffect(() => {
        taskList();
    },[]);

    const handleAddAndEditTask = (e) =>  {
        e.preventDefault();
        if(edit) {
            axios.put(`http://localhost:8082/api/tasks/${taskId}`,{
                title:title,
                status:status,
                dueDate:dueDate,
                projectId:projectId
            })
            .then(response => {
            console.log("task got updated sucessfully");
            taskList();
        })
        .catch(error => {
            console.error("Error occured",error);
        })
        setEdit(false);
        setTaskId("");
        setTitle("");
        setStatus("");
        setDuedate("");
        setProjectId("");
        } 
        else {
        axios.post("http://localhost:8082/api/project",{
            title:title,
            status:status,
            dueDate:dueDate,
            projectId:projectId
        })
        .then(response => {
            console.log("task added sucessfully");
            studentList();
        })
        .catch(error => {
            console.error("Error occured",error);
        })
    }
    }
    return (
        <div>
            <h2>tasks List</h2>
            <br/>
             <h3>Show the List of tasks based on Project Id</h3>
               Search by Project Id : <input type="text" name="schoolId" onChange={(e) => handleGetTasksBySchool(e,e.target.value)} />
            <br/> 
            <button type="submit" onClick={handleClick} className="btn btn-primary">Show Tasks </button>
            <br/>
            <br/>
            <form>
                <table border="4" align="center" className="container mt-1">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th>Project ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.map((task,index) => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.status}</td>
                                <td>{task.dueDate}</td>
                                <td>{task.projectId}</td>
                                <td><button type="submit" onClick={(e) => handleEditTask(e,index)} className="btn btn-primary"> Edit </button>&nbsp;&nbsp;&nbsp;
                                    <button type="submit" onClick={(e) => handleDeleteTask(e,index)} className="btn btn-primary">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br/>
                Title : <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}/> <br/>
                Status : <input type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}/> <br/>
                Due Date : <input type="text" className="form-control" value={dueDate} onChange={(e) => setDuedate(e.target.value)}/> <br/>
                Project Id : <input type="text"  className="form-control" value={projectId} onChange={(e) => setProjectId(e.target.value)}/> <br/>
                <br/>
               <button type="submit" onClick={handleAddAndEditTask} className="btn btn-primary"> {edit ? "Update" : "Add"}</button> 
            </form>
        </div>
    )
}

export default TaskComponent;