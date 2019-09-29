import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const uuidv4 = require('uuid/v4');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.pantryName = '';
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date();
    const newPantry = {
      note: 'This Item Was Created At:  ',
      item: this.state.pantryName,
      id: uuidv4(),
      timeStamp: date.toString(),
    };
    this.props.createNewPantry(newPantry);
    this.setState({ pantryName: '' });
  };

  handleDelete = (event, id) => {
    event.preventDefault();
    this.props.removeOldPantry(id);
  };

  handleUpdate = (event, id) => {
    event.preventDefault();
    const date = new Date();
    const updatedPantry = {};
    updatedPantry.updatedNote = 'You Updated This Item at:  ';
    updatedPantry.id = id;
    updatedPantry.item = this.state.pantryName;
    updatedPantry.newTimeStamp = date.toString();
    this.props.updateOldPantry(updatedPantry);
    this.handleChange(event, id);
  };

  render() {
    return (
      <>

        <div>
        {
          this.props.pantries.map((pantry, i) => {
            return (
      <div key={i}>
                <p>Thanks for adding {pantry.item} to the Pantry!!</p>
                <p>Your Super Special Id is:  {pantry.id}</p>
                <p>{pantry.note}{pantry.timeStamp}</p>
                <p>{pantry.updatedNote}{pantry.newTimeStamp}</p>
                <button
                  onClick={(event) => this.handleUpdate(event, pantry.id) }
                  placeholder={ 'Enter a New Name for this item.' }
                >Update Pantry</button>
                <button onClick={(event) => this.handleDelete(event, pantry.id) }
                > DELETE </button>
      </div>
            );
          })
        }

        <form onSubmit = { this.handleSubmit }>
          <input
            type= 'text'
            name='pantryName'
            value={ this.state.pantryName }
            onChange={ this.handleChange }
            placeholder={ 'Add to the Pantry, Bro' }
          />
          <button type='submit'> Add to the pantry! </button>
        </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    pantries: store.pantries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewPantry: (newPantry) => {
      dispatch({
        type: 'PANTRY_CREATE',
        payload: newPantry,
      });
    },
    removeOldPantry: (id) => {
      dispatch({
        type: 'PANTRY_DELETE',
        payload: id,
      });
    },
    updateOldPantry: (id) => {
      dispatch({
        type: 'PANTRY_UPDATE',
        payload: id,
      });
    },
  };
};

App.propTypes = {
  pantries: PropTypes.array,
  createNewPantry: PropTypes.func,
  handleDelete: PropTypes.func,
  removeOldPantry: PropTypes.func,
  updateOldPantry: PropTypes.func,

};
export default connect(mapStateToProps, mapDispatchToProps)(App);
