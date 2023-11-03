const sortableList = document.getElementById("taskList");
new Sortable(sortableList, {
  animation: 150, // 애니메이션 지연 시간
  onEnd: (evt) => {
    // 이벤트 핸들러: 드래그 앤 드롭 종료 시의 동작
    const items = sortableList.getElementsByTagName("li");
    // 여기서 items의 순서가 변경되었음
    console.log("순서가 변경된 아이템:", items);
  },
});

// function editTask(item) {
//   const confirmEdit = confirm("정말 수정하시겠습니까?");

//   if (confirmEdit) {
//     const previousText = item.textContent;
//     const newText = prompt("수정할 내용을 입력하세요:", previousText);

//     if (newText !== null) {
//       item.textContent = newText;
//     }
//   }
// }

// 버튼을 동적으로 생성하여 각 리스트 아이템에 추가
// const listItems = document
//   .getElementById("taskList")
//   .getElementsByTagName("li");

// Array.from(listItems).forEach((item) => {
//   const editButton = document.createElement("button");
//   editButton.textContent = "수정";
//   editButton.onclick = function () {
//     editTask(item);
//   };

//   item.appendChild(editButton);
// });

const editTaskElement = (li, timestamp) => {
  const editButton = document.createElement("button");
  editButton.innerText = "수정";

  editButton.addEventListener("click", function () {
    const confirmed = confirm("정말 수정하시겠습니까?");
    if (confirmed) {
      const textElement = li.querySelector("span");
      const previousText = textElement.textContent;
      const newText = prompt("수정할 내용을 입력하세요:", previousText);
      if (newText !== null) {
        textElement.textContent = newText;
        const index = savedTasks.findIndex(
          (task) => task.text === previousText && task.timestamp === timestamp
        );
        savedTasks[index].text = newText;
        saveTasksToLocalStorage(); // 저장 후 로컬 스토리지에 업데이트
      }
    }
  });

  editButton.classList.add("edit-button");
  li.appendChild(editButton);
};

// 로컬 스토리지에 저장하는 함수
const saveTasksToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
};

// 저장된 데이터 로드하는 함수
const loadTasksFromLocalStorage = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return savedTasks;
};

// Load tasks from local storage on page load
let savedTasks = loadTasksFromLocalStorage();

const createTaskElement = (text, timestamp) => {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");

  deleteButton.innerText = "삭제";
  deleteButton.className = "delete-button";

  deleteButton.addEventListener("click", function () {
    const confirmed = confirm("Are you really going to delete it?");
    if (confirmed) {
      const index = savedTasks.findIndex(
        (task) => task.text === text && task.timestamp === timestamp
      );
      savedTasks.splice(index, 1);
      saveTasksToLocalStorage();
      taskList.removeChild(li);
    }
  });

  li.innerHTML = `<span>${text}</span>`;
  li.appendChild(deleteButton);

  const timestampSpan = document.createElement("span");
  timestampSpan.classList.add("timestamp");
  timestampSpan.textContent = timestamp;
  li.appendChild(timestampSpan);

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  editTaskElement(li, timestamp); // Add edit button

  taskList.appendChild(li);
};
