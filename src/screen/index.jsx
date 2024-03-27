import React, { useState, useRef, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import './style.css'



const Budget = () => {
    const [budget] = useState(5000);
    const [list, setList] = useState([]);
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('data'))
        if (localData !== null) {
            setList([...localData])
        }
    }, [])
    const nameRef = useRef();
    const costRef = useRef();
    function calculateTotal() {
        const sum = list.reduce((acc, curr) => {
            acc += curr.rupee;
            return acc;
        }, 0);
        return sum;
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const name = nameRef.current.value;
        const cost = Number.parseInt(costRef.current.value);
        setList([...list, { name: name, rupee: cost }])
        const localData = JSON.parse(localStorage.getItem('data'))
        if (localData === null) {
            localStorage.setItem('data', JSON.stringify([{ name: name, rupee: cost }]))
        }
        else {
            localStorage.setItem('data', JSON.stringify([...localData, { name: name, rupee: cost }]))
        }
        nameRef.current.value = ""
        costRef.current.value = ""
    }
    const deletefn = (delName) => {

        const updateFn = list.filter(item => item.name !== delName)
        localStorage.setItem('data', JSON.stringify([...updateFn]))
        setList([...updateFn])
    }
    return (
        <div className="main__container">
        
            <div className="container">
                <h1>My Budget Planner</h1>
            </div>
            <div>
                <div className="budget__cal__container">
                    <h4 className="budget__clr_name1">Budget: Rs.{budget}</h4>
                    <h4 className="budget__clr_name2"> Remaining: Rs.{budget - calculateTotal()}</h4>
                    <h4 className="budget__clr_name3">Spant so far:{calculateTotal()}</h4>
                </div>
            </div>
            <div className="container">
                <h3>Expenses</h3>
            </div>
            <div className="container">
                {list.length === 0 ? <h3 className="container__expenses">Add Data To List . . . . .</h3> : list.map((item) => {
                    return (
                        <div key={item.name} className="container__add__item">
                            <p>{item.name} </p>
                            <p> Rs.{item.rupee}<AiFillCloseCircle onClick={() => deletefn(item.name)} /> </p>
                        </div>
                    );
                })}
            </div>
            <div className="container mb-3">
                <h2>Add Expenses</h2>
            </div>
            <form className="container" onSubmit={(e) => handleSubmit(e)}>
                <div className="container__add__form" >
                    <div>
                        <label> Name :- </label>
                        <input type="text" ref={nameRef}
                        />
                    </div>
                    <div>
                        <label>Cost :- </label>
                        <input type="Number" ref={costRef}
                        />
                    </div>
                </div>
                <button type="submit" className="btn__submit"> Save  </button>
            </form>
        </div>
    );
}

export default Budget;