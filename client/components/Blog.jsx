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
            <div className='buttonBox'>
              <button className="submitBlog" name={element._id} type="button" onClick={(e) => props.editBlog(e)}>Edit</button>
              <button className="submitBlog" name={element._id} type="button" onClick={(e) => props.deleteBlog(e)}>Delete</button>
            </div>
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
        {(props.user.ishost) ?
          <form id="flex_submission">
            <div>
              <label>
                Message to Edit/Add:
                <input id="push_left" type="text" name='editBlogMessage' value={props.user.editBlogMessage} onChange={(e) => props.handleInputChange(e)} />
              </label>
            </div>
            <button className="submitBlog" type="button" onClick={(e) => props.addBlogMessage(e)}>Submit</button>
          </form>
          : null}
      </div>
    </div>
  );
}

export default Blog;