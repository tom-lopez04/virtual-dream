// script.js
const startButton = document.getElementById('startButton');
const box = document.getElementById('box');
const result = document.getElementById('result');

let startTime;
let timeoutId;

startButton.addEventListener('click', startGame);
box.addEventListener('click', stopGame);

function startGame() {
  result.textContent = '';
  box.style.backgroundColor = 'red'; // Start as red
  box.style.display = 'block'; // Show the box
  startButton.disabled = true;

  const randomDelay = Math.random() * 3000 + 2000; // Random delay between 2-5 seconds

  timeoutId = setTimeout(() => {
    box.style.backgroundColor = 'green'; // Turn green after delay
    startTime = Date.now(); // Record the start time
  }, randomDelay);
} 

function stopGame() {
  if (!startTime) {
     // Too early: show feedback image for clicking too soon
     feedback.src = "images/zaf-fail.png"; // Replace with your "too early" image path
     feedback.style.width="600px";
     feedback.style.height="338px";
     feedback.style.paddingTop = "20px";
     feedback.style.display = 'block'; // Show feedback image
     result.textContent = "Too soon! You got counter hit and you didn't break the throw! Try again.";
     resetGame();
     return;
   }
 
   const reactionTime = Date.now() - startTime;
 
   if (reactionTime <= 333) {
     // Fast reaction: show feedback image for fast reactions
     feedback.src = 'images/zaf-success.png'; // Replace with your fast reaction image path
     feedback.style.width="600px";
     feedback.style.height="338px";
     feedback.style.paddingTop = "20px";
     result.textContent = `Great! You broke the throw and punished him. Your reaction time was: ${reactionTime} ms. (or ${reactionTime*60/1000} frames at 60fps)`;
   } else {
     // Slow reaction: show feedback image for slower reactions
     feedback.src = 'images/zaf-fail.png'; // Replace with your slow reaction image path
     feedback.style.width="600px";
     feedback.style.height="338px";
     feedback.style.paddingTop = "20px";
     result.textContent = `Oh no... you were too slow and you missed the window! There goes your HP!
     Your reaction time was: ${reactionTime} ms. (or ${reactionTime*60/1000} frames at 60fps)`;
   }
 
   feedback.style.display = 'block'; // Show feedback image
   resetGame();
 }

function resetGame() {
  startTime = null;
  startButton.disabled = false;
  box.style.display = 'none'; // Hide the box
  clearTimeout(timeoutId); // Clear timeout in case it hasn't triggered
}
