import { TABLE_NAME } from "./constants.js";
import { getStudentDataByID, postStudentData } from "./models/students.js";
import { getDataFromDB, setDataToDB } from "./utils/storageUtil.js";

const submitButton = document.getElementById("form-submit");
submitButton.addEventListener("click", submitData);

// const fetchButton = document.getElementById("get-data");
// fetchButton.addEventListener("click", getData);

function submitData(event) {
    event.preventDefault();

    // let nameValue, emailValue, phoneNumberValue, addressValue, fatherNameValue, motherNameValue, ageValue, guardianNumberValue;

    // const fields = [
    //     { fieldId: "name", fieldValue: 'nameValue' },
    //     { fieldId: "email_address", fieldValue: 'emailValue' },
    //     { fieldId: "phone_number", fieldValue: 'phoneNumberValue' },
    //     { fieldId: "address", fieldValue: 'addressValue' },
    //     { fieldId: "father_name", fieldValue: 'fatherNameValue' },
    //     { fieldId: "mother_name", fieldValue: 'motherNameValue' },
    //     { fieldId: "age", fieldValue: 'ageValue' },
    //     { fieldId: "guardian_number", fieldValue: 'guardianNumberValue' }
    // ]

    // fields.forEach(field => {
    //     const fieldElement = document.getElementById(field.fieldId);
    //     if (fieldElement) {
    //         console.log('field.fieldValue', field.fieldValue)
    //         console.log('fieldElement.value', fieldElement.value)
    //         window[field.fieldValue] = fieldElement.value;
    //         console.log(nameValue, emailValue, phoneNumberValue, addressValue, fatherNameValue, motherNameValue, ageValue, guardianNumberValue);
    //     }
    // })



    // // get dom element

    const nameField = document.getElementById("name");
    const nameValue = nameField.value;

    const emailField = document.getElementById("email_address");
    const emailValue = emailField.value;

    const phoneNumberField = document.getElementById("phone_number");
    const phoneNumberValue = phoneNumberField.value;

    const addressField = document.getElementById("address");
    const addressValue = addressField.value;

    const fatherNameField = document.getElementById("father_name");
    const fatherNameValue = fatherNameField.value;

    const motherNameField = document.getElementById("mother_name");
    const motherNameValue = motherNameField.value;

    const ageField = document.getElementById("age");
    const ageValue = ageField.value;

    const guardianNumberField = document.getElementById("guardian_number");
    const guardianNumberValue = guardianNumberField.value;


    if (!nameValue || !emailValue || !addressValue || !fatherNameValue || !motherNameValue || !ageValue || !guardianNumberValue) {
        alert('Please fill all the fields');
        return;
    }

    const result = postStudentData({
        name: nameValue,
        email_address: emailValue,
        phone_number: phoneNumberValue,
        address: addressValue,
        father_name: fatherNameValue,
        mother_name: motherNameValue,
        age: ageValue,
        guardian_number: guardianNumberValue
    });

    if (result.status === 201) {
        nameField.value = '';
        emailField.value = '';
        phoneNumberField.value = '';
        addressField.value = '';
        fatherNameField.value = '';
        motherNameField.value = '';
        ageField.value = '';
        guardianNumberField.value = '';
        alert('Your data has been saved successfully.')
    } else {
        alert(result.message)
    }

}
