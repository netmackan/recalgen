import React, { Component } from "react";
import CalendarDays from './calendar-days';
import './calendar.css'

export default class Calendar extends Component {
    constructor() {
        super();

        //this.firstDayOfWeek = 0; // Sunday
        this.firstDayOfWeek = 1; // Monday
        let weekdayNumbers = [...Array(7).keys()].map((d) => (d + this.firstDayOfWeek) % 7)
        let weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.weekdays = weekdayNumbers.map((wn) => weekdayNames[wn])

        this.months = ['January', 'February', 'March', 'April', 'May',
                        'June', 'July', 'August', 'September', 'October', 
                        'November', 'December'];

        this.state = {
            currentDay: new Date()
        }
    }

    changeCurrentDay = (day) => {
        this.setState({ currentDay: new Date(day.year, day.month, day.number) });
    }

    render() {
        return (
            <div className="calendar">
                <div className="calendar-header">
                    <h2>{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</h2>
                </div>
                <div className="calendar-body">
                    <div className="table-header">
                        <div className="weeknumber"><p>&nbsp;</p></div>
                        {
                            this.weekdays.map((weekday) => {
                                return <div className="weekday"><p>{weekday}</p></div>
                            })
                        }
                    </div>
                    <CalendarDays
                        firstDayOfWeek={this.firstDayOfWeek}
                        day={this.state.currentDay}
                        changeCurrentDay={this.changeCurrentDay}
                        />
                </div>
            </div>
        )
    }
}
