const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const incompleteTaskList = document.getElementById('incomplete-tasks');
const completedTaskList = document.getElementById('completed-tasks');

const createTaskElement = function (taskText) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const label = document.createElement('label');
  label.innerText = taskText;
  label.className = 'task-text';

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task-text';

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  const deleteIcon = document.createElement('img');
  deleteIcon.src = './remove.svg';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.appendChild(deleteIcon);

  const listItem = document.createElement('li');
  listItem.append(checkbox, label, editInput, editButton, deleteButton);
  return listItem;
};

const toggleEditMode = function (listItem) {
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('edit-mode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

const deleteTask = function (listItem) {
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const setTaskCompleted = function (listItem, isCompleted) {
  const targetList = isCompleted ? completedTaskList : incompleteTaskList;
  targetList.appendChild(listItem);
};

const bindTaskEvents = function (listItem) {
  const checkbox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.onclick = () => toggleEditMode(listItem);
  deleteButton.onclick = () => deleteTask(listItem);
  checkbox.onchange = () => setTaskCompleted(listItem, checkbox.checked);
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createTaskElement(newTaskInput.value);

  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem);

  newTaskInput.value = '';
};

addTaskButton.addEventListener('click', addTask);

for (const listItem of [
  ...incompleteTaskList.children,
  ...completedTaskList.children,
]) {
  bindTaskEvents(listItem);
}
