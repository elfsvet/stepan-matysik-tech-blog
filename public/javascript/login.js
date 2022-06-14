async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    //   As you can see in the code, we added a conditional to make sure that all fields have values before making the POST request.
    if (username && email && password) {
        // use await before the promise
        const response = await fetch('/api/users', {
            //! check if it's important to keep it uppercase
            // doesn't matter here. still posted a user.
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
            // to remove  then we can assign the response to the await promise.
        });
        // and now add error handler by using ok property
        if (response.ok) {

            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}


async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);




document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);