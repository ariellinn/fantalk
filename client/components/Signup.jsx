import React from 'react';

const Signup = props => {
  return (
    <div className="mainContent">
      <h1>Sign Up</h1>
      <form className="formSubmit" >
        <label>
          Name:
          <input type="text" name='fname' value={props.fname} onChange={(e) => props.handleInputChange(e)} />
        </label>
        <label>
          Password:
          <input type="text" name='fpassword' value={props.fpassword} onChange={(e) => props.handleInputChange(e)} />
        </label>
        <label>
          Event Code:
          <input type="text" name='code' value={props.code} onChange={(e) => props.handleInputChange(e)} />
        </label>
        <button className="submit" name='signup' type="button" onClick={(e) => props.handleSubmit(e)}>Submit</button>
      </form>
    </div >
  );
}

export default Signup;