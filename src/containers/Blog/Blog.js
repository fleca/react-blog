import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch /*, Redirect */} from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';

const NewPost = React.lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {
  state = {
    auth: true
  }

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink
                to="/posts/"
                exact
                activeClassName="my-active"
                activeStyle={{
                  color: '#FA923F',
                  textDecoration: 'underline'
                }}>Posts</NavLink></li>
              <li><NavLink to={{
                pathname: '/new-post',
                // hash: '#submit',
                // search: '?quick-submit=true'
              }}>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth ? 
            // <Route path="/new-post" component={NewPost} /> 
            <Route path="/new-post" render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <NewPost />
              </Suspense>
            )} /> 
          : null }
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Not found</h1>} /> {/*Instead of h1 a 404 component can be used*/}
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;