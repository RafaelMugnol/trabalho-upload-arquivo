import React, { Component } from 'react';

// Services
import api from '../../services/api';

// Images
import logo from '../../assets/logo2.svg';

// CSS
import './style.css';

export default class Main extends Component {
  state = {
    newBox: ''
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { newBox } = this.state;

    const { history } = this.props;

    const response = await api.post('boxes', {
      title: newBox
    });

    history.push(`box/${response.data._id}`);
  };

  handleInputChange = e => {
    this.setState({
      newBox: e.target.value
    });
  };

  render() {
    const { newBox } = this.state;

    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt="Logo" />
          <input
            value={newBox}
            onChange={this.handleInputChange}
            placeholder="Nome do Aluno"
          />
          <button type="submit">Criar / Acessar</button>
        </form>
      </div>
    );
  }
}
