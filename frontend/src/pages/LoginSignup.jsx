import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginSignup.css';
import email_icon from '../assets/email.png';
import password_icon from '../assets/lock.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Register");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [signedInUser, setSignedInUser] = useState(null);

    const navigate = useNavigate(); // Hook for navigation

    // Redirect to home if user is logged in
    useEffect(() => {
        if (signedInUser) {
            navigate('/home'); // Redirect to home page
        }
    }, [signedInUser, navigate]);

    const handleSubmit = async () => {
        if (action === "Login") {
            try {
                const response = await fetch('http://localhost:4000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    setSignedInUser(data.user); // Set signed-in user
                    setMessage("Login successful!");
                } else {
                    setMessage(data.error || "Login failed!");
                }
            } catch (error) {
                setMessage("Error logging in!");
            }
        } else {
            try {
                const response = await fetch('http://localhost:4000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName, lastName, gender, age, email, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    setMessage("Registration successful! You can now log in.");
                    setAction("Login");
                } else {
                    setMessage(data.error || "Registration failed!");
                }
            } catch (error) {
                setMessage("Error registering!");
            }
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

export default LoginSignup;