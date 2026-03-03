import { useState } from "react";
import React from "react";
import "../Header.css";

function Header()
{
    return (
        <div className="header">
            <h2>Daily Life Tracker</h2>
            <h4>Track your daily activities with custom counters</h4>
        </div>
    )
}

export default Header;