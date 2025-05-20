import { MESSAGES } from "../constants.js";

function generateRandomId8Bit() {
    return Math.floor(Math.random() * 256);
}
function generateResponse(message, status, data = []) {
    return {
        message: message,
        payload: {
            data: data
        },
        status: status
    }
}

function setDataToDB(tableName, data) {
    // data check
    if (data) {
        // generate id for student data
        const studentId = generateRandomId8Bit()

        // add id to the data object
        const formatedData = Object.assign(data, {
            id: studentId
        })

        // convert data to json string
        const convertedData = JSON.stringify([formatedData])

        // save to local storage
        localStorage.setItem(tableName, convertedData)

        // return response
        return generateResponse(MESSAGES.student.SAVED, 201, {
            id: formatedData?.id
        })
    }


    return generateResponse(MESSAGES.INVALID, 400)

}


function getDataFromDB(tablename, studentId) {
    // data check
    if (studentId) {

        const allStudents = localStorage.getItem(tablename)

        if (allStudents) {
            const convertedData = JSON.parse(allStudents)

            const studentData = convertedData?.find(st => st.id === studentId)

            if (studentData?.id) {
                return {
                    payload: {
                        data: studentData
                    },
                    status: 200
                }
            }


            return generateResponse(MESSAGES.student.NOT_FOUND, 400)
        }

        return generateResponse(MESSAGES.student.NOT_FOUND, 400)
    }

    return generateResponse(MESSAGES.INVALID, 400)
}

export { setDataToDB, getDataFromDB } 
