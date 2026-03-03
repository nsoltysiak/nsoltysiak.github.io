import { useState, useEffect } from "react";
import React from "react";
import "../CounterTiles.css";

function CounterTiles() 
{
    const [counters, setCounters] = useState(
        [
            {id: 1, title: 'Water Glasses', count: 0, step: 1},
            {id: 2, title: 'Push-ups', count: 0, step: 5},
            {id: 3, title: 'Steps', count: 0, step: 100}
        ]);
    
    const [newTitle, setNewTitle] = useState("");
    const [newStep, setNewStep] = useState(1);
    const [isAddingCounter, setIsAddingCounter] = useState(false);
    const [countersExist, setCountersExist] = useState(true);

    const increment = (id) =>
    {
        // prev is the most recent array of counters
        // counter is the current object being iterated over
        // counter.id === id - making sure the id of the counter in which the button was clicked matches the id of the counter being iterated over
        // if it does, copy all existing properties (...counter) and override count by adding the value of the count property to the value of the step property
        // if it does not, return the counter as it was when iterated over
        setCounters(prev => prev.map(counter => counter.id === id ? {...counter, count: counter.count + counter.step} : counter));
    }

    const decrement = (id) =>
    {
        setCounters(prev => prev.map(counter => counter.id === id && counter.count >= counter.step ? {...counter, count: counter.count - counter.step} : counter));
    }

    const reset = (id) =>
    {
        const isConfirmed = confirm(
          "Are you sure you want to reset the counter to 0?",
        );

        if (isConfirmed)
        {
            setCounters((prev) =>
              prev.map((counter) =>
                counter.id === id ? { ...counter, count: 0 } : counter,
              ),
            );
        }
          
    }

    const deleteCounter = (id) => 
    {
        const isConfirmed = confirm(
          "Are you sure you want to delete this counter?",
        );

        if (isConfirmed) 
        {
          setCounters((prev) => prev.filter((counter) => counter.id !== id));
        }
        
    }

    // Handle Create and Cancel Counter
    const handleCreate = () =>
    {
        if (!newTitle.trim() || newStep <= 0)
        {
            return;
        }

        const newCounter = 
        {
          id: Date.now(),
          title: newTitle,
          count: 0,
          step: Number(newStep),
        };

        setCounters(prev => [...prev, newCounter]);

        // Reset form state
        setNewTitle("");
        setNewStep(1);

        // Exit Form Mode
        setIsAddingCounter(false);
    }
    
    const handleCancel = () =>
    {
        setNewTitle("");
        setNewStep(1);
        setIsAddingCounter(false);
    }

    const clearAllCounters = () =>
    {
        const isConfirmed = confirm("Are you sure you want to set the count of all counters to 0?");

        if (isConfirmed)
        {
            setCounters((prev) =>
              prev.map((counter) => ({ ...counter, count: 0 })));
        }
    }

    const totalCount = counters.reduce( (sum, counter) => sum + counter.count, 0);

    // This logic only runs when the counters array changes
    useEffect( () =>
    {
        if (counters.length === 0)
        {
            setCountersExist(false);
        }
        else
        {
            setCountersExist(true);
        }
    }, [counters]); // dependency array: run useEffect only when counters changes, not every render


  return (
    <>
      <div className="addCounter">
        {/* Idle Mode */}
        {!isAddingCounter && (
          <button onClick={() => setIsAddingCounter(true)}>
            + Add New Counter
          </button>
        )}

        {/* Form Mode */}
        {isAddingCounter && (
          <div className="formCounterCancel">
            <h4>Create New Counter</h4>
            <label htmlFor="countername">Counter Name:</label>
            <input
              type="text"
              id="countername"
              name="countername"
              placeholder="Counter Name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <label htmlFor="incrementamount">Increment Amount:</label>
            <input
              type="number"
              id="incrementamount"
              name="incrementamount"
              min="1"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
            />

            <button onClick={handleCreate} className="createCounter">
              Create Counter
            </button>
            <button onClick={handleCancel} className="cancelCounter">
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Counters Exist*/}
      {countersExist && (
        <div className="count-and-clear">
          <h3>
            Total Count: <span>{totalCount}</span>
          </h3>
          <button onClick={clearAllCounters}>Clear All Counters</button>
        </div>
      )}

      {!countersExist && (
        <div className="no-counters">
          <h3>No counters yet</h3>
          <p>Create your first counter to start tracking!</p>
        </div>
      )}

      <div className="counter-tiles">
        {counters.map((counter) => (
          <div key={counter.id} className="counter-tile">
            <h4 className="counter-tile-title">{counter.title}</h4>
            <h4>
              <span>{counter.count}</span>{" "}
              {counter.count === 1 ? "time" : "times"}
            </h4>
            <p>+{counter.step} per click</p>
            <div className="counter-buttons">
              <button
                onClick={() => decrement(counter.id)}
                className="decrement">
                -{counter.step}
              </button>
              <button
                onClick={() => increment(counter.id)}
                className="increment">
                +{counter.step}
              </button>
              <button onClick={() => reset(counter.id)} className="reset">
                Reset
              </button>
              <button
                onClick={() => deleteCounter(counter.id)}
                className="delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CounterTiles;