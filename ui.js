// Import modules
import { formatDistanceToNow } from 'date-fns';
import { storageAndData } from './storage-data';

// CREATE UI CLASS

class UI {
  constructor() {
    // QUERY SELECTORS
    this.menuToggle = document.querySelector('.menu-toggle');
    this.closeSideMenuBtn = document.querySelector('.close-btn');
    this.main = document.querySelector('#main');
    this.overlay = document.querySelector('.overlay');
    this.header = document.querySelector('.header');
    this.aiButton = document.querySelectorAll('button')[1];
    this.currentListContainer = document.querySelector(
      '.current-list-container'
    );
    this.listWrapper = document.querySelector(
      '.current-list-container-wrapper'
    );
    this.emptyMessageContainer = document.querySelector(
      '.empty-message-container'
    );
    this.allLists = document.querySelector('.lists');
    this.currentListName = document.querySelector('.list-name');
    this.newListForm = document.querySelector('.new-list-form');
    this.newListFormAlert = document.querySelector('.list-alert')
    this.newListInput = document.querySelector('.new-list-input');
    this.sortDropdown = document.querySelector('#sort');
    this.sortContainer = document.querySelector('.sort-container');
    this.searchInput = document.querySelector('.search-txt');
    this.searchBox = document.querySelector('.search-box');
    this.magGlassBtn = document.querySelector('.fa-search');
    // query selectors for modal new task
    this.newTaskModal = document.querySelector('#modal');
    this.taskTitle = document.querySelector('#task-title');
    this.taskNotes = document.querySelector('#task-notes');
    this.taskDate = document.querySelector('#task-date');
    this.taskPriority = document.querySelector('#task-priority');
    this.submitTaskBtn = document.querySelector('#submit-task-btn');
    this.priorityRadio = Array.from(document.querySelectorAll('.radio'));
    // query selectors for buttons at bottom of screen
    this.clearCompleteBtn = document.querySelector('.clear-complete-btn');
    this.deleteListBtn = document.querySelector('.delete-list-btn');
    // modal btn delete list
    this.deleteListConfirmBtn = document.querySelector(
      '.confirm-delete-list-btn'
    );
    // query selectors for edit modal
    this.taskTitleEdit = document.querySelector('#task-title-edit');
    this.taskNotesEdit = document.querySelector('#task-notes-edit');
    this.taskDateEdit = document.querySelector('#task-date-edit');
    this.taskPriorityEdit = document.querySelector('#task-priority-edit');
    this.submitTaskBtnEdit = document.querySelector('#submit-task-btn-edit');
    this.priorityRadioEdit = Array.from(
      document.querySelectorAll('.radio-edit')
    );

    // query selectors for edit list name modal
    this.listNameModalInput = document.querySelector('#list-name-modal-input');
    this.editListModalSubmitBtn = document.querySelector(
      '#submit-edit-list-btn'
    );
    this.editListNameBtn = document.querySelector('.edit-list-name-btn');
    this.editListNameForm = document.querySelector('.edit-list-name-form');

    // query selectors forms
    this.newTaskForm = document.querySelector('.new-task-form');
    this.editTaskForm = document.querySelector('.edit-task-form');
  }

  // FUNCTION TO OPEN AND CLOSE SIDE MENU
  openAndCloseSideMenu() {
    document.body.classList.toggle('open');
  }

  // FUNCTION TO RENDER TASKS TO UI
  renderTasks(tasks) {
    // clear element before rendering
    this.clearElement(this.currentListContainer);

    // set list name
    this.currentListName.textContent = storageAndData.findSelectedList().name;

    // check if there are any tasks
    if (tasks.length === 0) {
      // if no tasks show empty tasks message
      this.currentListContainer.innerHTML = `<div class="empty-message-container" data-empty-message-container><img
      src="https://img.icons8.com/ios/100/000000/empty-box.png" />
      <p data-message-paragraph>No tasks created<br> use the plus to create a new task</p>
      </div>`;
    } else {
      // get tasks from list and sort
      const sortedTasks = storageAndData.sortTasks(tasks);

      // loop through tasks
      sortedTasks.forEach((task) => {
        // create task-card element
        const taskCard = document.createElement('div');

        // add id task id in dataset to task card
        taskCard.dataset.id = task.id;

        //check priority level and apply appropriate classes
        if (task.priority === '1') {
          taskCard.className = 'task-card card top-priority';
        } else if (task.priority === '2') {
          taskCard.className = 'task-card card mid-priority';
        } else {
          taskCard.className = 'task-card card low-priority';
        }

        // set innerHtml using values from task
        taskCard.innerHTML = `
      <div class="task-card-header text-center mt-3">${task.name}</div>
      <a href=""class="editBtn"><i class="fas fa-edit text-muted" data-toggle="modal"
      data-target="#editModal"></i></a>
          <p class="date-deadline text-muted text-center">Due ${formatDistanceToNow(
            new Date(task.date),
            { addSuffix: true }
          )}</p>
          <div class="card-body text-muted pt-0 text-center task-notes">
            ${task.notes}
          </div>
          <div class="task-card-footer mb-1">
            <div class="complete-label">mark as complete:</div>
            <div class="task-card-btns-container">
              <label class="checkbox-container">
                <input class="checkbox" type="checkbox">
                <span class="checkmark"></span>
              </label>
              <a href=""class="deleteBtn"><i class="fas fa-trash-alt text-muted"></i></a>
            </div>
          </div>
      `;

        // Select checkbox
        const checkbox = taskCard.querySelector('.checkbox');

        // Check if task is complete
        if (task.completed === true) {
          // If task complete, check box add completed class to task card
          checkbox.checked = true;
          taskCard.classList.add('completed');
        }

        // append task card to container
        this.currentListContainer.appendChild(taskCard);
      });
    }
  }

