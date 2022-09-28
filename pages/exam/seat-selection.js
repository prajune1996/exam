import React, { useState, useEffect } from "react";
import { withRouter } from 'next/router';
import Router from "next/router";

function Seat(props) {
    // rows and cols
    const [rows] = useState(6);
    const [columns] = useState(13);
    //  set seat name
    const [initialChar] = useState('A');
    //  save seat
    const [savedSeats, setSavedSeats] = useState([])

    // onclick seat
    const setSeat = (colIndex, rowIndex) => {
        setSavedSeats({ 'colIndex': colIndex, 'rowIndex': rowIndex })
    }
    // get prev props
    let userData = props.router.query;
    userData.savedSeats = savedSeats;

    // save data to localstorage and back to home
    const saveData = () => {
        saveUserData();
        Router.push('/')
    }

    // setting all data to local storage
    const saveUserData = () => {
        var a = [];
        a = JSON.parse(localStorage.getItem('userData')) || [];
        a.push(userData);
        localStorage.setItem('userData', JSON.stringify(a));
    }

    // empty data checks
    useEffect(() => {
        if (userData.name === undefined) {
            Router.push('/')
        }
    }, [userData.name])


    return (
        <div className="main_area">
            <div className="seat_grid">
                {[...new Array(columns)].map((x, colIndex) => {
                    return (
                        <div className="board_row" key={colIndex}>
                            <span className="row_naming">{String.fromCharCode(initialChar.charCodeAt() + colIndex)}</span>
                            {[...new Array(rows)].map((y, rowIndex) => (
                                <div className={`seat_square ${savedSeats?.colIndex === colIndex && savedSeats?.rowIndex === rowIndex ? 'booked_seat' : ''}`} key={rowIndex} onClick={() => setSeat(colIndex, rowIndex)}>
                                </div>
                            ))}
                        </div>
                    )
                })}
                <button onClick={() => saveData()}>Submit</button>
            </div>
        </div>

    )
}

export default withRouter(Seat);
