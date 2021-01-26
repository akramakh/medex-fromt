import React, {Component} from 'react';
import {useSelector} from 'react-redux';
import firebase from '../../firebaseConfig';

import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './todo.css';

import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap.js';

import Task from '../task/Task';
import CreateTask from '../modals/createTask';

function Todo() {

  const {authReducer: {user}} = useSelector(state => state);
    return (
      <h1>Home Page [{user.role}]</h1>
    )
  }
  // state = {
  //   tasks: {
  //     test: {
  //       id: '-M--J8exrKMpiCmPZx9K',
  //       title: 'm',
  //       description: '33',
  //       date: null,
  //       startAt: '2021-01-01T00:00',
  //       endAt: '2022-01-02T01:00',
  //       checked: false
  //     }
  //   }
  // };

  // constructor() {
  //   super();
  //   const database = firebase.database();
  //   const auth = firebase.auth();
  //   const tasksRef = this.database.ref('/tasks/');

  //   const newTasks = {};
  //   const isLoggedin = auth.currentUser && !auth.currentUser.isAnonymous;
  //   if (isLoggedin) {
  //     const uid = auth.currentUser.uid;
  //     tasksRef.child(uid).once('value', snapshot => {
  //       newTasks[snapshot.key] = snapshot.val();
  //       this.state = {
  //         tasks: newTasks
  //       };
  //     });
  //     // this.setState((state, props) => {
  //     //   return {
  //     //     ...state.tasks,
  //     //     ...newTasks
  //     //   };
  //     // });
  //   }
  // }

  // isUserLoggedin = () => {
  //   return this.auth.currentUser && !this.auth.currentUser.isAnonymous;
  // };

  // componentDidUpdate() {
  //   const database = firebase.database();
  //   const auth = firebase.auth();
  //   const tasksRef = this.database.ref('/tasks/');

  //   const isLoggedin = auth.currentUser && !auth.currentUser.isAnonymous;
  //   if (isLoggedin) {
  //     const newTasks = {};
  //     const uid = auth.currentUser.uid;
  //     tasksRef.child(uid).once('value', snapshot => {
  //       newTasks[snapshot.key] = snapshot.val();
  //     });
  //     this.setState((state, props) => {
  //       return {
  //         ...state.tasks,
  //         ...newTasks
  //       };
  //     });
  //   }
  // }

  // database = firebase.database();
  // auth = firebase.auth();
  // tasksRef = this.database.ref('/tasks/');

  // doToggleCompleteTask = task => {
  //   let tasks = Object.values({...this.state.tasks});

  //   tasks = tasks.filter(el => {
  //     if (el.id === task.id) {
  //       const done = !el.done;
  //       el.done = done;
  //       return el;
  //     } else {
  //       return el;
  //     }
  //   });
  //   this.setState({tasks: tasks});
  // };

  // deleteCompletedTasks = () => {
  //   let tasks = Object.values({...this.state.tasks});
  //   tasks = tasks.filter(task => !task.done);
  //   this.setState({tasks});
  // };

  // deleteAllTasks = () => this.setState({tasks: {}});

  // addNewTaskHandler = task => {
  //   const taskKey = this.tasksRef.push().key;
  //   const user = this.auth.currentUser;
  //   const userInfo = {
  //     uid: user.uid,
  //     name: user.displayName,
  //     avatar: user.photoURL
  //   };
  //   task['id'] = taskKey;
  //   task['checked'] = false;
  //   task['user'] = {...userInfo};
  //   this.tasksRef
  //     .child(user.uid)
  //     .child(taskKey)
  //     .set({
  //       id: task.id,
  //       user: task.user,
  //       title: task.title,
  //       checked: task.checked,
  //       description: task.description,
  //       startAt: new Date(task.startAt).getTime(),
  //       endAt: new Date(task.endAt).getTime(),
  //       createdAt: new Date().getTime()
  //     })
  //     .then(() => {})
  //     .catch(error => console.error(error));
  //   console.log('task', task);
  //   // let tasks = [...this.state.tasks];
  //   // tasks.push(task);
  //   // this.setState({tasks});
  // };

  // optionsClass = 'btn rounded-0 dropdown-item';

  // optionsClasses = [this.optionsClass, this.optionsClass];

  // handleOptionsClasses = () => {
  //   const data = {...this.state.tasks};
  //   const tasks = Object.values(data);
  //   if (tasks.length === 0) {
  //     this.optionsClasses = [
  //       this.optionsClass + ' disabled',
  //       this.optionsClass + ' disabled'
  //     ];
  //   } else {
  //     this.optionsClasses = [this.optionsClass, this.optionsClass];
  //     let completedCount = 0;
  //     tasks.map(task => {
  //       if (task.done) completedCount++;
  //     });
  //     if (completedCount <= 0) {
  //       this.optionsClasses[0] += ' disabled';
  //     }
  //   }

  //   return this.optionsClasses;
  // };

  // tasks = () => {
  //   const data = {...this.state.tasks};
  //   const tasks = Object.values(data);
  //   if (tasks.length === 0)
  //     return <p className='alert alert-warning'>no tasks yest</p>;
  //   return tasks.map(task => (
  //     <li key={task.id}>
  //       <Task
  //         id={task.id}
  //         title={task.title}
  //         date={task.date}
  //         done={task.done}
  //         expired={task.expired}
  //         funcs={{checked: () => this.doToggleCompleteTask(task)}}
  //       />
  //     </li>
  //   ));
  // };

  // render() {
  //   return (
  //     <React.Fragment>
  //       <div className='header'>
  //         <h1>ToDo List</h1>
  //         <div className='options' data-toggle='dropdown'>
  //           <i className='fa fa-angle-down' />
  //         </div>
  //         <div
  //           className='dropdown-menu dropdown-menu-right'
  //           aria-labelledby='navbarDropdown'
  //         >
  //           <a
  //             className={this.handleOptionsClasses()[0]}
  //             onClick={this.deleteCompletedTasks}
  //           >
  //             Delete Completed
  //           </a>
  //           <a
  //             className={this.handleOptionsClasses()[1]}
  //             onClick={this.deleteAllTasks}
  //           >
  //             Delete All
  //           </a>
  //         </div>

  //         <div
  //           className='options add'
  //           data-toggle='modal'
  //           data-target='#create_todo_modal'
  //         >
  //           <i className='fa fa-plus' />
  //         </div>
  //       </div>
  //       <div className='todo-list'>
  //         <ul>{this.tasks()}</ul>
  //       </div>
  //       <CreateTask clicked={this.addNewTaskHandler} />
  //     </React.Fragment>
  //   );
  // }


export default Todo;
