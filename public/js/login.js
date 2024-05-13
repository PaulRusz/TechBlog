const loginFormHandlder = async (event) => {
    event.preventDefault()


    // Collect the values from the login form on handlebars
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        // Sends a POST request to the API 
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            // If the request is successful, this will redirect the browser to the dashboard page
            document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
    }
}


// Signup form handler function
const signupFormHandler = async (event) => {
    event.preventDefault();

    // Gathers values from the handlebars
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          const error = await response.json();
          if (error.errors[0].message === 'email must be unique') {
            alert('That email address is already in use. Please try logging in or use a different email address.');
          } else {
            alert(response.statusText);
          }
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred while creating the user. Please try again.');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandlder);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);