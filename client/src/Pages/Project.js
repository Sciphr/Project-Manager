import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';

const Project = () => {
  const { id } = useParams(); //* Gets the id from the URL

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }, //* Passes the id to the query
  }); //* Gets the project data from the server

  const { project } = data || {}; //* Gets the project from the data object

  if (loading) return <Spinner />; //* Displays a spinner while loading

  if (error) return `Error: ${error.message}`; //* Displays an error message if there is an error

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{project.status}</p>
          <ClientInfo client={project.client} />
          <EditProjectForm project={project} />
          <DeleteProjectButton projectId={project.id} />
        </div>
      )}
    </>
  );
};

export default Project;
