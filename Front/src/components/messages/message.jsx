import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
    root:{
        background: "#ff3",
        width: "60%",
        height: "30px"
    }
});

const Message = () => {
    const classes = useStyle();

    return <Container className={classes.root}>

    </Container>
}