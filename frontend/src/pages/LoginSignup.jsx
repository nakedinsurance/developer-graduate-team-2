import React, { useState } from 'react';
import './LoginSignup.css';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/lock.png';
// State variables for form inputs and messages
const LoginSignup = () => {
    const [action, setAction] = useState("Register"); // Determines whether to show login or registration form
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [signedInUser, setSignedInUser] = useState(null);
    // Function to handle form submission
    const handleSubmit = () => {
        if (action === "Login") {
            // Check if the entered email and password match the signed-in user
            if (signedInUser && signedInUser.email === email && signedInUser.password === password) {
                setMessage("Welcome to Naked Cloth!");
            } else if (signedInUser && (signedInUser.email !== email || signedInUser.password !== password)) {
                setMessage("Email or Password is incorrect!");
            } else {
                setMessage("You are not logged in.");
            }
        } else {
            setSignedInUser({ firstName, lastName, gender, age, email, password });
            setMessage("Successfully registered! You can now log in.");
            setFirstName('');
            setLastName('');
            setGender('');
            setAge('');
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <div className='header'>
                    <div className="text">{action}</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    {action === "Login" ? (
                        <>
                            <div className='input'>
                                <img src={email_icon} alt="Email Icon" className="icon" />
                                <input
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='input'>
                                <img src={password_icon} alt="Password Icon" className="icon" />
                                <input
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='input'>
                                <input
                                    type='text'
                                    placeholder='First Name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='input'>
                                <input
                                    type='text'
                                    placeholder='Last Name'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='input'>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                    className="gender-select"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className='input'>
                                <input
                                    type='number'
                                    placeholder='Age'
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                    min="1"
                                />
                            </div>
                            <div className='input'>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='input'>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}
                </div>

                {message && <div className="message">{message}</div>}

                <div className="submit-container">
                    <span 
                        className="click-here" 
                        onClick={() => { 
                            setAction(action === "Login" ? "Register" : "Login"); 
                            setMessage(''); 
                        }}
                    >
                        {action === "Login" ? "Not a member? Click Here!" : "Already a member? Click Here!"}
                    </span>
                    <div 
                        className="submit" 
                        onClick={handleSubmit}
                    >
                        {action === "Login" ? "Login" : "Register"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup; // Export the component for use in other parts of the application
