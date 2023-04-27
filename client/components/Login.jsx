import React from 'react';

const Login = props => {
  return (
    <div className="mainContent">
      <h1>Log In</h1>
      <form className="formSubmit">
        <label>
          Name:
          <input type="text" name='fname' value={props.fname} onChange={() => props.handleInputChange} />
        </label>
        <label>
          Password:
          <input type="text" name='fpassword' value={props.fpassword} onChange={() => props.handleInputChange} />
        </label>
        <button className="submit" name='login' type="button" onClick={() => props.handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default Login;