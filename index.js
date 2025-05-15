const submitButton = document.getElementById('form-submit')
submitButton.addEventListener('click', submitData)

function submitData(event) {
    event.preventDefault();

    // get dom element
    const nameField = document.getElementById('name')
    const nameValue = nameField.value

    const emailField = document.getElementById('email_address')
    const emailValue = emailField.value

    console.log(nameValue)
    localStorage.setItem('student', JSON.stringify({
        name: nameValue,
        email_address: emailValue
    }))
}