  // FUNCTION TO RENDER LISTS
  renderLists() {
    // clear element before rendering
    this.clearElement(this.allLists);
    // check if there are any lists
    if (storageAndData.lists.length === 0) {
      // if no lists yet made show empty lists message
      this.currentListContainer.innerHTML = `<div class="empty-message-container" data-empty-message-container><img
      src="https://img.icons8.com/ios/100/000000/empty-box.png" />
      <p data-message-paragraph>No lists created.<br> To get started create a new list in the side menu</p>
      </div>`;
    } else {
      // loop through each list
      storageAndData.lists.forEach((list) => {
        // create list element
        const li = document.createElement('li');
        // if current list id = selectedList id highlight list
        if (storageAndData.selectedListId === list.id) {
          li.classList.add('active');
        }
        // set list text
        li.textContent = list.name;

        // add list id as data set
        li.dataset.id = list.id;
        //append list item to container
        this.allLists.appendChild(li);
      });
    }
  }
  // Function to show list deleted message
  showListDeletedMessage() {
    this.currentListContainer.innerHTML = `<div class="empty-message-container" data-empty-message-container><img
      src="https://img.icons8.com/ios/100/000000/empty-box.png" />
      <p data-message-paragraph>List Deleted.<br></p>
      </div>`;
  }
  // Function to clear element contents
  clearElement(element) {
    element.innerHTML = '';
  }
  
  // Function to show alerts
  showAlert(message, color) {
    // Create Alert Element
    const alert = document.createElement('div');
    // Add Alert Message
    alert.textContent = message;
    // Set Alert appropriate classes
    if (color === 'green') {
      alert.className =
        'alert alert-success alert-div text-center p-1 fade in out';
    } else if (color === 'red') {
      alert.className = 'alert alert-danger alert-div text-center p-1 fade in';
    } else {
      alert.className = 'alert alert-warning alert-div text-center p-1 fade in';
    }
    // Append alert
    this.listWrapper.appendChild(alert);
    // use timeout function to fade in the alert
    setTimeout(function () {
      alert.classList.add('show');
    }, 100);
    // use timeout function to fade out the alert
    setTimeout(function () {
      alert.classList.remove('show');
    }, 3000);
    // and then delete the alert
    setTimeout(function () {
      ui.listWrapper.removeChild(alert);
    }, 4000);
  }
  shrinkCard(card) {
    card.classList.add('shrink');
  }
  populateEditModal(id) {
    // Get Current Task
    const currentTask = storageAndData
      .findSelectedList()
      .tasks.find((task) => task.id === id);
    // Set Modal Values to those saved in task
    this.taskTitleEdit.value = currentTask.name;
    this.taskDateEdit.value = currentTask.date;
    this.taskNotesEdit.value = currentTask.notes;
    // set radio value
    this.priorityRadioEdit.forEach((radio) => {
      if (radio.value === currentTask.priority) {
        radio.checked = true;
      }
    });
  }
  // function to add form validation classes edit modal
  addFormValidationClassesEditTask() {
    if (this.taskTitleEdit.value === '') {
      this.taskTitleEdit.classList.add('is-invalid');
    }
    if (this.taskNotesEdit.value === '') {
      this.taskNotesEdit.classList.add('is-invalid');
    }
    if (this.taskDateEdit.value === '') {
      this.taskDateEdit.classList.add('is-invalid');
    }
  }
  // function to add form validation classes new task modal
  addFormValidationClassesNewTask() {
    if (this.taskTitle.value === '') {
      this.taskTitle.classList.add('is-invalid');
    }
    if (this.taskNotes.value === '') {
      this.taskNotes.classList.add('is-invalid');
    }
    if (this.taskDate.value === '') {
      this.taskDate.classList.add('is-invalid');
    }
  }

  // function to remove form validation classes
  removeFormValidationClasses() {
    this.taskTitle.classList.remove('is-invalid');
    this.taskNotes.classList.remove('is-invalid');
    this.taskDate.classList.remove('is-invalid');
    this.taskTitleEdit.classList.remove('is-invalid');
    this.taskNotesEdit.classList.remove('is-invalid');
    this.taskDateEdit.classList.remove('is-invalid');
  }
}

// EXPORT UI
export const ui = new UI();