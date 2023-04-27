import React from 'react';

const Blog = props => {

  const fillValue = function (ishost) {
    const blogArray = [];
    if (ishost) {
      for (const element of props.user.blogMessages) {
        blogArray.push(
          <div className="blogBox">
            <div className="blogMessages">
              <div>{element.message}</div>
              <p>{element.datetime}</p>
            </div>
            <button className="submitBlog" name='blogEdit' type="button" onClick={(e) => props.editBlog(e)}>Edit</button>
            <button className="submitBlog" name='blogDelete' type="button" onClick={(e) => props.deleteBlog(e)}>Delete</button>
          </div>
        );
      }
    } else {
      for (const element of props.user.blogMessages) {
        blogArray.push(
          <div className="blogBox">
            <div className="blogMessages">
              <div>{element.message}</div>
              <p>{element.datetime}</p>
            </div>
          </div>
        );
      }
    }
    return blogArray;
  };

  return (
    <div className="mainContent">
      <h1>BLOG</h1>
      <div className="blogContainer">
        {(props.user.blogMessages.length != 0) ? fillValue(props.user.ishost) : null}
      </div>
    </div>
  );
}

export default Blog;