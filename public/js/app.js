
const weatherform = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#m1");
const messageTwo = document.querySelector("#m2");

weatherform.addEventListener("submit", (e) =>{
    e.preventDefault()

    const location =searchElement.value

    messageOne.textContent="loading....";
    messageTwo.textContent="";

    fetch(`/weather?address=${location}`).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            return messageOne.textContent=data.error;
        }
        messageOne.textContent=data.location;
        messageTwo.textContent=data.forecast.description;
    })
})
      
})