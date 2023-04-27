import React, { Component } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './styles.css';
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
      ishost: false,
      fname: '',
      fpassword: '',
      code: '',
      blogMessages: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  navigation = function (path) {
    return useNavigate(path);
  }

  handleInputChange = function (event) {
    event.preventDefault();
    const label = event.target.name;
    const newState = { ...this.state };
    newState[label] = event.target.value;
    return this.setState(newState);
  }

  handleSubmit = async function (event) {
    event.preventDefault();
    const data = {
      fname: this.state.fname,
      fpassword: this.state.fpassword,
    }
    let user;

    try {
      if (event.target.name === 'signup') {
        data.code = Number(this.state.code);
      }
      const result = await fetch(`/api/${event.target.name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      user = await result.json();
      if (user.name) {
        const newState = {
          _id: user._id,
          name: user.name,
          event_id: user.event_id,
          isLoggedIn: true,
          ishost: user.ishost,
          fname: '',
          fpassword: '',
          code: ''
        }
        // this.navigation('/event');
        return this.setState(newState);
      }

    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount = async () => {
    try {
      const isData = await fetch('/api/isLoggedIn');
      const isUser = await isData.json();
      if (isUser.isLoggedIn) {
        const { _id, name, event_id, ishost, isLoggedIn } = isUser;
        return this.setState({
          ...this.state,
          _id,
          name,
          event_id,
          isLoggedIn,
          ishost
        })
      } else {
        return this.setState({ ...this.state })
      }
    } catch (err) {
      return err;
    }
  }

  render() {
    return (
      <>
        <NavBar user={this.state} />
        <Routes>
          <Route index element={<Main user={this.state} />} />
          <Route path='/signup' element={<Signup user={this.state} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} />} />
          <Route path='/login' element={<Login user={this.state} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} />} />
          <Route path='/blog' element={<Blog user={this.state} />} />
          <Route path='/event' element={<Event user={this.state} />} />
          <Route path='/chat' element={<Chat user={this.state} />} />
        </Routes>
      </>
    )
  }
}

export default App;