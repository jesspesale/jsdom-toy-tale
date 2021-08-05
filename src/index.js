let addToy = false;
const createToy = document.querySelector(".submit")
const form = document.querySelector(".add-toy-form")



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
});

function clickLikeButton() {
  const likeButtons = document.getElementsByClassName("like-btn")
  Array.from(likeButtons).forEach(button => button.addEventListener("click", (event)=> {
    event.preventDefault()
    let x = event.target.parentElement.querySelector("p").innerText
    x = parseInt(x) + 1
    let toyId = event.target.parentElement.dataset.id
    likeToy(x, toyId)
    event.target.previousElementSibling.innerText = `${x} likes`
  }))
}

function likeToy(x, toyId) {
  console.log(x)
  let likedToy = `http://localhost:3000/toys/${toyId}`
  fetch(likedToy, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": x
    })
  }) 
  .then(response => response.json())
  .then(data => displayToy(data))
  }

function getToys() {
  const toyUrl = "http://localhost:3000/toys"
    fetch(toyUrl)
      .then(response => response.json())
      .then(data => {
        data.forEach(toy => displayToy(toy)) 
        clickLikeButton()
      } ) 
  };

function displayToy(toy) {
  const toyCollection = document.querySelector("#toy-collection")
  let div = document.createElement('div')
  div.dataset.id = toy.id 
  div.classList.add("card")

  let h2 = document.createElement("h2")
  h2.innerText = toy.name

  let image = document.createElement("img")
  image.className = "toy-avatar"
  image.src = toy.image

  let par = document.createElement("p")
  par.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.classList.add("like-btn")
  btn.innerText = "like"

  div.append(h2, image, par, btn)
  toyCollection.appendChild(div)
}
  
function postToys(toy) {
  const toyUrl = "http://localhost:3000/toys/"
  fetch(toyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json" ,
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toy.name.value,
      image: toy.image.value,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(data => displayToy(data))
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  postToys(event.target)
})
