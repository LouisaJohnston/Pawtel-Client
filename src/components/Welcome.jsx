import React from 'react'
import { makeStyles } from '@material-ui/core'
import img from '../imgs/welcomeDog.jpg'

const useStyles = makeStyles(theme => ({
    image: {
        width: "100%",
        height: "auto"
    }
}))

export default function Welcome() {
    const classes = useStyles();
    return (
        <div>
            <div>
                <img className={classes.image}
                    src={img}
                    alt="dog"
                />
            </div>
        </div>
    )

}