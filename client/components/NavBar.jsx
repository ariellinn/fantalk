import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = ({ user }) => {
  return (
    <nav className="navContainer">
      <Link to='/' className="logo">FanTalk</Link>

      {user.isLoggedIn ?
        [<ul className="routeLinks">
          <li><Link to='/event'>Event</Link></li>
          <li><Link to='/blog'>Blog</Link></li>
          <li><Link to='/chat'>Chat</Link></li>
        </ul>,
        <div className="name">{`Hi, ${user.name}!`}</div>
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