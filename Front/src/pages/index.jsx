import React from "react";
import { Button, Container, Grid } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";

import { useNavigate } from "react-router";
import { makeStyles } from "@material-ui/styles";
import { user } from "../querys/user";
import { useApolloClient } from "@apollo/client";
import Cookies from "universal-cookie";

// Components
import ChatContainer from "../components/chats/container";
import MessageContainer from "../components/messages/container"

const useStyle = makeStyles({
    root:{
        background: "#30302B",
        height: "100vh",
        padding: "20px 0",
    },
    chatContainer:{
        background:"#fff",
        display: "flex",
        width: "85%",
        height: "100%",
        padding: "0",
        overflow: "hidden"
    },
    logout:{
        position: "absolute",
        top: "10px",
        right: "10px"
    },
    chatsArea:{
        background: "#083",
        height: "100%",
        width: "30%",
        marginLeft: "0",
        padding: "0"
    },
    chatsContainer:{
        width: "100%",
        height: "90%",
        padding: "0"
    },
    messagesArea:{
        background: "#f58",
        width: "70%",
        height: "100%",
        padding: "0"
    }
})
const cookie = new Cookies()

const Index = () => {
    const navigate = useNavigate(), 
        [session, setSession] = useState(cookie.get("token")),
        user = cookie.get("user"),
        [userData, setUserData] = useState(),
        classes = useStyle(),
        apolloClient = useApolloClient();

    useEffect(()=>{
        if(!session){
            navigate('/login')
        }
    },[session])
    return <Container className={classes.root}>
        <Container className={classes.chatContainer}>
            <Container className={classes.chatsArea} >
                <ChatContainer/>
            </Container>
            <MessageContainer/>
        </Container>
            <Button className={classes.logout} onClick={()=>{
                cookie.set("session", "");
                setSession();
            }} variant="contained">Logout</Button>
    </Container>
}

export default Index;