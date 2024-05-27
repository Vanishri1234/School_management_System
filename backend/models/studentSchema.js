const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {  // Added date of birth field
        type: Date,
        required: true
    },
    gender: {  // Added gender field
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    fathername: {
        type: String,
        required: true
    },
    fatherOccup: {
        type: String,
        required: true
    },
   
    mothername: {
        type: String,
        required: true
    },
    motherOccup: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },

    nationality: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },

    bloodGroup: {  // Added blood group field
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] // Adjust enum values as needed
    },
    
    adharnumber: {
        type: Number,
        required: true
    },

    studID: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    role: {
        type: String,
        default: "Student"
    },
    examResult: [
        {
            subName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject',
            },
            marksObtained: {
                type: Number,
                default: 0
            }
        }
    ],
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        },
        subName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
            required: true
        }
    }]
});

module.exports = mongoose.model("student", studentSchema);