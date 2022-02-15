import Chat from "./chatContainer";
import {allUsers} from"../../querys/chat";
import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import Cookies from "universal-cookie";
import ReplayIcon from '@material-ui/icons/Replay';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Container, makeStyles, Grid, InputBase, IconButton, Divider, TextField, Input, Hidden, Typography} from "@material-ui/core"

const useStyle = makeStyles({
    root:{
        // background: "#822",
        width: "100%",
        height: "100%",
        padding: "0",
        display: "grid",
        gridTemplateRows: "1fr 1fr 10fr"
    },
    chatsHeader:{
        background: "#F3EAC0",
        width: "100%",
        margin: "0",
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        alignItems: "center",
        justifyContent: "center"
    },
    userImg:{
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "30px",
        height: "30px",
        padding: "0",
        borderRadius: "50%",
        fontWeight: "600",
        textTransform: "uppercase"
    },
    moreIcon:{
        width: "40px",
        height: "40px"
    },
    header: {
        background: "#ccf",
        width: "100%",
        margin: "0",
        textAlign: "center"
    },
    search: {
        background: "#fef",
        borderRadius: "5px",
        padding: "0 5px",
        margin: "5px",
    },
    iconButton: {
        background: "#fef",
        padding: 6,
        fontSize: "15px",
        borderRadius: "50%",
        transition: "ease 0.2s",
        "&:hover":{
            transition: "ease 0.2s",
            cursor: "pointer",
            background: "#ecc"
        },
        "&:active":{
            transition: "ease 0.1s",
            background: "#fee"
        }
    },
    divider: {
      height: 28,
      margin: 4,
    },
    chatContainer:{
        padding: "0",
        height: "100%",
        // maxHeight: "65%",
        overflowY: "auto",
        overflow: "hidden",
        "&::-webkit-scrollbar":{
            background: "#fff",
            width: "2px"
        },
        "&::-webkit-scrollbar-thumb":{
            backgroundColor: "#000",    /* color of the scroll thumb */
            borderRadius: "20px",       /* roundness of the scroll thumb */
        }
    },
    logo:{
        fontFamily: "'Arvo', serif",
        fontSize: "15px",
        fontWeight: "600",
        textAlign: "center",
        padding: "0 5px"
    }
})

const cookie = new Cookies();

const ChatContainer = () => {
    const classes = useStyle(),
        user = cookie.get("user"),
        apolloClient = useApolloClient(),
        [chats, setChats] = useState(),
        [chatSearch, setChatSearch] = useState(''),
        [chatId, setChatId] = useState();
    
    const getChats = useCallback(async ()=>{
        const {errors, data, loading} = await apolloClient.query({
            query: allUsers
        })
        if(errors) console.log(errors);
        if(loading) console.log(loading);
        setChats(data.allUsers);
    },[])
    useEffect(()=>{
        getChats();
    },[])

    return <Grid container direction="row" className={classes.root}>
        <Grid container  direction="row" className={classes.chatsHeader}>
            <Container className={classes.userImg}>{user?user.first[0]+user.last[0]:null}</Container>
            <Typography className={classes.logo}>Chat Me</Typography>
            <IconButton className={classes.moreIcon} aria-label="display more actions" edge="end" color="inherit">
                <MoreIcon />
            </IconButton>
        </Grid>
        <Grid container direction="row" className={classes.header}  justifyContent="center" alignItems="center">
            <Grid item xs={10}><InputBase inputProps={{ 'aria-label': 'naked' }} placeholder="Search chats" className={classes.search} value={chatSearch} onChange={(e)=>{setChatSearch(e.target.value)}}/></Grid>
            <Grid item xs={2}><ReplayIcon className={classes.iconButton} onClick={getChats}/></Grid>
        </Grid>
        <Grid className={classes.chatContainer}>
            {chats?chats.map((e)=>{
                const id = Math.floor((1 + Math.random()) * 0x10000)
                if(e.id === user.id) return null

                if(chatSearch){
                    const search = chatSearch.toUpperCase()
                    const fullName = e.fullName.toUpperCase()
                    if(fullName.includes(search)){
                        return <Chat key={id} data={e}/>
                    }
                }
                else{
                    return <Chat key={id} data={e} setId={setChatId}/>
                }
            }):"No chats :("}
        </Grid>
    </Grid>
}

export default ChatContainer;