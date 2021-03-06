import React, { Fragment, useEffect } from 'react'
import {  useParams, Link } from "react-router-dom";
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos.js';
import PropTypes from 'prop-types';

const User = ({ user, loading, getUser, getUserRepos, repos, match }) => {
    const { login } = useParams()

    useEffect(() => {
       getUser(login);
       getUserRepos(login);
       //eslint-disable-next-line
    }, []);

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        followers,
        company,
        html_url,
        following,
        public_repos,
        public_gists,
    } = user;

    if (loading) return <Spinner />

    return <Fragment>
        <Link to='/' className='btn btn-light'>
            Back To Search
        </Link>
        <div className="card grid-2">
            <div className="all-center">
                <img src={avatar_url} className="round-img" alt="" style={{width:'200px'}} />
                <h1>{name}</h1>
                <p>Location: {location}</p>
                
            </div>
            <div>
                {bio && (
                    <Fragment>
                        <h3>Biography:</h3>
                        <p>{bio}</p>
                    </Fragment>
                )}
                    <br />
                <ul>
                    <li>
                        {login && <Fragment>
                        <strong>Username:  </strong>
                        {login}
                        </Fragment>}
                    </li>
                    <li>
                        {company && <Fragment>
                        <strong>Company:  </strong>
                        {company}
                        </Fragment>}
                    </li>
                    <li>
                        {blog && <Fragment>
                        <strong>Website:  </strong>
                        <a href={blog} style={{color:'white'}} target="_blank">{blog}</a>
                        </Fragment>}
                    </li>
                </ul>
                <br /> <br />
                <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
            </div>
        </div>
        <div className="card text-center">
            <div className="badge badge-primary">Followers:  {followers} </div>
            <div className="badge badge-success">Following:  {following} </div>
            <div className="badge badge-danger">Public Repos:  {public_repos} </div>
            <div className="badge badge-dark">Public Gists:  {public_gists} </div>
            <br /> <br/> <br/>
        
            <div>
            <h2 className="left" style={{textDecoration: "underline"}}>Repositories:</h2>
            <Repos repos={repos} />
            </div>
         </div> 
    </Fragment>
}

User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired

}
export default User;

