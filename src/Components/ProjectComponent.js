import axios from "axios";
import React, { useEffect, useState } from "react";

const ProjectComponent = () => {
    const [projects, setProjects] = useState([]);
    const [projectId,setProjectId] = useState("");
    const [projectDesription,setProjectDescription] = useState("");
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [edit,setEdit] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        projectList();
    }

    const projectList = () => {
        axios.get("http://localhost:8083/api/projects")
            .then(response => {
                setProjects(response.data);
                console.log("data fetch successfully");
            })
            .catch(error =>
                console.log("Error for fecting the projects", error)
            );
    }

    const handleEditProject = (e,index) => {
        e.preventDefault();
        setEdit(true);

        setProjectId(projects[index].id);
        setName(projects[index].name);
        setDescription(projects[index].description);
    }

    const handleDeleteProject = (e,index) => {
        e.preventDefault();
        const projectId = projects[index].id;
        axios.delete(`http://localhost:8083/api/projects/${projectId}`)
        .then( response => {
            console.log("Project got Deleteld");
            schoolList();
        })
        .catch(error => {
            console.error("Error occured",error);
        })
    }

    useEffect(() => {
        projectList();
    },[]);

    const handleAddAndEditProject = (e) =>  {
        e.preventDefault();
        if(edit) {
            axios.put(`http://localhost:8083/api/projects/${projectId}`,{name:name,description:description})
            .then(response => {
            console.log("project got updated sucessfully");
            projectList();
        })
        .catch(error => {
            console.error("Error occured",error);
        })
        setEdit(false);
        setProjectId("");
        setName("");
        setDescription("");
        } 
        else {
        axios.post("http://localhost:8083/api/project",{name:name,description:description})
        .then(response => {
            console.log("project added sucessfully");
            projectList();
        })
        .catch(error => {
            console.error("Error occured",error);
        })
    }
    }
    return (
        <div className="container mt-3">
            <h2>Project List</h2>
            <br/>
            <button type="submit" onClick={handleClick} className="btn btn-primary">Show Projects </button>
            <br/>
            <br/>
            <form>
                <table border="4" align="center" className="container mt-1">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects && projects.map((project,index) => (
                            <tr key={project.id}>
                                <td>{project.id}</td>
                                <td>{project.name}</td>
                                <td>{project.description}</td>
                                <td><button type="submit" onClick={(e) => handleEditProject(e,index)} className="btn btn-primary"> Edit </button>&nbsp;&nbsp;&nbsp;
                                    <button type="submit" onClick={(e) => handleDeleteProject(e,index)} className="btn btn-primary">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br/>
                Name : <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/> <br/>
                Description : <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}/> <br/>
                <br/>
               <button type="submit" onClick={handleAddAndEditProject} className="btn btn-primary"> {edit ? "Update" : "Add"}</button> 
               <br/>
               <br/> 
            </form>
        </div>
    )
}

export default ProjectComponent;