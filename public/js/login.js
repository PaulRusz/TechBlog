const loginFormHanlder = async (event) => {
    event.preventDefault()


    // Collect the values from the login form on handlebars
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        // Sends a POST request to the API 
        const response = await fetch('/api/users/login', {
            meth: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            // If the request is successful, this will redirect the browser to the profile page
            document.location.replace('/profile');
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
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);