import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = props => {
  return (
    <nav className="navContainer">
      <Link to='/' className="logo">FanTalk</Link>

      {props.user.isLoggedIn ?
        [<ul className="routeLinks">
          <li><Link to='/event'>Event</Link></li>
          <li><Link to='/blog'>Blog</Link></li>
          <li><Link to='/chat'>Chat</Link></li>
        </ul>,
        <button className="name" type="button" onClick={(e) => props.deleteSession(e)}>{`Hi, ${props.user.name}!`}</button>
        ]
        : [<ul className="routeLinks">
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>,
        ]}
    </nav >
  );
}

export default NavBar;