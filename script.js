const textCollection = {
  1: "Ask a question publicly on 170+ Stack Exchange sites or privately using Stack Overflow for Teams.",
  2: "Upvoting helps exceptional content rise to the top and bring awareness to useful responses.",
  3: "Answer a question to share your knowledge with the world or in private with your team.",
  4: "Tags help make information searchable and find answers that are important to you.",
  5: "Accept the answer which solved your problem to let others benefit from the valuable information.",
  6: "Our reputation system rewards both the new & experienced based on contribution and activity.",
};

let currNum = 0;
let prevNum = 0;

const intervalID = window.setInterval(rotate, 2000);

function rotate() {
  //set currNum between 1 and 6
  currNum += 1;
  prevNum = currNum - 1;
  if (currNum === 7) {
    currNum = 1;
    prevNum = 6;
  }
  renderShadow(currNum, prevNum);
  renderText(currNum);
  renderImg(currNum);
}

function renderShadow(currNum, prevNum) {
  //add class to new div
  const selection = document.querySelector(`[src="imgs/q-icon-${currNum}.png"]`)
    .parentElement;
  selection.classList.add("selected");
  //remove class from previously selected div, unless first time
  if (prevNum > 0) {
    const previousDiv = document.querySelector(
      `[src="imgs/q-icon-${prevNum}.png"]`
    ).parentElement;
    previousDiv.classList.remove("selected");
  }
}

function renderText(currNum) {
  const par = document.querySelector("#q-description");
  par.innerText = textCollection[currNum];
}

function renderImg(currNum) {
  const img = document.querySelector(".img img");
  img.setAttribute("src", `imgs/q-img-${currNum}.png`);
}

//make animation stop on click
const animCont = document.querySelector(".animation-container");
animCont.addEventListener("click", function (evt) {
  //stop animation
  if (
    evt.target.classList.contains("option") ||
    evt.target.tagName === "IMG" ||
    evt.target.tagName === "P"
  ) {
    clearInterval(intervalID);
    makeActive(evt.target);
    let src;
    if (evt.target.classList.contains("option")) {
      let srcImg = evt.target.firstChild.nextElementSibling;
      src = srcImg.getAttribute("src");
    } else if (evt.target.tagName === "P") {
      let srcImg = evt.target.parentElement.firstChild.nextElementSibling;
      src = srcImg.getAttribute("src");
    } else {
      src = evt.target.getAttribute("src");
    }
    let num = getNum(src);
    renderText(num);
    renderImg(num);
  }
});

function makeActive(target) {
  removePriorShadow();
  if (target.classList.contains("option")) {
    target.classList.add("selected");
  } else if (target.tagName === "IMG" || target.tagName === "P") {
    target.parentElement.classList.add("selected");
  }
}

function removePriorShadow() {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach((option) => option.classList.remove("selected"));
}

//imgs/q-icon-6.png
function getNum(src) {
  return src.split(".")[0].split("-")[2];
}
