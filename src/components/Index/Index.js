import React from 'react';
import firebase from 'firebase/app';
import { withRouter } from 'react-router-dom';
import { Button, Overlay, Spinner } from '@blueprintjs/core';
import './Index.scss';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      isRedirecting: false
    };
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect() {
    const db = firebase.firestore();
    const { history } = this.props;
    this.setState({
      isRedirecting: true
    });
    db.settings({ timestampsInSnapshots: true });
    db.collection(process.env.REACT_APP_CRAFTS_COLLECTION)
      .add({
        created: Date.now()
      })
      .then(docRef => {
        history.push(`/new/${docRef.id}`);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Overlay className="overlay" isOpen={this.state.isRedirecting} canEscapeKeyClose={false} canOutsideClickClose={false} >
          <Spinner intent="primary" size={Spinner.SIZE_LARGE} />
        </Overlay>
        <Button intent="primary" onClick={this.handleRedirect}>
          New Craft
        </Button>
      </React.Fragment>
    );
  }
}

export default withRouter(Index);
