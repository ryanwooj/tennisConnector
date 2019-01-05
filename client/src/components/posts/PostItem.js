import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/post';
import { getPosts } from '../../actions/post';

const PostItem = ({
  auth,
  addLike,
  removeLike,
  getPosts,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <a href='profile.html'>
          <img
            className='round-img'
            src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
            alt=''
          />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button
          onClick={e => addLike(_id)}
          type='button'
          className='btn btn-light'>
          <i className='fas fa-thumbs-up' />
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          onClick={e => removeLike(_id)}
          type='button'
          className='btn btn-light'>
          <i className='fas fa-thumbs-down' />
        </button>
        <Link to={`/post/${_id}`} className='btn btn-primary'>
          Discussion{' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button type='button' className='btn btn-danger'>
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.post
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, getPosts }
)(PostItem);
