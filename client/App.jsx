import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './stylesheets/styles.css';
import Blog from './components/Blog.jsx';
import Chat from './components/Chat.jsx';
import Event from './components/Event.jsx';
import Login from './components/Login.jsx';
import Main from './components/Main.jsx';
import NavBar from './components/NavBar.jsx';
import Signup from './components/Signup.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: undefined,
      name: undefined,
      event_id: undefined,
      isLoggedIn: false,
      ishost: false
    };
  }

  componentDidMount = async () => {
    try {
      const isData = await fetch('/api/isLoggedIn');
      const isUser = await isData.json();
      console.log("This user is logged in", isUser);
      if (isUser.isLoggedIn) {
        const { _id, name, event_id, ishost, isLoggedIn } = isUser;
        return this.setState({
          _id,
          name,
          event_id,
          isLoggedIn,
          ishost
        })
      } else {
        return this.setState({
          _id: undefined,
          name: undefined,
          event_id: undefined,
          isLoggedIn: false,
          ishost: false
        })
      }
    } catch (err) {
      return err;
    }
  }

  render() {
    return (
      <div>
        <NavBar user={this.state} />
        <div className="container">
          <Routes>
            <Route index element={<Main user={this.state} />} />
            <Route path='/signup' element={<Signup user={this.state} />} />
            <Route path='/login' element={<Login user={this.state} />} />
            <Route path='/blog' element={<Blog user={this.state} />} />
            <Route path='/event' element={<Event user={this.state} />} />
            <Route path='/chat' element={<Chat user={this.state} />} />
          </Routes>
        </div>
      </div>
    )
  }
}

export default App;