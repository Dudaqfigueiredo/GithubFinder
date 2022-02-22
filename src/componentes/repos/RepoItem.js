import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repo }) => {
  return (
    <div className="left">
        <h3>
            <a className="reposi" target="_blank" href={repo.html_url}>{repo.name}</a>
        </h3>
    </div>
  )
}

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired
}
export default RepoItem;