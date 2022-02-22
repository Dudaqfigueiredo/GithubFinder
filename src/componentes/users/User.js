import React, { Fragment, Component } from 'react'
import {  useParams, Link } from "react-router-dom";
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'

export class User extends Component {
    
    componentDidMount() {
        const {login} = this.props.params
        this.props.getUser(login)
    }

    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired
    }

  render() {
    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        following,
        public_repos,
        public_gists,
        hireable
    } = this.props.user;

    const { loading } = this.props;

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
                        <h3>Biografia:</h3>
                        <p>{bio}</p>
                    </Fragment>
                )}
            </div>
        </div>
    </Fragment>
  }
}
export default (props) => (
    <User
        {...props}
        params={useParams()}
    />
);
