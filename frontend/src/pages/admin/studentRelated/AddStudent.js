import { CircularProgress } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../../../components/Popup';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import './addstudent.css';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [fathername, setFatherName] = useState('');
    const [fatherOccup, setFatherOccup] = useState('');
    const [mothername, setMotherName] = useState('');
    const [motherOccup, setMotherOccup] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [nationality, setNationality] = useState('');
    const [religion, setReligion] = useState('');
    const [adharnumber, setAdharNum] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [address, setAddress] = useState('');
    const [studID, setStudID] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');

    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    };

    const fields = {
        name, dob, gender, studID, fathername, fatherOccup, mothername, password, motherOccup,
        city, state, nationality, bloodGroup, religion, adharnumber, address, sclassName, adminID, role, attendance
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (sclassName === "") {
            setMessage("Please select a classname");
            setShowPopup(true);
        }
        else {
            setLoader(true);
            dispatch(registerUser(fields, role));
        }
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
        }
        else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        }
        else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

            <div className="background-container"></div>
            <div className="content">
                <div id="consignmentForm" className="container"></div>

                <div className="register">
                    <form className="registerForm" onSubmit={submitHandler}>
                        <span className="registerTitle">Student Registration</span>
                        
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input className="form-control" type="text" placeholder="Enter student's name..."
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        autoComplete="name" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input className="form-control" type="date" placeholder="Enter student's date of birth..."
                                        value={dob}
                                        onChange={(event) => setDob(event.target.value)}
                                        autoComplete="bday" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select className="form-control" value={gender} onChange={(event) => setGender(event.target.value)} required>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Father Name</label>
                                    <input className="form-control" type="text" placeholder="Enter student's fathername..."
                                        value={fathername}
                                        onChange={(event) => setFatherName(event.target.value)}
                                        autoComplete="fathername" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Father Occupation</label>
                                    <input className="form-control" type="text" placeholder="Enter student's father occupation..."
                                        value={fatherOccup}
                                        onChange={(event) => setFatherOccup(event.target.value)}
                                        autoComplete="fatherOccup" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Mother Name</label>
                                    <input className="form-control" type="text" placeholder="Enter student's mother name..."
                                        value={mothername}
                                        onChange={(event) => setMotherName(event.target.value)}
                                        autoComplete="mothername" required />
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Mother Occupation</label>
                                    <input className="form-control" type="text" placeholder="Enter student's mother occupation..."
                                        value={motherOccup}
                                        onChange={(event) => setMotherOccup(event.target.value)}
                                        autoComplete="motherOccup" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>City</label>
                                    <input className="form-control" type="text" placeholder="Enter student's city name..."
                                        value={city}
                                        onChange={(event) => setCity(event.target.value)}
                                        autoComplete="city" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>State</label>
                                    <input className="form-control" type="text" placeholder="Enter student's state name..."
                                        value={state}
                                        onChange={(event) => setState(event.target.value)}
                                        autoComplete="state" required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Nationality</label>
                                    <input className="form-control" type="text" placeholder="Enter student's nationality..."
                                        value={nationality}
                                        onChange={(event) => setNationality(event.target.value)}
                                        autoComplete="nationality" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Religion</label>
                                    <input className="form-control" type="text" placeholder="Enter student's religion..."
                                        value={religion}
                                        onChange={(event) => setReligion(event.target.value)}
                                        autoComplete="religion" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Blood Group</label>
                                    <select className="form-control" value={bloodGroup} onChange={(event) => setBloodGroup(event.target.value)} required>
                                        <option value="">Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Aadhar Number</label>
                                    <input className="form-control" type="number" placeholder="Enter student's Aadhar number..."
                                        value={adharnumber}
                                        onChange={(event) => setAdharNum(event.target.value)}
                                        autoComplete="adharnumber" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Address</label>
                                    <input className="form-control" type="text" placeholder="Enter student's address..."
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                        autoComplete="address" required />
                                </div>
                            </div>
                            {situation === "Student" && (
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Class</label>
                                        <select className="form-control" value={className} onChange={changeHandler} required>
                                            <option value='Select Class'>Select Class</option>
                                            {sclassesList.map((classItem, index) => (
                                                <option key={index} value={classItem.sclassName}>
                                                    {classItem.sclassName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Student ID</label>
                                    <input className="form-control" type="number" placeholder="Enter student's student ID..."
                                        value={studID}
                                        onChange={(event) => setStudID(event.target.value)}
                                        required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input className="form-control" type="password" placeholder="Enter student's password..."
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        autoComplete="new-password" required />
                                </div>
                            </div>
                        </div>

                        <button className="registerButton btn btn-primary" type="submit" disabled={loader}>
                            {loader ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Add'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AddStudent;
