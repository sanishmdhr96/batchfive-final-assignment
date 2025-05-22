import { TABLE_NAME } from "./constants.js";
import { getStudentDataByID, postStudentData } from "./models/students.js";
import { getDataFromDB, setDataToDB } from "./utils/storageUtil.js";

const submitButton = document.getElementById("form-submit");
submitButton.addEventListener("click", submitData);

const fetchButton = document.getElementById("get-data");
fetchButton.addEventListener("click", getData);

function submitData(event) {
    event.preventDefault();

    // get dom element
    const nameField = document.getElementById("name");
    const nameValue = nameField.value;

    const emailField = document.getElementById("email_address");
    const emailValue = emailField.value;

    const result = postStudentData({
        name: nameValue,
        email_address: emailValue,
    });

    if (result.status === 201) {
        alert('Your data has been saved successfully.')
    } else {
        alert(result.message)
    }

}


function getData() {
    const result = getStudentDataByID(20)
}