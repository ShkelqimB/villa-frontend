import React from "react";
import { Container, Divider, Typography } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-big-calendar/lib/addons/dragAndDrop/styles"; // if using DnD
const localizer = momentLocalizer(moment);

const Calendars = () => {
    const events = [
        {
            title: "Mevlo",
            start: "2023-02-12T13:45:00-05:00",
            end: "2023-02-13T14:00:00-05:00",
        },
        {
            title: "Kimi",
            start: "2023-02-16T13:45:00-05:00",
            end: "2023-02-17T14:00:00-05:00",
        },
    ];
    return (
        <Container maxWidth="lg">
            <Typography variant="h3">Calendar</Typography>
            <Divider />
            <div className="rbc-calendar">
                <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500 }} />
            </div>
        </Container>
    );
};

export default Calendars;
