// Client side validation using Bootstrap
(() => {
  'use strict'

  // Select all forms with class 'needs-validation'
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over each form and add submit event listener
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) { // If form is invalid
        event.preventDefault() // Prevent form submission
        event.stopPropagation() // Stop event bubbling
      }

      form.classList.add('was-validated') // Add Bootstrap validation class
    }, false)
  })
})()