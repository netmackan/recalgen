function CalendarDays(props) {
    let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    let weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];
    let date = firstDayOfMonth;

    for (let day = 0; day < 42; day++) {
        if (day === 0 && date === 0) {
            date.setDate(date.getDate() - 7)
        } else if (day === 0) {
            date.setDate(date.getDate() + (day - weekdayOfFirstDay + props.firstDayOfWeek));
        } else {
            date.setDate(date.getDate() + 1)
        }

        let calendarDay = {
            currentMonth: (date.getMonth() === props.day.getMonth()),
            date: (new Date(date)),
            month: date.getMonth(),
            number: date.getDate(),
            selected: (date.toDateString() === props.day.toDateString()),
            year: date.getFullYear(),
        }

        if (day % 7 === 0) {

            // XXX: Incorrect week calculation below:
            let currentDate = date;
            let startDate = new Date(currentDate.getFullYear(), 0, 1);
            var days = Math.floor((currentDate - startDate) /
                (24 * 60 * 60 * 1000));
            var weekNumber = Math.ceil(days / 7);

            let week = {
                currentMonth: (date.getMonth() === props.day.getMonth()),
                date: (new Date(date)),
                month: date.getMonth(),
                number: weekNumber,
                selected: (date.toDateString() === props.day.toDateString()),
                year: date.getFullYear(),
                week: true
            }
            currentDays.push(week)
        }

        currentDays.push(calendarDay)
    }

    return (
        <div className="table-content">
            {
                currentDays.map((day) => {
                    if (!day.week) {
                        return (
                            <div className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
                                onClick={() => props.changeCurrentDay(day)}>
                                    <p>{day.number}</p>
                            </div>
                        )
                    } else {
                        return (
                            <div className={"calendar-week" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}>
                                    <p>{day.number}</p>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default CalendarDays;