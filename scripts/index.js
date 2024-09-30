// Get the form and success message elements
const form = document.getElementById('dataEntryForm'); // Get the data entry form element
const successMessage = document.getElementById('successMessage'); // Get the success message element
const calculationForm = document.getElementById('calculationForm'); // Get the calculation form element
const num1Input = document.getElementById('num1'); // Get the num1 input element
const num2Input = document.getElementById('num2'); // Get the num2 input element
const operationInput = document.getElementById('operation'); // Get the operation input element
const resultElement = document.getElementById('result'); // Get the result element
const historyElement = document.getElementById('history'); // Get the history element
const historyButton = document.getElementById('historyButton'); // Get the history button element

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the form data
  const name = document.getElementById('name').value; // Get the name input value
  const email = document.getElementById('email').value; // Get the email input value
  const message = document.getElementById('message').value; // Get the message input value

  // Validate the form data
  if (!name || !email || !message) { // Check if any of the fields are empty
    alert('Please fill out all fields'); // Display an error message if any fields are empty
    return; // Exit the function if any fields are empty
  }

  // Send a POST request to the server
  fetch('/DataEntry', { // Send a POST request to the /DataEntry endpoint
    method: 'POST', // Set the request method to POST
    headers: { // Set the request headers
      'Content-Type': 'application/json' // Set the content type to JSON
    },
    body: JSON.stringify({ // Convert the form data to JSON
      name: name, // Include the name input value
      email: email, // Include the email input value
      message: message // Include the message input value
    })
  })
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => { // Handle the response data
    // Display the success message
    successMessage.style.display = 'block'; // Show the success message element
    successMessage.textContent = 'Form submitted successfully!'; // Set the success message text
  })
  .catch((error) => { // Catch any errors
    console.error('Error:', error); // Log the error to the console
  });
}

// Function to handle calculation form submission
function handleCalculationFormSubmission(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the calculation form data
  const num1 = parseFloat(num1Input.value); // Get the num1 input value as a float
  const num2 = parseFloat(num2Input.value); // Get the num2 input value as a float
  const operation = operationInput.value; // Get the operation input value

  // Validate the calculation form data
  if (!num1 || !num2 || !operation) { // Check if any of the fields are empty
    alert('Please fill out all fields'); // Display an error message if any fields are empty
    return; // Exit the function if any fields are empty
  }

  // Send a POST request to the server
  fetch('/Calculation', { // Send a POST request to the /Calculation endpoint
    method: 'POST', // Set the request method to POST
    headers: { // Set the request headers
      'Content-Type': 'application/json' // Set the content type to JSON
    },
    body: JSON.stringify({ // Convert the calculation form data to JSON
      num1: num1, // Include the num1 input value
      num2: num2, // Include the num2 input value
      operation: operation // Include the operation input value
    })
  })
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => { // Handle the response data
    // Display the calculation result
    resultElement.textContent = `Result: ${data.result}`; // Set the result element text
  })
  .catch((error) => { // Catch any errors
    console.error('Error:', error); // Log the error to the console
  });
}

