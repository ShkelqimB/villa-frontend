import React, { useState, useEffect } from "react";
import { Container, Divider, Typography } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../../api";
const localizer = momentLocalizer(moment);

const Calendars = () => {
    const [rollPayments, setRollPayments] = useState<any>();
    let arr: any[] = [];
    const getRollPayments = async () => {
        const result = await api.getAllRollPayment();
        setRollPayments(result.data);
    };
    useEffect(() => {
        getRollPayments();
    }, []);

    for (let i in rollPayments) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        arr.push({
            title: `${rollPayments[i]?.villa?.name}-${rollPayments[i]?.client?.full_name}`,
            start: rollPayments[i].checkin,
            end: rollPayments[i].checkout,
            color: `#${randomColor}`,
        });
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h3">Calendar</Typography>
            <Divider />
            <div className="rbc-calendar">
                <Calendar
                    localizer={localizer}
                    events={arr}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    eventPropGetter={(event, start, end, isSelected) => {
                        let newStyle = {
                            backgroundColor: event.color,
                            color: "black",
                            borderRadius: "0px",
                            border: "none",
                        };

                        if (event.isMine) {
                            newStyle.backgroundColor = "lightgreen";
                        }

                        return {
                            className: "",
                            style: newStyle,
                        };
                    }}
                />
            </div>
        </Container>
    );
};

export default Calendars;
