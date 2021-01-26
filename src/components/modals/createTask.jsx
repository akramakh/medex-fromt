import React, {Component} from 'react';

class CreateTask extends Component {
  state = {
    newTask: {
      id: null,
      title: null,
      description: null,
      date: null
    }
  };

  newTaskHandler = task => {
    const target = task.target.name;
    let newTask = {...this.state.newTask};
    newTask[target] = task.target.value;
    this.setState({newTask});
  };

  render() {
    return (
      <div id='create_todo_modal' className='modal fade' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content w-auto'>
            <form>
              <div className='modal-header'>
                <h4 className='modal-title'>Add ToDo</h4>
                <button type='button' className='close' data-dismiss='modal'>
                  <i className='fa fa-close' />
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='title' className='d-block text-left'>
                    Id
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='title'
                    name='id'
                    onChange={this.newTaskHandler}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='title' className='d-block text-left'>
                    Title
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='title'
                    name='title'
                    onChange={this.newTaskHandler}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='description' className='d-block text-left'>
                    Description
                  </label>
                  <textarea
                    className='form-control'
                    id='description'
                    name='description'
                    rows='5'
                    onChange={this.newTaskHandler}
                  />
                </div>
                <div className='input-wrrap'>
                  <div className='form-group'>
                    <label htmlFor='startAt' className='d-block text-left'>
                      Start Date
                    </label>
                    <input
                      type='datetime-local'
                      className='form-control'
                      id='startAt'
                      name='startAt'
                      onChange={this.newTaskHandler}
                    />
                  </div>
                  <div className='input-wrrap'>
                    <div className='form-group'>
                      <label htmlFor='endAt' className='d-block text-left'>
                        End Date
                      </label>
                      <input
                        type='datetime-local'
                        className='form-control'
                        id='endAt'
                        name='endAt'
                        onChange={this.newTaskHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-primary'
                  id='add_language'
                  onClick={() => this.props.clicked(this.state.newTask)}
                >
                  <i className='fa fa-plus' /> Add
                </button>
                <button
                  type='button'
                  className='btn btn-defualt'
                  data-dismiss='modal'
                >
                  <i className='fa fa-remove' /> Cancle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTask;