// Function to handle history button click
function handleHistoryButtonClick() {
  // Get the email input value
  const email = document.getElementById('email').value; // Get the email input value

    // Validate the email input value
    if (!email) { // Check if the email field is empty
        alert('Please enter an email address'); // Display an error message if the email field is empty
        return; // Exit the function if the email field is empty
      }
    
      // Send a GET request to the server
      fetch(`/History?email=${email}`) // Send a GET request to the /History endpoint with the email parameter
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => { // Handle the response data
        // Display the calculation history
        historyElement.innerHTML = ''; // Clear the history element
        data.forEach((calculation) => { // Loop through the calculation history data
          const historyItem = document.createElement('div'); // Create a new div element for each calculation
          historyItem.textContent = `Version: ${calculation.version}, Num1: ${calculation.num1}, Operator: ${calculation.operator}, Num2: ${calculation.num2}, Result: ${calculation.result}`; // Set the text content of the div element
          historyElement.appendChild(historyItem); // Add the div element to the history element
        });
      })
      .catch((error) => { // Catch any errors
        console.error('Error:', error); // Log the error to the console
      });
    }
    
    // Function to handle window load event
    function handleWindowLoad() {
      // Initialize the form data
      const name = document.getElementById('name'); // Get the name input element
      const email = document.getElementById('email'); // Get the email input element
      const message = document.getElementById('message'); // Get the message input element
    
      // Set the form data to the local storage values
      name.value = localStorage.getItem('name'); // Set the name input value to the local storage value
      email.value = localStorage.getItem('email'); // Set the email input value to the local storage value
      message.value = localStorage.getItem('message'); // Set the message input value to the local storage value
    }
    
    // Function to handle form input changes
    function handleFormInputChanges() {
      // Get the form data
      const name = document.getElementById('name').value; // Get the name input value
      const email = document.getElementById('email').value; // Get the email input value
      const message = document.getElementById('message').value; // Get the message input value
    
      // Set the local storage values to the form data
      localStorage.setItem('name', name); // Set the local storage value for name
      localStorage.setItem('email', email); // Set the local storage value for email
      localStorage.setItem('message', message); // Set the local storage value for message
    }
    
    // Function to handle calculation form input changes
    function handleCalculationFormInputChanges() {
      // Get the calculation form data
      const num1 = parseFloat(num1Input.value); // Get the num1 input value as a float
      const num2 = parseFloat(num2Input.value); // Get the num2 input value as a float
      const operation = operationInput.value; // Get the operation input value
    
      // Set the local storage values to the calculation form data
      localStorage.setItem('num1', num1); // Set the local storage value for num1
      localStorage.setItem('num2', num2); // Set the local storage value for num2
      localStorage.setItem('operation', operation); // Set the local storage value for operation
    }
    
    // Function to handle window unload event
    function handleWindowUnload() {
      // Clear the local storage values
      localStorage.removeItem('name'); // Remove the local storage value for name
      localStorage.removeItem('email'); // Remove the local storage value for email
      localStorage.removeItem('message'); // Remove the local storage value for message
      localStorage.removeItem('num1'); // Remove the local storage value for num1
      localStorage.removeItem('num2'); // Remove the local storage value for num2
      localStorage.removeItem('operation'); // Remove the local storage value for operation
    }
    
    // Function to handle form reset event
    function handleFormReset() {
      // Clear the local storage values
      localStorage.removeItem('name'); // Remove the local storage value for name
      localStorage.removeItem('email'); // Remove the local storage value for email
      localStorage.removeItem('message'); // Remove the local storage value for message
    }
    
    // Function to handle calculation form reset event
    function handleCalculationFormReset() {
      // Clear the local storage values
      localStorage.removeItem('num1'); // Remove the local storage value for num1
      localStorage.removeItem('num2'); // Remove the local storage value for num2
      localStorage.removeItem('operation'); // Remove the local storage value for operation
    }
    
   // Add event listeners
form.addEventListener('submit', handleFormSubmission); // Add an event listener to the form for submission
calculationForm.addEventListener('submit', handleCalculationFormSubmission); // Add an event listener to the calculation form for submission
historyButton.addEventListener('click', handleHistoryButtonClick); // Add an event listener to the history button for click
window.addEventListener('load', handleWindowLoad); // Add an event listener to the window for load
form.addEventListener('input', handleFormInputChanges); // Add an event listener to the form for input changes
calculationForm.addEventListener('input', handleCalculationFormInputChanges); // Add an event listener to the calculation form for input changes
window.addEventListener('unload', handleWindowUnload); // Add an event listener to the window for unload
form.addEventListener('reset', handleFormReset); // Add an event listener to the form for reset
calculationForm.addEventListener('reset', handleCalculationFormReset); // Add an event listener to the calculation form for reset