import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = ({ user }) => {
  return (
    <nav className="">
      <Link to='/' className="">FanTalk</Link>

      {user.isLoggedIn ?
        [<ul>
          <Link to='/event'>Event</Link>,
          <Link to='/blog'>Blog</Link>,
          <Link to='/chat'>Chat</Link>
        </ul>,
        <div>{`Hi, ${user.name}!`}</div>
        ]
        : [<ul>
          <Link to='/signup'>Signup</Link>,
          <Link to='/login'>Login</Link>
        </ul>,
        ]}
    </nav>
  );
}

export default NavBar;