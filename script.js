document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const content = document.getElementById("content");
  const username = "WonTaek";
  const password = "password486";

  //   const [username, password] = { Wontaek, password486 };
  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");
  const IDEnter = document.getElementById("IDEnter");
  const PasswordEnter = document.getElementById("PasswordEnter");
  const HerosOfTheStorm = document.getElementById("HerosOfTheStorm");
  const MusicStart = document.getElementById("MusicStart");
  const MusicPause = document.getElementById("MusicPause");
  const please = document.getElementById("please");

  content.style.display = "none";

  loginButton.addEventListener("click", function () {
    // 로그인 버튼 클릭 시 로그인 창 사라지도록 설정

    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    //     if (enteredUsername === username && enteredPassword === password) {
    //       loginForm.style.display = "none";
    //       IDEnter.style.display = "none";
    //       PasswordEnter.style.display = "none";
    //       content.style.display = "block";
    //       HerosOfTheStorm.style.display = "none";
    //       please.style.display = "none";
    //     } else {
    //       alert("아이디 또는 비밀번호가 잘못되었습니다.");
    //     }
    //   });

    //코드를 간결하게 줄이기.

    if (enteredUsername === username && enteredPassword === password) {
      const elementsToHide = [
        loginForm,
        IDEnter,
        PasswordEnter,
        HerosOfTheStorm,
        please,
      ];
      elementsToHide.forEach((element) => (element.style.display = "none"));
      content.style.display = "block";
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  });

  //   logoutButton.addEventListener("click", function () {
  //     loginForm.style.display = "block";
  //     IDEnter.style.display = "block";
  //     PasswordEnter.style.display = "block";
  //     HerosOfTheStorm.style.display = "block";
  //     please.style.display = "block";
  //     content.style.display = "none";
  //   });

  logoutButton.addEventListener("click", function () {
    [loginForm, IDEnter, PasswordEnter, HerosOfTheStorm, please].forEach(
      (element) => {
        element.style.display = "block";
      }
    );
    content.style.display = "none";
  });

  //     taskList.innerHTML = ""; //문제 값을 다 지워버림.
  //     taskInput.value = ""; //문제 값을 다 지워버림.

  addTaskButton.addEventListener("click", function () {
    // 추가 버튼 클릭 시 To-Do 항목을 추가하는 코드
    // ...
  });

  const datetime = document.getElementById("datetime");

  // Function to display current date and time
  function displayDateTime() {
    // 현재 날짜와 시간을 가져옴
    const now = new Date();

    //현재 날짜와 시간을 문자열로 변환해줌 (로컬 시간 기준)
    const dateTimeString = now.toLocaleString();

    //HTML 에서 'datetime' 이라는 ID를 가진 element 를 찾아서 해당 날짜와 시간을 표시
    datetime.textContent = dateTimeString;
  }

  // Check for saved tasks in local storage 로컬 스토리지에서 'tasks' 라는 key에 저장된 데이터를 확인
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to save tasks to local storage 로컬스토리지에 'tasks' 키를 저장함.
  const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  };

  // Function to create a new task element
  //   const createTaskElement = (text, timestamp) => {
  //     const li = document.createElement("li");
  //     const deleteButton = document.createElement("button");

  //     deleteButton.innerText = "삭제";

  //     deleteButton.className = "delete-button";

  //     li.innerHTML = `<span>${text}</span>`;

  //     li.appendChild(deleteButton);

  //     const timestampSpan = document.createElement("span");
  //     timestampSpan.classList.add("timestamp");
  //     timestampSpan.textContent = timestamp;
  //     li.appendChild(timestampSpan);

  //     deleteButton.addEventListener("click", function () {
  //       const confirmed = confirm("Are you really going to delete it?");
  //       if (confirmed) {
  //         const index = savedTasks.findIndex(
  //           (task) => task.text === text && task.timestamp === timestamp
  //         );
  //         savedTasks.splice(index, 1);
  //         saveTasksToLocalStorage();
  //         taskList.removeChild(li);
  //       }
  //     });

  //     li.addEventListener("click", function () {
  //       li.classList.toggle("completed");
  //     });

  //     taskList.appendChild(li);
  //   };

  // Load tasks from local storage on page load
  savedTasks.forEach((task) => {
    createTaskElement(task.text, task.timestamp);
  });

  addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
      const timestamp = new Date().toLocaleString();
      savedTasks.push({ text: taskText, timestamp: timestamp });
      createTaskElement(taskText, timestamp);
      saveTasksToLocalStorage();
      taskInput.value = "";
    }
  });

  taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTaskButton.click();
    }
  });

  // Update date and time every second
  setInterval(displayDateTime, 1000);

  // Display current date and time on page load
  displayDateTime();
});

// Function to fetch weather data
function fetchWeather() {
  const apiKey = "0e434d72bf677ec938d40577525b5f9a"; // OpenWeatherMap API key
  const city = "PyeongTaek"; // Change this to the desired city
  const weatherDiv = document.getElementById("weather");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const weatherDescription = data.weather[0].description;

      weatherDiv.innerHTML = `현재 ${city} 날씨: ${weatherDescription}, 온도: ${temperature}°C , 습도:${humidity}% `;
    })
    .catch((error) => {
      console.log("날씨 정보를 불러오는 중 오류가 발생했습니다:", error);
      weatherDiv.innerHTML = "날씨 정보를 불러올 수 없습니다.";
    });
}

// Fetch weather when the page loads
fetchWeather();
// Update weather every 30 minutes (in milliseconds)
setInterval(fetchWeather, 30 * 60 * 1000);

const bgMusic = document.getElementById("bgMusic");

function playMusic() {
  bgMusic.play();
  MusicStart.style.display = "none";
  MusicPause.style.display = "block";
}

function pauseMusic() {
  bgMusic.pause();
  MusicStart.style.display = "block";
  MusicPause.style.display = "none";
}

function setVolume() {
  bgMusic.volume = document.getElementById("volumeControl").value;
}
MusicPause.style.display = "none";

function playSound() {
  let audio = document.getElementById("sound");
  audio.play();
}
