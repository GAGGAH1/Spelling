const images = [
    { src: 'image/apple.avif', word: 'APPLE' },
    { src: 'image/mango.avif', word: 'MANGO' },
    { src: 'image/bat.avif', word: 'BAT' },
    { src: 'image/orange.avif', word: 'ORANGE' },
    { src: 'image/carrot.avif', word: 'CARROT' },
    { src: 'image/cucumber.avif', word: 'CUCUMBER' },
    { src: 'image/pear.avif', word: 'PEAR' },
    { src: 'image/tomato.avif', word: 'TOMATO' },
    { src: 'image/peas.avif', word: 'PEAS' },
    { src: 'image/cat.avif', word: 'CAT' }
];

let currentWord = '';
let currentIndex = 0;
let timer;
let correctCount = 0;
let incorrectCount = 0;
let countdown = 60;

function loadImageAndAlphabets() {
    const imageContainer = document.getElementById('image-container');
    const alphabetButtonsContainer = document.getElementById('alphabet-buttons');
    const speltWordContainer = document.getElementById('spelt-word');
    const messageContainer = document.getElementById('message-container');

    // Reset the game state
    alphabetButtonsContainer.innerHTML = '';
    speltWordContainer.textContent = '';
    messageContainer.textContent = '';
    currentWord = '';

    // Display the current image
    const imgElement = document.createElement('img');
    imgElement.src = images[currentIndex].src;
    imgElement.alt = 'Spelling Image';
    imageContainer.innerHTML = '';
    imageContainer.appendChild(imgElement);

    // Define the layout of the keyboard
    const keyboardLayout = [
        'QWERTYUIOP',
        'ASDFGHJKL',
        'ZXCVBNM'
    ];

    // Generate the keyboard layout
    keyboardLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'flex justify-center space-x-2 mb-2';

        row.split('').forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.className = 'w-12 h-12 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out';
            button.addEventListener('click', () => handleAlphabetClick(letter));
            rowDiv.appendChild(button);
        });

        alphabetButtonsContainer.appendChild(rowDiv);
    });

    document.getElementById('clear-word').addEventListener('click', resetCurrentWord);
    
    /*Reset countdown and Start the 1-minute timer*/
    countdown = 60;
    clearInterval(timer);
    startTimer();
}

// function handleAlphabetClick(letter) {
//     currentWord += letter;
//     document.getElementById('spelt-word').textContent = currentWord;

    
//     if (currentWord === images[currentIndex].word) {
//         displayMessage('Correct!', 'text-green-500');
//         correctCount++;
//         proceedToNextImage();
//     } else if (currentWord.length === images[currentIndex].word.length || images[currentIndex].word.indexOf(currentWord) !== 0) {
        
//         displayMessage('Incorrect! Try again.', 'text-red-500');
//         resetCurrentWord();
//     }
// }
// function handleAlphabetClick(letter) {
//     currentWord += letter;
//     document.getElementById('spelt-word').textContent = currentWord;

//     // Check if the length of the input matches the target word's length
//     if (currentWord.length === images[currentIndex].word.length) {
//         if (currentWord === images[currentIndex].word) {
//             displayMessage('Correct!', 'text-green-500');
//             correctCount++;
//             proceedToNextImage();
//         } else {
//             // If the input word has the correct length but is incorrect
//             displayMessage('Incorrect! Try again.', 'text-red-500');
//             incorrectCount++; // Increment incorrect count for a wrong word
//             resetCurrentWord();
//         }
//     }
// }
function handleAlphabetClick(letter) {
    currentWord += letter;
    document.getElementById('spelt-word').textContent = currentWord;

    // Only check the word when the length matches the target word's length
    if (currentWord.length === images[currentIndex].word.length) {
        if (currentWord === images[currentIndex].word) {
            displayMessage('Correct!', 'text-green-500');
            correctCount++;
            proceedToNextImage();
        } else {
            // If the word length matches but the word is incorrect, wait for the timer to finish
            displayMessage('Keep trying!', 'text-yellow-500'); // Encourage the user to keep trying
        }
    }
}

function resetCurrentWord() {
    currentWord = '';
    document.getElementById('spelt-word').textContent = currentWord;
}

function proceedToNextImage() {
    clearTimeout(timer); // Clear the timer since the word was spelled correctly

    // Move to the next image or display the report if it's the last image
    if (currentIndex < images.length - 1) {
        currentIndex++;
        loadImageAndAlphabets();
    } else {
        displayReport();
    }
}

// function startTimer() {
//     timer = setTimeout(() => {
//         displayMessage('Time is up!', 'text-red-500');
//         incorrectCount--; // Increase incorrect count if time runs out
//         proceedToNextImage();
//     }, 60000); // 1-minute countdown
// }
// function startTimer() {
//     timer = setInterval(() => {
//         countdown--;
//         document.getElementById('timer').textContent = `Time Remaining:${countdown} seconds`;

//         if (countdown <= 0) {
//             clearInterval(timer);
//             displayMessage('Time is up!', 'text-red-500');
//             incorrectCount++; // Increase incorrect count if time runs out
//             proceedToNextImage();
//         }
//     }, 1000);
// }

function startTimer() {
    timer = setInterval(() => {
        countdown--;
        document.getElementById('timer').textContent = `Time Remaining: ${countdown} seconds`;

        if (countdown <= 0) {
            clearInterval(timer);

            // Check if the word is correct before moving to the next image
            if (currentWord !== images[currentIndex].word) {
                displayMessage('Time is up! Incorrect.', 'text-red-500');
                incorrectCount++; // Increment incorrect count if the word is wrong or incomplete
            }

            proceedToNextImage();
        }
    }, 1000);
}
function displayMessage(message, className) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = message;
    messageContainer.className = `text-center text-lg font-medium ${className} mb-4`;
}

function displayReport() {
    const reportContainer = document.getElementById('report-container');
    reportContainer.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Spelling Report</h2>
        <p class="text-green-600">Correct Attempts: ${correctCount}</p>
        <p class="text-red-600">Incorrect Attempts: ${incorrectCount}</p>
        <p>Total Images: ${images.length}</p>
    `;
}


loadImageAndAlphabets();
