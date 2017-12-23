import React, { Component } from 'react';
import Person from '../Person/Person';
import classes from './People.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class People extends Component {
    state = {
            people: [
                {
                    id: 0,
                    name: 'John',
                    age: 30,
                    employed: false,
                    hobbies: ['computers', 'games', 'movies', 'reading']
                },
                {
                    id: 1,
                    name: 'Jane',
                    age: 20,
                    employed: false,
                    hobbies: ['drinking', 'dancing', 'cute stuff']
                },
                {
                    id: 2,
                    name: 'June',
                    age: 30,
                    employed: true,
                    hobbies: ['pachinko', 'martial arts']
                }
            ],
            showPersons: false
    }
    

    handlePerson = (newName, index = 0) => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.people[index].name = newName;
            
            return newState;
        })
    }

    // deep clone: clone both the array AND the object that we want to modify

    // if we just clone the array into a new reference then modify one of its objects, we are actually modifying the original object on the original array, because they have the same reference!
    nameChangedHandler = (i, e) => {  
        const value = e.target.value;     
        this.setState(prevState => {
            const newPeople = [...prevState.people];
            const selected = newPeople.findIndex(person => Number(person.id) === Number(i));
            const wanted = {...newPeople[selected]};
            wanted.name = value
            newPeople[selected] = wanted;
            return { people: newPeople }
        })
    }   

    togglePersonsHandler = () => {
        this.setState(prevState => ({
            showPersons: !prevState.showPersons
        }))
    }

    deletePersonHandler = k => {        
        this.setState(prevState => {
            const newPeople = Object.assign([], prevState.people);
            const toBeDeleted = newPeople.findIndex(person => person.id === Number(k));
            newPeople.splice(toBeDeleted, 1);
            return {people: newPeople};
        })
    }

    render() {

        let persons = null;
        const btnClasses = [];
        btnClasses.push(classes.btn);

        if (this.state.showPersons) {
            persons = (
                <div>

                    {this.state.people.map((person, index) => (
                        <ErrorBoundary key= { person.id }>
                        <Person 
                        name = { person.name } 
                        age = { person.age } 
                        employed = { person.employed } 
                        hobbies = { person.hobbies } 
                        id = { person.id }                         
                        nameChangedHandler = { this.nameChangedHandler.bind(this, person.id) }
                        click={ this.deletePersonHandler.bind(this, person.id) }
                        />                        
                        </ErrorBoundary>)                        
                    )}                    
                    </div>                   
            );

            btnClasses.push(classes['btn--red']);
            
        }

        const classesAdded = [];

        classesAdded.push(classes.subtitle);

        if (this.state.people.length <= 2) {
            classesAdded.push(classes.red);
        }
        if (this.state.people.length <= 1) {
            classesAdded.push(classes.bold);
        }

        return (            
            <div>
                { 
                    /*
                    DO NOT USE () => ... (this way you call 2 functions instead of just one, performance hit)

                    USE this.fn.bind(...)
                    */
                }
                <p className={classesAdded.join(' ')}>Welcome to React App!!</p>

                <button onClick={ this.togglePersonsHandler } className={ btnClasses.join(' ') }>Toggle persons!</button>
               
                {persons}                
            </div>           
        )
    }
}

export default People;