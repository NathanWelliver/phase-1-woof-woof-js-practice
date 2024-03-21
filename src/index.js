/* 
functionality of app:
    a. click on dogs in dog bar to see more info about the dog
    b. more info: dog pic, dog name, and a button that indicates good dog or bad dog
    c. click on good/bad dog button in order to toggle pup good/bad
    d. filter good/bad dogs in order to see just good dogs or all dogs in dog bar
    
segments and list of what to do for each aspect above:
    1. On the page, there is a div with the id of "dog-bar".
        When the page loads, use fetch to get all of the pup data from your server.
        When you have this information, you'll need to add a span with the pup's name to the dog bar
        (ex: <span>Mr. Bonkers</span>).
    2.When a user clicks on a pup's span in the div#dog-bar,
    that pup's info (image, name, and isGoodDog status)
    should show up in the div with the id of "dog-info".
    Display the pup's info in the div with the following elements:
        an img tag with the pup's image url
        an h2 with the pup's name
        a button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false. 
        Ex:
        <img src="dog_image_url" />
        <h2>Mr. Bonkers</h2>
        <button>Good Dog!</button>
    3. When a user clicks the Good Dog/Bad Dog button, two things should happen:
        The button's text should change from Good to Bad or Bad to Good
        The corresponding pup object in the database should be updated
        to reflect the new isGoodDog value
        
        You can update a dog by making a PATCH request to
        /pups/:id and including the updated isGoodDog status in the body of the request.
*/

//functions //

document.addEventListener('DOMContentLoaded', () => {
    const dogContainer = document.getElementById('dog-info');
    const dogBar = document.getElementById('dog-bar');
    const goodDogFilterBttn = document.getElementById('good-dog-filter');

    function displayDogBarNames(){
        fetch("http://localhost:3000/pups")
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch pups');
            }
            return response.json();
        })
        
        .then(pupDataFromServer => {

            pupData = pupDataFromServer;
            dogBar.innerHTML = ''

            pupDataFromServer.forEach(pup => {
                if(goodDogFilterBttn.innerText === "Filter good dogs: ON" && !pup.isGoodDog){
                    return
                }
                const spanElement = document.createElement('span')
                spanElement.textContent = pup.name;
                
                dogBar.appendChild(spanElement);
            })
        })
    }

    function displayDogDetails(pup){
        dogContainer.innerHTML = '';

        const imgElement = document.createElement('img');
        const h2Element = document.createElement('h2');
        const bttnElement = document.createElement('button');
        imgElement.src = pup.image;
        h2Element.textContent = pup.name;
        bttnElement.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";

        bttnElement.addEventListener('click', (event) => {
            event.preventDefault()
            if(bttnElement.innerText === "Good Dog!"){
                bttnElement.innerText = "Bad Dog!"
            } else if(bttnElement.innerText === "Bad Dog!"){
                bttnElement.innerText = "Good Dog!"
            }
        })
        
        dogContainer.appendChild(imgElement);
        dogContainer.appendChild(h2Element);
        dogContainer.appendChild(bttnElement);
    }

    

    // Event Listeners//
    dogBar.addEventListener('click', (event) => {
        if(event.target.tagName ==='SPAN'){
            const pupIndex = Array.from(dogBar.children).indexOf(event.target);

            const clickedPup = pupData[pupIndex];

            displayDogDetails(clickedPup)
        }
    })

    goodDogFilterBttn.addEventListener('click', (event) => {
        event.preventDefault()
        if(goodDogFilterBttn.innerText === "Filter good dogs: OFF"){
            goodDogFilterBttn.innerText = "Filter good dogs: ON"
        } else if(goodDogFilterBttn.innerText === "Filter good dogs: ON"){
            goodDogFilterBttn.innerText = "Filter good dogs: OFF"
        }

        displayDogBarNames()
    })

    displayDogBarNames()
})

