// 4. Write a simple calendar app in react in traditional calendar layout
// e.g. M, T, W, T, F, S, S table.
// There can be one or zero booking for each date.
// If there is a booking, the cell will have an indicator.
// Add a button that randomly generate several bookings for that month.
// The calendar table should update automatically to show these bookings.

// NOTE: App demo on https://codepen.io/razwanizmi/full/pxmjMg/

import React, { Component } from "react";
import dateFns from "date-fns";

class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    bookedDates: []
  };

  // generateRandomBooking updates random days of the current month with
  // bookings.
  generateRandomBooking = () => {
    const { currentMonth } = this.state;
    const daysInMonth = dateFns.getDaysInMonth(currentMonth);
    const randomDaysToGenerate = Math.floor(Math.random() * daysInMonth + 1);

    let bookedDates = [];
    for (let i = 0; i < randomDaysToGenerate; i++) {
      const randomDay = Math.floor(Math.random() * daysInMonth + 1);

      bookedDates.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), randomDay)
      );
    }

    this.setState(() => ({ bookedDates }));
  };

  // isBooked is a helper funtion to check if a current date is booked.
  isBooked = date => {
    const { bookedDates } = this.state;

    return bookedDates.some(bookedDate => dateFns.isSameDay(date, bookedDate));
  };

  // nextMonth increments the currentMonth state.
  nextMonth = () => {
    this.setState(() => ({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    }));
  };

  // prevMonth decrements the currentMonth state.
  prevMonth = () => {
    this.setState(() => ({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    }));
  };

  // renderButton returns the UI for the button to generate random bookings.
  renderButton = () => {
    return (
      <div className="col-center">
        <button onClick={this.generateRandomBooking}>Generate booking</button>
      </div>
    );
  };

  // renderHeader returns the UI for the calendar header - with the current
  // month and control buttons.
  renderHeader = () => {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  };

  // renderDays returns the UI for the calendar sub header with days of the
  // week.
  renderDays = () => {
    const dateFormat = "dddd";
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  // renderCells returns the UI with all the cells for each days of the month
  // including those spillovers from previous/next months.
  renderCells = () => {
    const { currentMonth } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : this.isBooked(day)
                  ? "selected"
                  : ""
            }`}
            key={day}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        {this.renderButton()}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              react
              <b>calendar</b>
            </span>
          </div>
        </header>
        <main>
          <Calendar />
        </main>

        <style>{`
          /* FONT IMPORTS */

          @import url(https://fonts.googleapis.com/css?family=Open+Sans:300, 400, 700);
          @import url(https://fonts.googleapis.com/icon?family=Material+Icons);

          .icon {
            font-family: "Material Icons", serif;
            font-style: normal;
            display: inline-block;
            vertical-align: middle;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;

            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
            -moz-osx-font-smoothing: grayscale;
            font-feature-settings: "liga";
          }

          /* VARIABLES */

          :root {
            --main-color: #1a8fff;
            --main-color-darken: #0176e6;
            --text-color: #777;
            --text-color-light: #ccc;
            --border-color: #eee;
            --bg-color: #f9f9f9;
            --neutral-color: #fff;
          }

          /* GENERAL */

          * {
            box-sizing: border-box;
          }

          body {
            font-family: "Open Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
            font-size: 1em;
            font-weight: 300;
            line-height: 1.5;
            color: var(--text-color);
            background: var(--bg-color);
            position: relative;
          }

          header {
            display: block;
            width: 100%;
            padding: 1.75em 0;
            border-bottom: 1px solid var(--border-color);
            background: var(--neutral-color);
          }

          header #logo {
            font-size: 175%;
            text-align: center;
            color: var(--main-color);
            line-height: 1;
          }

          header #logo .icon {
            padding-right: 0.25em;
          }

          main {
            display: block;
            margin: 0 auto;
            margin-top: 2.5em;
            max-width: 50em;
          }

          /* GRID */

          .row {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
          }

          .row-middle {
            align-items: center;
          }

          .col {
            flex-grow: 1;
            flex-basis: 0;
            max-width: 100%;
          }

          .col-start {
            justify-content: flex-start;
            text-align: left;
          }

          .col-center {
            justify-content: center;
            text-align: center;
          }

          .col-end {
            justify-content: flex-end;
            text-align: right;
          }

          /* Calendar */

          .calendar {
            display: block;
            position: relative;
            width: 100%;
            background: var(--neutral-color);
            border: 1px solid var(--border-color);
          }

          .calendar .header {
            text-transform: uppercase;
            font-weight: 700;
            font-size: 115%;
            padding: 1.5em 0;
            border-bottom: 1px solid var(--border-color);
          }

          .calendar .header .icon {
            cursor: pointer;
            transition: 0.15s ease-out;
          }

          .calendar .header .icon:hover {
            transform: scale(1.75);
            transition: 0.25s ease-out;
            color: var(--main-color);
          }

          .calendar .header .icon:first-of-type {
            margin-left: 1em;
          }

          .calendar .header .icon:last-of-type {
            margin-right: 1em;
          }

          .calendar .days {
            text-transform: uppercase;
            font-weight: 400;
            color: var(--text-color-light);
            font-size: 70%;
            padding: 0.75em 0;
            border-bottom: 1px solid var(--border-color);
          }

          .calendar .body .cell {
            position: relative;
            height: 5em;
            border-right: 1px solid var(--border-color);
            overflow: hidden;
            background: var(--neutral-color);
            transition: 0.25s ease-out;
          }

          .calendar .body .selected {
            border-left: 10px solid transparent;
            border-image: linear-gradient(45deg, #1a8fff 0%, #53cbf1 40%);
            border-image-slice: 1;
          }

          .calendar .body .row {
            border-bottom: 1px solid var(--border-color);
          }

          .calendar .body .row:last-child {
            border-bottom: none;
          }

          .calendar .body .cell:last-child {
            border-right: none;
          }

          .calendar .body .cell .number {
            position: absolute;
            font-size: 82.5%;
            line-height: 1;
            top: 0.75em;
            right: 0.75em;
            font-weight: 700;
          }

          .calendar .body .disabled {
            color: var(--text-color-light);
            pointer-events: none;
          }

          .calendar .body .cell .bg {
            font-weight: 700;
            line-height: 1;
            color: var(--main-color);
            opacity: 0;
            font-size: 8em;
            position: absolute;
            top: -0.2em;
            right: -0.05em;
            transition: 0.25s ease-out;
            letter-spacing: -0.07em;
          }

          .calendar .body .selected .bg {
            opacity: 0.05;
            transition: 0.5s ease-in;
          }

          .calendar .body .col {
            flex-grow: 0;
            flex-basis: calc(100% / 7);
            width: calc(100% / 7);
          }

          button {
            cursor: pointer;
            font-size: 1rem;
            position: relative;
            display: block;
            margin: 30px auto;
            padding: 0.5rem 1.5rem;
            overflow: hidden;
            border-width: 0;
            outline: none;
            border-radius: 2px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
            background-color: var(--main-color);
            color: #ecf0f1;
            transition: background-color 0.3s box-shadow 1s;
            text-transform: uppercase;
          }

          button:hover {
            background-color: var(--main-color-darken);
          }

          button:active {
            box-shadow: none;
          }
        `}</style>
      </div>
    );
  }
}

export default App;
