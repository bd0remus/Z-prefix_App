import React, { useState, useEffect } from "react";


//TURN THIS INTO NEW ITEM

const Events = () => {
  const [eventName, setEventName] = useState();
  const [newQueue, setnewQueue] = useState();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState(null);

 // Add a new Item
 const addItem = () => {
  const { name, location, date, time } = newEvent;
  if (!name || !location || !date || !time) {
    alert("All fields are required");
    return;
  }

  fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add event");
      }
      return res.json();
    })
    .then((addedEvent) => {
      setEvents((prevEvents) => [...prevEvents, addedEvent]);
      setNewEvent({ name: "", location: "", date: "", time: "" });
    })
    .catch((err) => setError(err.message));
};