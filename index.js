import { TABLE_NAME } from "./constants.js";
import { getAllStudents, getStudentDataByID, postStudentData } from "./models/students.js";
import { getDataFromDB, setDataToDB } from "./utils/storageUtil.js";

const submitButton = document.getElementById("form-submit");
submitButton.addEventListener("click", submitData);


const addSubjectbtn = document.getElementById('add-subject')
addSubjectbtn.addEventListener("click", addSubject);

const studentForm = document.getElementById('student-form')

const subjectsFormGroup = document.getElementById('subjects-form-group')

const subjects = [{ subject: '', marks: '' }]

const studentTable = document.getElementById("student-list-body");

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


    let subjectValue = subjects.map((_item, idx) => {
        const subjectField = document.getElementById(`subject-${idx + 1}`);
        const subjectValue = subjectField.value;

        const marksField = document.getElementById(`marks-${idx + 1}`);
        const marksValue = marksField.value;

        return { subject: subjectValue, marks: marksValue }
    })

    console.log('subjectValue', subjectValue)



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

        // Display data to table 

        displayStudents()


        // <th>Name</th>
        //             <th>Email Address</th>
        //             <th>Father Name</th>
        //             <th>Mother Name</th>
        //             <th>Guardian Number</th>
        //             <th>Address</th>


    } else {
        alert(result.message)
    }

}

let timeout = null
function tryFunc(e, index) {
    e.preventDefault()
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        subjects[index] = { ...subjects[index], subject: e.target.value }
    }, 100)
}

let timeout1 = null
function marksFunc(e, index) {
    e.preventDefault()
    clearTimeout(timeout1)
    timeout1 = setTimeout(() => {
        subjects[index] = { ...subjects[index], marks: e.target.value }
    }, 100)
}


function addSubjectField() {
    console.log('subjects', subjects)
    subjectsFormGroup.innerHTML = ''
    subjects.forEach((subject, idx) => {
        const inputField = document.createElement('input')
        inputField.name = 'subject'
        inputField.id = `subject-${idx + 1}`
        inputField.value = subject.subject
        inputField.addEventListener('keyup', (e) => tryFunc(e, idx))

        const marksField = document.createElement('input')
        marksField.name = 'marks'
        marksField.id = `marks-${idx + 1}`
        marksField.value = subject.marks
        marksField.type = 'number'
        marksField.addEventListener('keyup', (e) => marksFunc(e, idx))


        const deletButton = document.createElement('button')
        deletButton.type = 'button'
        deletButton.innerHTML = "Delete"

        const formRowDiv = document.createElement('div')
        formRowDiv.setAttribute('style', "flex-direction: row")
        formRowDiv.setAttribute('class', 'form-row')

        formRowDiv.appendChild(inputField)
        formRowDiv.appendChild(marksField)
        formRowDiv.appendChild(deletButton)

        subjectsFormGroup.appendChild(formRowDiv)

    })
}


function addSubject() {
    subjects.push({ subject: '', marks: '' })
    addSubjectField()
}

const displayStudents = () => {
    const students = getAllStudents();

    studentTable.innerHTML = ''; // Clear existing rows
    students.payload.data.forEach(student => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email_address}</td>
                <td>${student.father_name}</td>
                <td>${student.mother_name}</td>
                <td>${student.guardian_number}</td>
                <td>${student.address}</td>
                <td><button>Edit</button></td>
                <td><button>Delete</button></td>
            `;
        studentTable.appendChild(tableRow);
    });
}





document.addEventListener("DOMContentLoaded", () => {
    displayStudents();
    addSubjectField();
});
