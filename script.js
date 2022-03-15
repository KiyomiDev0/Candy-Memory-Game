// Seclet Boxes Container
let container = document.querySelector(".container"),
// Select All Boxes
boxes = Array.from(document.querySelectorAll(".container .box")),
// Create Array From All backs
allBack = Array.from(document.querySelectorAll(".container .back")),
countCorrect  = 0,
countWrongs = 0,
// Audios
success = new Audio("success.mp4"),
fail = new Audio("fail.mp4"),
// Storing Clicked Boxes in Array
boxesSrcs = [],
// Storing Clicked Images in Array
imgsSrcs = [],
// Select Play Again Button
playAgain = document.querySelector(".play-again"),
correct = document.querySelector(".correct-count");

random();

boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    box.classList.add("flip");
    // Add The Clicked Box to the Array
    boxesSrcs.push(box);
    // Get The Image from Clicked Box & Add it to the Array
    imgsSrcs.push(box.querySelector('.back img').src)
    // if a box clicked stop clicking on it
    if(boxesSrcs.length == 1) {
      boxesSrcs[0].classList.add("pointerfreeze")
    }
    // If There's Two Selected Boxes
    else if (boxesSrcs.length == 2 ) {
      container.classList.add("pointerfreeze")
      // Stop Clicking Function
      removeFreeze(container)
      // If The Two Images are The Same
      if (imgsSrcs[0] === imgsSrcs[1]) {
        // If The Clicked Boxes Contain flip Class then Stop Clicking on it
        boxesSrcs.forEach(box => box.classList.contains("flip") ? box.classList.add("pointerfreeze") : false);
        countCorrect++;
        countCorrectFn();
        imgsSrcs.length = 0;
        ifAllCorrect();
      } else {
        boxesSrcs[0].classList.remove("pointerfreeze")
        countWrongs++;
        countWrongsFn();
      }
    }
    boxesSrcs.length == 2 ? boxesSrcs.length = 0 : false;
  })

})


// Stop Clicking Function
function removeFreeze(container) {
  setTimeout(() => {
    container.classList.remove("pointerfreeze")
  }, 1500);
}

// Remove flip Class
function removeFlip(box) {
  setTimeout(() => {
    box.classList.remove("flip")
  }, 1300);
}

// Count Correct Attempts
function countCorrectFn() {
  setTimeout(() => {
    correct.innerHTML = `${countCorrect} / ${boxes.length / 2}`
    success.play();
  }, 1000);
}

// Count Wrong Tries
function countWrongsFn() {
  setTimeout(() => {
    wrongTries.innerText = countWrongs;
  }, 1200);
  boxesSrcs.forEach((box) => {
    setTimeout(() => {
      fail.play();
    }, 1200);
    removeFlip(box);
    imgsSrcs.length = 0;
  })
}

// Ask to Play Again
function playAgainFn(play) {
  setTimeout(() => {
    play.classList.add("show")
  }, 4500);
  boxes.forEach((box) => {
    box.classList.remove("pointerfreeze")
  })
}


// If Play Again Clicked
playAgain.addEventListener("click", (e) => {
  playAgain.classList.remove("show")
  boxes.forEach((box) => {
    box.classList.remove("flip")
  })
  countCorrect = 0;
  countWrongs = 0;
  correct.innerHTML = `${countCorrect} / ${boxes.length / 2}`;
  wrongTries.innerText = countWrongs;
  random();
})


// Generate Random Confetti
let randomConfetti = () => {
  let cont = document.createElement("div");
  congrats.append(cont);
  let createCongrats = setInterval(() => {
  let confetti = document.createElement("div");
  confetti.classList.add("confetti");
  confetti.innerHTML = `<img src="imgs/confetti.png">`;
  confetti.style.left = `${Math.random() * 100}%`;
  confetti.style.animationDuration = `${(Math.random() + 0.5) * 1.5}s`;
  cont.append(confetti);
  }, 50);

  setTimeout(() => {
    clearInterval(createCongrats);
  }, 3000);

  setTimeout(() => {
    cont.remove();
  }, 5000);
}


// Chack If All Correct
function ifAllCorrect() {
  if (countCorrect == boxes.length / 2) {
    setTimeout(() => {
      randomConfetti()
    }, 1500);
    playAgainFn(playAgain)
  }
}

// Generate Random Images
function random() {
  let orderedArr = [];
  for (let i = 1; i <= 10; i++) {
    orderedArr.push(`<img src="imgs/${i}.png" alt="candy-img">`)
  }
  function rand(max) {
    return Math.floor(Math.random() * max);
  }
  
  let ranomizedArr = [];
  for (let i = 0; i < 20; i++) {
    let random = rand(orderedArr.length);
    ranomizedArr[i] = orderedArr[random];
    orderedArr.splice(random, 1);
  }
  for (let i = 0; i < allBack.length; i++) {
    allBack[i].innerHTML = ranomizedArr[i];
  }
}
