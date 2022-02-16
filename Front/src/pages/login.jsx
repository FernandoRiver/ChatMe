import React, {useState} from "react";
import { Button, Collapse, Container, makeStyles,
    FormControl, FormHelperText, InputAdornment, InputLabel,
    OutlinedInput, TextField, Typography,
    IconButton, FilledInput } from "@material-ui/core";
import {allUsers, createUser, user} from '../querys/user.js'
import { useApolloClient, gql } from "@apollo/client";
import { useEffect } from "react";
import Cookies from "universal-cookie";

import {useNavigate} from "react-router-dom"

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyle = makeStyles({
    root:{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    login:{
        background: '#fff',
        minWidth: '60%',
        width: '40%',
        maxHeight: '80%',
        padding: '20px 10px',
        overflowY: 'auto',
        '&::-webkit-scrollbar':{
            width: '3px',
            background: '#fff',
        },
        '&::-webkit-scrollbar-thumb':{
            width: '3px',
            background: '#000',   
            borderRadius: '10px'   
        },
        // borderRadius: "5px"
    },
    data:{
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        margin: '0 auto'
    },
    collapseArea:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
    },
    title:{
        fontSize: '25px',
        textAlign: 'center'
    },
    subTitle:{
        fontSize: '15px',
        textAlign: 'left',
        width: '90%',
        margin: '0 auto'
    },
    form:{
        width: "100%",
        height: "auto",
        margin: "5px 0"
    },
    input:{
        width: '100%',
        height: '50px',
        margin: '0'
    },
    haveAcount:{
        // background: '#055',
        width: '120px',
        fontSize: '12px',
        textAlign: 'left',
        // position: 'fixed',
        marginTop: '10px',
        '&:hover':{
            cursor: 'pointer',
            fontWeight: '700'
        }
    },
    button:{
        width: '150px',
        margin: '0 auto',
        color: "#fff",
        background: "#05f",
        "&:hover":{
            background:"#30302B",
            color: "#fff"
        }
    }
});
const cookies = new Cookies();

