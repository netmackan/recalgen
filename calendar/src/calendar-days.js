function CalendarDays(props) {
    let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    let weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];

    for (let day = 0; day < 42; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7)
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1)
        }

        let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
            year: firstDayOfMonth.getFullYear(),
        }

        if (day % 7 === 0) {

            // XXX: Incorrect week calculation below:
            let currentDate = firstDayOfMonth;
            let startDate = new Date(currentDate.getFullYear(), 0, 1);
            var days = Math.floor((currentDate - startDate) /
                (24 * 60 * 60 * 1000));
            var weekNumber = Math.ceil(days / 7);

            let week = {
                currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
                date: (new Date(firstDayOfMonth)),
                month: firstDayOfMonth.getMonth(),
                number: weekNumber,
                selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
                year: firstDayOfMonth.getFullYear(),
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