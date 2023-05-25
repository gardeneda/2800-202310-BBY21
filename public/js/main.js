let totalCalories;
//Exercise Feature Card data, fetches data from the database and displays it on the card
window.addEventListener("load", getExerciseData);
async function getExerciseData() {
    const response = await fetch("http://localhost:5050/main/exerciseData");
    const data = await response.json();
    const exerciseLog = data.exercise;

    //Get the current date for the day
    const today = new Date();
    const todaysLogs = exerciseLog.filter(log => {
      const logDate = new Date(log.date);
      return (
        logDate.getDate() === today.getDate() &&
        logDate.getMonth() === today.getMonth() &&
        logDate.getFullYear() === today.getFullYear()
      );
    });
    //Display the data on the card 
    if (todaysLogs.length > 0) {
      let totalTime = 0;
      totalCalories = 0;
  
      todaysLogs.forEach(log => {
        totalTime += Number(log.duration);
        totalCalories += parseInt(log.caloriesBurned);
      });
      document.getElementById("exerciseCalories").innerHTML = totalCalories;
      document.getElementById("time").innerHTML = totalTime + (totalTime === 1 ? " hour" : " hours");
      document.getElementById("calories").innerHTML = totalCalories;
    } else {
      document.getElementById("exerciseCalories").innerHTML = 0;
      document.getElementById("time").innerHTML = "0";
      document.getElementById("calories").innerHTML = "0 hours";
    }
  }

// Display circular progress bar
let circularProgress = document.querySelector(".circular-progress");
let progressValue = document.querySelector(".progress-value");
let calorieRequireElement = document.querySelector("#calorie-require");
let remainingCal = document.querySelector(".remainingCalories").textContent;

let progressStartValue = 0;
let progressEndValue = 0; // 초기값 설정

// Step 1: Get calorieRequire value and check if it's valid
let calorieRequire = calorieRequireElement.textContent;

// Step 2: Convert calorieRequire to a valid number format
progressEndValue = parseFloat(calorieRequire);
progressValue.textContent = `${remainingCal} Remaining`;
circularProgress.style.background = `conic-gradient(#F9858b ${progressEndValue*0.18}deg, #efefef 0deg)`;




  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // Button Animation and play Feature 
  var spinTimeout;
  var musicTimeout;
  var audio = document.getElementById("audio");
  var audioUnlocked = false;
  
  //Function to handle audio on mobile devices
  function handleInteraction(isMobile) {
    if (!audioUnlocked) {
      // Unmute the audio for subsequent plays
      audio.muted = false;
      audioUnlocked = true;
    }
    startSpin(isMobile);
  }
  //Main function, spins and plays the audio after 3 second press
  function startSpin(isMobile) {
    spinTimeout = setTimeout(function() {
      addSpinClass();
      playSound();
    }, 3000);
  }
  //Stops the spin and audio
  function stopSpin() {
    clearTimeout(spinTimeout);
    clearTimeout(musicTimeout);
    removeSpinClass();
    stopSound();
  }
  //Adds spin class to button
  function addSpinClass() {
    document.getElementById("chatButton").classList.add("spin");
  }
  //Removes spin class from button
  function removeSpinClass() {
    document.getElementById("chatButton").classList.remove("spin");
  }
  //Plays the audio
  function playSound() {
    musicTimeout = setTimeout(function() {
      audio.play();
    }, 500); // Adjust this delay if needed
  }
  //Stops the audio
  function stopSound() {
    audio.pause();
    audio.currentTime = 0;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////