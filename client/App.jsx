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
    this.deleteBlog = this.deleteBlog.bind(this);
    this.deleteSession = this.deleteSession.bind(this);
    this.addBlogMessage = this.addBlogMessage.bind(this);
  }

  addBlogMessage = async function (event) {
    try {
      const result = await fetch(`/api/blog/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event_id: this.state.event_id, fmessage: this.state.editBlogMessage }),
      });
      await result.json();
      const newMessages = [];
      for (let message of this.state.blogMessages) {
        if (message._id === Number(event.target.name)) {
          message.message = this.state.editBlogMessage;
        }
        newMessages.push(message);
      }
      const newState = { ...this.state, editBlogMessage: '', blogMessages: newMessages };
      return this.setState(newState);
    } catch (err) {
      console.log(err);
    }
  }
  //onClick of deleting session, calls this function
  deleteSession = async function (event) {
    try {
      const result = await fetch(`/api/logout`, {
        method: "DELETE",
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

  //onsubmitofEditblog
  editBlog = async function (event) {
    try {
      console.log(event.target.name);
      const result = await fetch(`/api/blog/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: Number(event.target.name), fmessage: this.state.editBlogMessage }),
      });
      const newMessages = [];
      for (let message of this.state.blogMessages) {
        if (message._id === Number(event.target.name)) {
          message.message = this.state.editBlogMessage;
        }
        newMessages.push(message);
      }

      const newState = { ...this.state, editBlogMessage: '', blogMessages: newMessages };
      return this.setState(newState);
    } catch (err) {
      console.log(err);
    }
  }

  deleteBlog = async function (event) {
    try {
      console.log(event.target.name);
      const result = await fetch(`/api/blog/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: Number(event.target.name) }),
      });
      const newMessages = [];
      for (let message of this.state.blogMessages) {
        if (message._id != Number(event.target.name)) {
          newMessages.push(message);
        }
      }

      const newState = { ...this.state, blogMessages: newMessages };
      return this.setState(newState);
    } catch (err) {
      console.log(err);
    }
  }

  //updating input of label
  handleInputChange = function (event) {
    const label = event.target.name;
    const newState = { ...this.state };
    newState[label] = event.target.value;
    return this.setState(newState);
  }

  //on submit of signing up
  handleSubmit = async function (event) {
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
          <Route path='/blog' element={<Blog user={this.state} editBlog={this.editBlog} deleteBlog={this.deleteBlog} handleInputChange={this.handleInputChange} addBlogMessage={this.addBlogMessage} />} />
          <Route path='/event' element={<Event user={this.state} />} />
          <Route path='/chat' element={<Chat user={this.state} />} />
        </Routes>
      </>
    )
  }
}

export default App;