import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectAPI from '../requests/ProjectApi';
import AppHeader from './AppHeader';

function ProjectList() {

    const [projects, setProjects] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true);

    useEffect(() => {
        setIsAdmin(localStorage.getItem('admin') === 'true');

        ProjectAPI.getProjects(localStorage.getItem('token'), (projects) => {
            setProjects(projects);
        });
    }, []);

    if (isAdmin) {
        return (
            <div className="container">
                <AppHeader />
                <div className="row mt-2">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Projects</h2>
                                <p>Select one of the projects to view your timesheet and add new entries.</p>
                                <ul className="list-group" data-testid="project-table">
                                    {projects.map(project => (
                                        <li className="list-group-item" key={project.id}>
                                            <Link to={"/projects/" + project.id}>{project.name}</Link> - {project.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Admin</h2>
                                <ul className="list-group">
                                    <li className="list-group-item"><Link to="/manage/projects">Manage Project</Link></li>
                                    <li className="list-group-item"><Link to="/manage/users">Manage Users</Link></li>
                                    <li className="list-group-item"><Link to="/report">Report</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <AppHeader />
                <div className="row mt-2">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Projects</h2>
                                <p>Select one of the projects to view your timesheet and add new entries.</p>
                                <ul className="list-group">
                                    {projects.map(project => (
                                        <li className="list-group-item" key={project.id}>
                                            <Link to={"/projects/" + project.id}>{project.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectList;
