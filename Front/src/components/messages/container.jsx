import { Container, makeStyles, Typography } from "@material-ui/core";

import MoreIcon from '@material-ui/icons/MoreVert';
import { IconButton } from "@material-ui/core";

const useStyle = makeStyles({
    root:{
        background: "#FFAAE3",
        width: "70%",
        height: "100%",
        padding: "0"
    },
    header:{
        background: "#FFFAE3",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "10%"
    },
    container: {
        background: "#BFBFF2",
        width: "100%",
        height: "80%"
    },
    input:{
        background: "#6262A6",
        width: "100%",
        height: "10%"
    },
    user:{
        width: "30%",
        padding: "0",
        margin: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    userImg:{
        background: "#fc8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        padding: "0",
        borderRadius: "50%",
        fontWeight: "600",
        fontSize: "12px",
        textTransform: "uppercase",
        margin: "0",
        color: "#000"
    },
    moreIcon:{
        width: "40px",
        heigth: "40px"
    },
    dataContainer:{
        width: "50%",
        textAlign: "left",
        padding: "0"
    },
    data:{
        width: "100%",
        fontSize: "12px",
        textAlign: "left"
    }
});

const messages = [
    {
        cont: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis minus neque a minima mollitia magni non assumenda consectetur nihil excepturi, vel, libero aliquam vitae autem accusantium corporis eos! Totam, quis!", 
        dataTime: "10:13 pm"
    },
    {
        cont: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis minus neque a minima mollitia magni non assumenda consectetur nihil excepturi, vel, libero aliquam vitae autem accusantium corporis eos! Totam, quis!", 
        dataTime: "10:13 pm"
    },
    {
        cont: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis minus neque a minima mollitia magni non assumenda consectetur nihil excepturi, vel, libero aliquam vitae autem accusantium corporis eos! Totam, quis!", 
        dataTime: "10:13 pm"
    },
]

const MessageContainer = () => {
    const classes = useStyle();

    return <Container className={classes.root}>
        <Container className={classes.header}>
            <Container  className={classes.user}>
                <Container className={classes.userImg}>FD</Container>
                <Container  className={classes.dataContainer}>
                    <Typography className={classes.data}>Fulanito</Typography>
                    <Typography className={classes.data}>Detal</Typography>
                </Container>
            </Container>
            <IconButton className={classes.moreIcon} aria-label="display more actions" edge="end" color="inherit">
                <MoreIcon />
            </IconButton>
        </Container>
        <Container className={classes.container}>

        </Container>
        <Container className={classes.input}></Container>
    </Container>
}

export default MessageContainer;