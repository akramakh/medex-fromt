import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import firebase from '../../firebaseConfig';
import './navbar.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

class Navbar extends Component {
  state = {
    user: null,
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && !user.isAnonymous) {
        this.setState({user});
      } else {
        this.setState({user: null});
      }
    });
  }

  doLogout = () => {
    firebase.auth().signOut();
  };

  renderRightMenu = () => {
    if (this.state.user) {
      return (
        <div onClick={this.doLogout}>
          <i className='fa fa-user' />
          <span>{this.state.user.displayName}</span>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/register'>Register</NavLink>
        </React.Fragment>
      );
    }
  };
  render() {
    return (
      <header id='top-nav'>
        <div className=' container'>
          <div className='left-menu'>
            <ul>
              <li>
                <a href='#'>Home</a>
              </li>
              <li>
                <a href='blogs'>Blogs</a>
              </li>
            </ul>
          </div>
          <div className='middle-menu'>
            <NavLink to='/'>TODO</NavLink>
          </div>
          <div className='right-menu'>{this.renderRightMenu()}</div>
        </div>
      </header>
    );
  }
}

export default Navbar;
