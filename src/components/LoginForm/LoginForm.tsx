import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { TwitterLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import sharedCSSModule from '../shared/css/shared.module.css';
import loginCSSModule from './LoginForm.module.css';
import { useRef, useCallback, useState } from "react";
import {signInWithPopup} from 'firebase/auth'
import { auth, twitterprovider, googleprovider } from '../../../firebaseconfig.js';

export default function LoginForm() {
    const emailInputElementReference = useRef(null);
    const passwordInputElementReference = useRef(null);
    const navigate = useNavigate();
    const [response, setResponse] = useState({
        claim: '',
        email: '',
        token: '',
        uid: '',
        photoURL: '',
    });

    const handleTwitterLogin = () => {
        signInWithPopup(auth, twitterprovider).then(async (result) => {
            const { displayName, email, photoURL, uid } = result.user;
            const accessToken = result.user.stsTokenManager.accessToken;

            console.log(result.user)
            if (result.user) {
                setResponse({
                    email: email,
                    token: accessToken,
                    uid: uid,
                })
                localStorage.setItem('user', JSON.stringify(result.user));
                await getTeamData();
                await handleAppRedirect(result.user);
                
            }
        }).catch((error) => {
            console.log(error.message);
        })
    }


    const getTeamData = async () => {
        let currentUser = auth.currentUser;
        if(currentUser){
            let idToken = await currentUser.getIdToken();
            let response = await fetch("https://6418qzn2i7.execute-api.us-east-1.amazonaws.com/dev/app/team",{
                method: "GET",
                headers: {
                    authorizationToken: idToken
                }
            });
            let json = await response.json();
            console.log(json);
            if(json.status && Array.isArray(json.teamData) && json.teamData.length){
                localStorage.setItem("team", JSON.stringify(json.teamData[0]));
               
            }

        }
    }
    const handleAppRedirect = async (user) => {
        if(auth.currentUser){
            const idTokenResult = auth.currentUser.getIdTokenResult();
            const customClaims = idTokenResult.claims;

            console.log(customClaims);
            if (customClaims && customClaims.admin === true) {
                navigate('/admin', {
                    state: {
                        email: user.email, token: user.token,uid: user.uid
                    },
                });
         
            } else if(localStorage.getItem("team") && localStorage.getItem("user")){
                console.log("here");
                navigate('/home/gamesList', {
                    state: {
                        email: user.email, token: user.token,uid: user.uid
                    },
                });

            } else if(localStorage.getItem("user")){
                navigate("/home/addTeam");
            }
        }
        
    }  
    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleprovider).then(async (result) => {
            const { displayName, email, photoURL, uid } = result.user;
            const accessToken = result.user.stsTokenManager.accessToken;

            console.log(result.user)
            if (result.user) {
                setResponse({
                    email: email,
                    token: accessToken,
                    uid: uid,
                })
                localStorage.setItem('user', JSON.stringify(result.user));
                await getTeamData();
                await handleAppRedirect(result.user);
            
                    
            }
        }).catch((error) => {
            console.log(error.message);
        })
    }


    const formHandler = useCallback(
        async (event) => {
            event.preventDefault();

            const data = {
                email: emailInputElementReference.current?.value,
                password: passwordInputElementReference.current?.value,
            };

            try {
                const response = await fetch('https://login-kku3a2biga-uc.a.run.app/login/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const responseData = await response.json();

                if (response.ok) {
                    localStorage.setItem('user', JSON.stringify(responseData));
                    navigate('securityQuestion', {
                        state: {
                            claim: responseData.claim,
                            email: responseData.email,
                            token: responseData.token,
                            uid: responseData.uid,
                        },
                    });
                }
            } catch (error) {
                console.error('Error occurred while making the API call:', error);
            }
        },
        [navigate]
    );

    return (
        <>
            <form onSubmit={formHandler} className={sharedCSSModule.login_form}>
                <TextField inputRef={emailInputElementReference} sx={{ mb: 2 }} fullWidth label="Email Address" id="Email Address" />
                <TextField
                    inputRef={passwordInputElementReference}
                    sx={{ mb: 2 }}
                    type="password"
                    fullWidth
                    label="Password"
                    id="fullWidth"
                />
                <Button component={NavLink} to="/auth/forgotPassword" sx={{ alignSelf: 'end', fontSize: '12px' }}>
                    Forgot Password
                </Button>
                <Button sx={{ mb: 2, py: 1 }} type="submit" variant="contained">
                    Login
                </Button>
            </form>
            <div className={loginCSSModule.social_media_button_container}>
                <TwitterLoginButton onClick={() => handleTwitterLogin()} />
                <GoogleLoginButton onClick={() => handleGoogleLogin()} />
            </div>
        </>
    );
}