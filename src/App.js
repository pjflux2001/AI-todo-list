// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div className="App">
  <div id="main">
    <div className="overlay"></div>
    <header>
      <nav className="navbar py-3">
        <p className="brand text-muted m-0">
          AI-ToDo-List
        </p>
        <button className="navbar-toggler menu-toggle text-muted" type="button">
        <i className="fas fa-bars slide-btn" data-slide-button></i>
        </button>
      </nav>
      <div className="sort-container py-2">
        <div className="d-flex">
          <p className="list-name text-capitalize lead p-0 m-0"></p>
          <i className="fas fa-pencil-alt edit-list-name-btn align-self-center ml-2" data-toggle="modal"
            data-target="#editListNameModal"></i>
        </div>
        <button onClick={() => alert("AI sorting ...")}>Let AI sort your tasks efficiently!</button>
        <div>
          <label className="m-0 p-0" htmlFor="sort">Sort by:</label>
          <select name="sort" id="sort" className="sort-dropdown">
            <option value="priority">Priority</option>
            <option value="deadline">Deadline</option>
            <option value="date">Date Created</option>
            <option value="a-z">A-Z</option>
          </select>
        </div>
      </div>
    </header>
    <div className="current-list-container-wrapper">
      <a href="#" className="new-task-btn" data-toggle="modal" data-target="#modal">
      <i className="fas fa-plus text-muted"></i>
      </a>
      <div className="search-box border-muted">
        <input className="search-txt" type="text" placeholder="Type to Search"/>
        <a className="search-btn" href="#">
        <i className="fas fa-search text-muted"></i>
        </a>
      </div>
      <div className="current-list-container">
        <div className="empty-message-container" data-empty-message-container>
          <img src='https://img.icons8.com/ios/100/000000/empty-box.png' />
          <p data-message-paragraph>No lists created.<br/> To get started Create a new list in the side menu</p>
        </div>
      </div>
    </div>
    <div className="list-btn-container">
      <a href="#" className="mr-2 text-muted clear-complete-btn">Clear Completed</a>
      <a href="#" className="text-muted border-left pl-2 delete-list-btn " data-toggle="modal"
        data-target="#deleteListModal">Delete List</a>
    </div>
  </div>
  <div className="side-menu text-capitalize">
    <div className="close-btn text-muted">
      <i className="fas fa-times"></i>
    </div>
    <div className="container mt-5 list-container">
      <h4>My Lists</h4>
      <ul className="lists">
      </ul>
      <form className="new-list-form">
        <div className="form-group">
          <input className="new-list-input w-75" type="text" placeholder="New list name"/>
          <button className="new-list-btn text-muted" type="submit"><i className="fas fa-plus new-list-btn"></i></button>
        </div>
        <small className="list-alert text-danger d-none">
        Please enter list name
        </small>
      </form>
    </div>
  </div>
  <div className="modal fade" id="modal">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">New Task</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form className="new-task-form">
            <div className="form-group">
              <input className="form-control" type="text" name="task-title" placeholder="Task Title" id="task-title"
                maxLength="15"/>
              <div className="invalid-feedback">
                Please complete all fields
              </div>
            </div>
            <div className="form-group form-notes">
              <textarea className="form-control" name="notes" id="task-notes" cols="30" rows="3"
                placeholder="Notes"></textarea>
              <div className="invalid-feedback">
                Please complete all fields
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="task-date" className="deadline-label">Deadline Date</label>
              <input className="form-control" type="date" name="date" id="task-date"/>
              <div className="invalid-feedback">
                Please complete all fields
              </div>
            </div>
            <div className="from-group form-radio">
              <label className="priority-label">Choose priority level:</label>
              <div className="form-check">
                <input className="form-check-input radio" type="radio" name="priority" id="top-priority" value="1"/> // checked missing
                <label className="ml-2 form-check-label border-red" htmlFor="top-priority">
                Top Priority
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input radio" type="radio" name="priority" id="mid-priority" value="2"/>
                <label className="ml-2 form-check-label border-yellow" htmlFor="mid-priority">
                Mid Priority
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input radio" type="radio" name="priority" id="low-priority" value="3"/>
                <label className="ml-2 form-check-label border-green" htmlFor="low-priority">
                Low Priority
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-success commit-task-btn" id="submit-task-btn">Submit</button>
        </div>
      </div>
    </div>
  </div>
  <div className="modal fade" id="editModal">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Task</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form className="edit-task-form">
            <div className="form-group">
              <input className="form-control" type="text" name="task-title" placeholder="Task Title" id="task-title-edit"
                maxLength="15"/>
              <div className="invalid-feedback">
                Please complete all fields
              </div>
            </div>
            <div className="form-group form-notes">
              <textarea className="form-control form-notes" name="notes" id="task-notes-edit" cols="30" rows="3"
                placeholder="Notes"></textarea>
              <div className="invalid-feedback">
                Please complete all fields
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="task-date-edit" className="deadline-label">Deadline Date</label>
              <input className="form-control" type="date" name="date" id="task-date-edit"/>
            </div>
            <div className="from-group form-radio">
              <label className="priority-label">Choose priority level:</label>
              <div className="form-check">
                <input className="form-check-input radio-edit" type="radio" name="priority" id="top-priority-edit"
                  value="1"/>
                <label className="ml-2 form-check-label border-red" htmlFor="top-priority-edit">
                Top Priority
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input radio-edit" type="radio" name="priority" id="mid-priority-edit"
                  value="2"/>
                <label className="ml-2 form-check-label border-yellow" htmlFor="mid-priority-edit">
                Mid Priority
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input radio-edit" type="radio" name="priority" id="low-priority-edit"
                  value="3"/>
                <label className="ml-2 form-check-label border-green" htmlFor="low-priority-edit">
                Low Priority
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-success commit-task-btn" id="submit-task-btn-edit">Submit</button>
        </div>
      </div>
    </div>
  </div>
  <div className="modal fade" id="deleteListModal" data-backdrop="static" data-keyboard="false" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">Delete List</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          Are you sure you want to delete this list?
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-success confirm-delete-list-btn" data-dismiss="modal">Confirm</button>
        </div>
      </div>
    </div>
  </div>
  <div className="modal fade" id="editListNameModal">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit List Name</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form className="edit-list-name-form">
            <div className="form-group">
              <input className="form-control" type="text" placeholder="List Name" id="list-name-modal-input"/>
              <div className="invalid-feedback">
                List name cannot be empty
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-success commit-task-btn" id="submit-edit-list-btn">Submit</button>
        </div>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"
    integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
    integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
    crossOrigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
    integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s"
    crossOrigin="anonymous"></script>
  <script src="./main.js" type="text/javascript"></script>
  <script>
    // Get the current year for the copyright
    $('#year').text(new Date().getFullYear());
    
  </script>
</div>
  );
}

export default App;
