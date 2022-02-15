import { Container, makeStyles, Typography } from "@material-ui/core"
import { useApolloClient } from "@apollo/client";
import Cookies from "universal-cookie";

const useStyle = makeStyles({
    root:{
        background: "#ffd",
        padding: "10px 0",
        display: "flex",
        flexDirection: "row",
        transition: "all ease 0.2s",
        borderBottom: "1px solid rgba(0,0,0, 0.2)",
        "&:hover":{
            color: "#fff",
            background: "#e24",
            cursor: "pointer"
        }
    },
    img:{
        width: "30%",
        padding: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    userImg:{
        background: "#fc8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "30px",
        height: "30px",
        padding: "0",
        borderRadius: "50%",
        fontWeight: "600",
        fontSize: "12px",
        textTransform: "uppercase",
        margin: "0",
        color: "#000"
    },
    dataContainer:{
        width: "100%",
        textAlign: "left",
        padding: "0"
    },
    data:{
        width: "100%",
        fontSize: "12px",
        textAlign: "left"
    }
})

const cookie = new Cookies();

const Chat = (props) => {
    const classes = useStyle(),
        user = cookie.get("user"),
        dataChat = props.data,
        setId = props.setId;

    const getChat = () => {
        console.log(user.id)
    }

    return <Container className={classes.root} onClick={()=>getChat()}>
        <Container  className={classes.img}>
            <Container className={classes.userImg}>{dataChat.first[0]+dataChat.last[0]}</Container>
        </Container>
        <Container  className={classes.dataContainer}>
            <Typography className={classes.data}>{dataChat.first}</Typography>
            <Typography className={classes.data}>{dataChat.last}</Typography>
        </Container>
    </Container>
}

export default Chat;