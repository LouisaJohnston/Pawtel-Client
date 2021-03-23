import React from 'react'
import { makeStyles } from '@material-ui/core'
import img from '../imgs/welcome.png'

const useStyles = makeStyles(theme => ({
    image: {
        width: "100%",
        height: "auto"
    },
    textbox: {
        border: "2px solid black"
    }
}))

export default function Welcome() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.textbox}>
                <h1>welcome to pawtel</h1>
                <p>trusting homes for your loved ones</p>

            </div>
            <div>
                <img className={classes.image}
                    src={img}
                    alt="dog"
                />
            </div>
        </div>
    )

}