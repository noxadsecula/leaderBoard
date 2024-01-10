// Variables


// Inputs
const firstName = document.querySelector('.firstName')
const lastName = document.querySelector('.lastName')
const country = document.querySelector('.country')
const playerScore = document.querySelector('.score')
const addPlayerButton = document.querySelector('#addPlayer')
const warningMessage = document.querySelector('.blurMessage')
const contentWrapper = document.querySelector('.contentWrapper')


// Event Listeners
const fetchInfoForLeaderboard = e => {
    if(firstName.value && lastName.value && country.value && playerScore.value) {
        let fullName = firstName.value + ' ' + lastName.value
        const player = {
            fullName: fullName,
            country: country.value,
            score: parseInt(playerScore.value)
        };

        const players = []

        players.push(player)

        players.sort((a,b) => b.score - a.score)


        players.forEach((player) => {
            let divBox = createPlayerBox(player)
            contentWrapper.appendChild(divBox)
        })





    }else{
        warningMessage.textContent = 'All fields are required'
    }

}




// Functions
const inputRequiredHandler = (input) => {
    input.addEventListener('blur', e => {
        fieldIsRequired(input)
    })




}

const fieldIsRequired = (input) => {
    if(input.value.trim() === '') {
        warningMessage.textContent = 'Field is required'
        warningMessage.style.color = 'red'
    }else{
        warningMessage.textContent = ''
    }

}

function createPlayerBox(player) {
    let nameAndDateWrapper = document.createElement('div');
    nameAndDateWrapper.classList.add('nameAndDate');

    let pName = document.createElement('p');
    pName.classList.add('name');
    pName.textContent = player.fullName;

    nameAndDateWrapper.appendChild(pName);

    let dateText = document.createElement('p');
    let hourText = document.createElement('p');
    dateText.classList.add('date');
    hourText.classList.add('hour');

    let currentTime = new Date();
    let formattedDate = `${currentTime.getDate()}.${currentTime.getMonth() + 1}.${currentTime.getFullYear()}`;
    let formattedHour = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

    dateText.textContent = formattedDate;
    hourText.textContent = formattedHour;

    nameAndDateWrapper.appendChild(dateText);
    nameAndDateWrapper.appendChild(hourText);

    let countryWrapper = document.createElement('div');
    countryWrapper.classList.add('country');

    let countryName = document.createElement('p');
    countryName.classList.add('countryName');
    countryName.textContent = player.country;

    countryWrapper.appendChild(countryName);

    let scoreWrapper = document.createElement('div');
    scoreWrapper.classList.add('score');

    let scorePoint = document.createElement('p');
    scorePoint.classList.add('scorePoint');
    scorePoint.textContent = player.score;

    scoreWrapper.appendChild(scorePoint);

    let buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button');

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', () => {
        // Remove the entire box when the delete button is clicked
        contentWrapper.removeChild(divBox);
    });

    let increase5Button = document.createElement('button');
    increase5Button.classList.add('increase5Button');
    increase5Button.textContent = '+5';
    increase5Button.addEventListener('click', () => {
        player.score += 5;
        scorePoint.textContent = player.score;
        updateLeaderboard(); 
    });

    let decrease5Button = document.createElement('button');
    decrease5Button.classList.add('decrease5Button');
    decrease5Button.textContent = '-5';
    decrease5Button.addEventListener('click', () => {
        player.score = Math.max(0, player.score - 5); 
        scorePoint.textContent = player.score;
        updateLeaderboard(); 
    });

    buttonWrapper.appendChild(deleteButton);
    buttonWrapper.appendChild(increase5Button);
    buttonWrapper.appendChild(decrease5Button);

    let divBox = document.createElement('div');
    divBox.classList.add('box');
    divBox.appendChild(nameAndDateWrapper);
    divBox.appendChild(countryWrapper);
    divBox.appendChild(scoreWrapper);
    divBox.appendChild(buttonWrapper);

    return divBox;
}

function updateLeaderboard() {
    const playerBoxes = Array.from(contentWrapper.querySelectorAll('.box'));

    
    playerBoxes.sort((a, b) => {
        const scoreA = parseInt(a.querySelector('.scorePoint').textContent);
        const scoreB = parseInt(b.querySelector('.scorePoint').textContent);
        return scoreB - scoreA;
    });

    
    contentWrapper.innerHTML = '';
    playerBoxes.forEach((box) => {
        contentWrapper.appendChild(box);
    });
}


// Leaderboard and Settings Logic

// -Field required logic

inputRequiredHandler(firstName)
inputRequiredHandler(lastName)
inputRequiredHandler(country)
inputRequiredHandler(playerScore)



// Add Player Logic

addPlayerButton.addEventListener('click',fetchInfoForLeaderboard)