const Login = () => {
    const apolloClient = useApolloClient(), 
    classes = useStyle(),
    navigate = useNavigate(),
    [loading, setLoading] = useState(false),
    [login, setLogin] = useState(true),
    [first, setFirst] = useState(''),
    [last, setLast] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [passwordCo, setPasswordCo] = useState(''),
    [firstError, setFirstError] = useState(false),
    [lastError, setLastError] = useState(false),
    [emailError, setEmailError] = useState(false),
    [passwordError, setPasswordError] = useState(false),
    [passwordCoError, setPasswordCoError] = useState(false),
    [showPassword, setShowPassword] = useState(false),
    [showPasswordCo, setShowPasswordCo] = useState(false);


    const submit =async ()=>{
        if(login && (!email || !password)){
            if(!email)setEmailError(true)
            if(!password)setPasswordError(true)
            console.log("Data in Login")
            return null}
        else if(!login && (!first || !last || !email || !password || !passwordCo)){
            if(!first)setFirstError(true)
            if(!last)setLastError(true)
            if(!email)setEmailError(true)
            if(!password)setPasswordError(true)
            if(!passwordCo)setPasswordCoError(true)
            console.log("Data in Sing in")
            return null}
        const getUser = async () => {
            const {errors, data, loading} = await apolloClient.query({
                query: user,
                variables:{
                    email: email
                }
            })
            if(errors) if(errors.length > 0) throw new Error(errors[0].message)
            
            // console.log(data.user[0])
            return data.user[0]
        }
        const newUser = async ({first,last,email,password}) => {
            const {errors, data, loading} = await apolloClient.mutate({
                mutation: createUser,
                variables:{
                    first,
                    last,
                    email,
                    password
                }
            })
            if(errors) if(errors.length > 0) throw new Error(errors[0].message)
            
            return data.createUser
        }
        if(login){
            // , expires: new Date(Date.now()+2592000)
            const data = await getUser();
            console.log(localStorage.getItem("session"))
            
            if(data && data.email === email && data.password === password){
                setLoading(true);
                cookies.set("user", data, {path: '/'});
                cookies.set("token", data.id, {path: '/'});
                
                setTimeout(()=>{
                    navigate('/');
                },1000);
            }
            else{
                setEmailError(true);
                setPasswordError(true);
                console.log("Login false");
            }
        }
        else{
            if(password === passwordCo){
                setLoading(true);
                const user = await newUser({first,last,email,password});
                console.log(user)
                cookies.set("user", user, {path: '/'});
                cookies.set("token", user.id, {path: '/'});
                
                setTimeout(()=>{
                    navigate('/');
                },1000);
            }
            else{
                setEmailError(true);
                setPasswordError(true);
                console.log("Login false");
            }
        }
    }


    return <Container className={classes.root}>
        <Container className={classes.login}>
            <Typography className={classes.title}>{login?"Login":"Sing in"}</Typography>
            <form className={classes.data} autoComplete="off">
                <Collapse in={!login} className={classes.collapseArea}>
                    <FormControl error={firstError} className={classes.form} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">First</InputLabel>
                        <OutlinedInput
                            type={'text'}
                            value={first}
                            className={classes.input}
                            onChange={(e)=>{
                                setFirst(e.target.value)
                                setFirstError(false)
                            }}
                            labelWidth={70}
                        />
                        {
                            emailError?<FormHelperText className={classes.helper}>Email is empty or incorrect</FormHelperText>:null
                        }
                    </FormControl>
                    <FormControl error={lastError} className={classes.form} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Last</InputLabel>
                        <OutlinedInput
                            type={'text'}
                            value={last}
                            className={classes.input}
                            onChange={(e)=>{
                                setLast(e.target.value)
                                setLastError(false)
                            }}
                            labelWidth={70}
                        />
                        {
                            lastError?<FormHelperText className={classes.helper}>Last is empty</FormHelperText>:null
                        }
                    </FormControl>
                </Collapse>
                
                
                <FormControl error={emailError} className={classes.form} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                    <OutlinedInput
                        type={'text'}
                        value={email}
                        className={classes.input}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                            setEmailError(false)
                        }}
                        labelWidth={70}
                    />
                    {
                        emailError?<FormHelperText className={classes.helper}>Email is empty or incorrect</FormHelperText>:null
                    }
                </FormControl>
                <FormControl error={passwordError} className={classes.form} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        className={classes.input}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                            setPasswordError(false)
                        }}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>{setShowPassword(!showPassword)}}
                            edge="end"
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={70}
                    />
                    {
                        passwordError?<FormHelperText className={classes.helper}>Password is empty or incorrect</FormHelperText>:null
                    }
                </FormControl>
                
                <Collapse in={!login} className={classes.collapseArea}>
                    <FormControl error={passwordCoError} className={classes.form} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            type={showPasswordCo ? 'text' : 'password'}
                            value={passwordCo}
                            className={classes.input}
                            onChange={(e)=>{
                                setPasswordCo(e.target.value)
                                setPasswordCoError(false)
                            }}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>{setShowPasswordCo(!showPasswordCo)}}
                                edge="end"
                                >
                                {showPasswordCo ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            labelWidth={70}
                        />
                        {
                            passwordError?<FormHelperText className={classes.helper}>Password is empty or incorrect</FormHelperText>:null
                        }
                    </FormControl>
                </Collapse>

                <Button className={classes.button} variant="contained"
                    onClick={submit}
                >{loading?"Loading":(login?"Login":"Sing in")}</Button>
            </form>
            
            <Typography className={classes.haveAcount} onClick={()=>setLogin(!login)}>{login?"Don't have an acount?":"You have an acount?"}</Typography>
        </Container>
    </Container>
}

export default Login;