import React from 'react'
import './InfoBox.css';
import {Card,CardContent,Typography} from '@material-ui/core';
function InfoBox({title,cases,active,total,...props}) {
  return (
    <Card
    onClick={props.onClick}
    className="infoBox"
    /* className={`infoBox ${active && "infoBox--selected"}`} */
     >
    <CardContent>

    <Typography className="infoBox_title" color="textSecondary">
    {title}
    </Typography>


    {/*No of cases */}
    <h2 className="infoBox_cases">{cases}</h2>
    {/*Total */}
    <Typography className="infoBox_total">
    {total} total
    </Typography>

    </CardContent>
    </Card>
  )
}

export default InfoBox
