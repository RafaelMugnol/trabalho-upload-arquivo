import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

// Services
import api from '../../services/api';

// Images
import logo from '../../assets/logo2.svg';

// CSS
import './style.css';

export default class Box extends Component {
  state = {
    box: []
  };

  async componentDidMount() {
    this.subscribeToNewFiles();
    const { id } = this.props.match.params;
    const response = await api.get(`boxes/${id}`);
    const box = response.data;

    this.setState({
      box
    });
  }

  subscribeToNewFiles = () => {
    const { id } = this.props.match.params;
    const io = socket('https://3333-d0071a41-fceb-4767-9bc0-b4a9dfba6286.ws-us02.gitpod.io');

    io.emit('connectRoom', id);

    io.on('file', data => {
      this.setState({
        box: {
          ...this.state.box,
          files: [data, ...this.state.box.files]
        }
      });
    });
  };

  handleUpload = files => {
    files.forEach(file => {
      const data = new FormData();
      const { id } = this.props.match.params;
      data.append('file', file);

      api.post(`boxes/${id}/files`, data);
    });
  };

  render() {
    const { box } = this.state;
    const { files } = box;

    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="Logo" />
          <h1>{box.title}</h1>
        </header>

        <Dropzone onDropAccepted={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Arraste arquivos ou clique aqui</p>
            </div>
          )}
        </Dropzone>
        
        <ul>
          {files &&
            files.map(file => (
              <li key={file._id}>
                <a href={file.url} className="fileInfo">
                  <MdInsertDriveFile size={24} color="#a5cfff" />
                  <strong>{file.title}</strong>
                </a>
                <span>
                  há{' '}
                  {distanceInWords(file.createdAt, new Date(), {
                    locale: pt
                  })}
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
