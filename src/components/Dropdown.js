import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';

const dropdown = (props) => {
    // console.log('Dropdown props are', props);
    return (
        <div>
            <Dropdown onSelect ={props.onClick}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                {props.currentSelection}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/first_name" active={props.currentSelection === 'First Name'}>First Name</Dropdown.Item>
                    <Dropdown.Item href="#/last_name" active={props.currentSelection === 'Last Name'}>Last Name</Dropdown.Item>
                    <Dropdown.Item href="#/phone" active={props.currentSelection === 'Phone'}>Phone</Dropdown.Item>
                    <Dropdown.Item href="#/email" active={props.currentSelection === 'Email'}>Email</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default dropdown;