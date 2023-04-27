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
      blogMessages: [],
      editBlogMessage: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editBlog = this.editBlog.bind(this);
    this.handleBlogChange = this.handleBlogChange.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
    this.deleteSession = this.deleteSession.bind(this);
  }

  deleteSession = async function (event) {
    try {
      const result = await fetch(`/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: this.state._id }),
      });
      user = await result.json();
    } catch (err) {
      console.log(err);
    }

  }

  //updating editBlogMessage
  handleBlogChange = function (event) {
    event.preventDefault();
    const newState = {
      ...this.state,
      editBlogMessage: event.target.value
    };
    return this.setState(newState);
  }

  //onsubmitofEditblog
  editBlog = async function (event) {
    event.preventDefault();
    try {
      const label = event.target.name;
      newblogMessages = this.blogMessages.slice();
      for (let i = 0; i < newblogMessages.length; i++) {
        if (newblogMessages[i]._id === label) {
          newblogMessages[i].message = event.target.value;
          break;
        }
      }
      await fetch(`/api/blog/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message_id: event.target.name,
          fmessage: event.target.value
        }),
      });
      const newState = { ...this.state, blogMessages: newblogMessages };
      return this.setState(newState);
    } catch (err) {
      console.log(err);
    }

  }



  deleteBlog = async function (event) {
    event.preventDefault();
    //deleteBlog
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
          ...this.state,
          _id: user._id,
          name: user.name,
          event_id: user.event_id,
          isLoggedIn: true,
          ishost: user.ishost,
          fname: '',
          fpassword: '',
          code: '',
          blogMessages: user.messages
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
        const { _id, name, event_id, ishost, isLoggedIn, messages } = isUser;
        return this.setState({
          ...this.state,
          _id,
          name,
          event_id,
          isLoggedIn,
          ishost,
          blogMessages: messages
        })
      } else {
        return this.setState({ ...this.state })
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <>
        <NavBar user={this.state} deleteSession={this.deleteSession} />
        <Routes>
          <Route index element={<Main user={this.state} />} />
          <Route path='/signup' element={<Signup user={this.state} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} />} />
          <Route path='/login' element={<Login user={this.state} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} />} />
          <Route path='/blog' element={<Blog user={this.state} editBlog={this.editBlog} deleteBlog={this.deleteBlog} handleBlogChange={this.handleBlogChange} />} />
          <Route path='/event' element={<Event user={this.state} />} />
          <Route path='/chat' element={<Chat user={this.state} />} />
        </Routes>
      </>
    )
  }
}

export default App;