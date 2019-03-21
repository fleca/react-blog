import React, { Component } from 'react';

import axiosInstance from '../../../axios';
import Post from '../../../components/Post/Post';
import classes from './Posts.module.css';

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axiosInstance.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Felipe'
          };
        });
        this.setState({ posts: updatedPosts });
        // console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id })
  }

  render() {
    let posts = <p style={{ textAlgin: 'center' }}>Something went wrong...</p>

    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)} />
      });

      return (
        <section className={classes.Posts}>
          {posts}
        </section>
      )
    }
  }
}

export default Posts;