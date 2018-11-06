import React from 'react';
import firebase from 'firebase/app';
import shortid from 'shortid';
import './MainFrame.scss';

class MainFrame extends React.Component {
  constructor() {
    super();
    this.handleAction = this.handleAction.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    this.docRef = db
      .collection(process.env.REACT_APP_CRAFTS_COLLECTION)
      .doc(match.params.craftId);
  }

  handleAction(cmd, params) {
    console.log('MainFrame - handleAction', cmd, params);
    switch (cmd) {
      case 'ADD':
        this.docRef
          .update({
            actions: firebase.firestore.FieldValue.arrayUnion({
              id: shortid.generate(),
              action: 'ADD',
              ...params
            })
          })
          .catch(err => {
            console.log('Error updating document.', err);
          });
        break;

      default:
        break;
    }
  }

  render() {
    const { match } = this.props;
    console.log('craft id =', match.params.craftId);
    return (
      <main className="mainframe">
        <div className="config"></div>
        {/* 
          <RadioGroup
            label="Pick UI Framework"
            onChange={() => {}}
            large={true}
            selectedValue="blueprint"
          >
            <Radio value="blueprint" label="BlueprintJS" />
            <Radio value="ant" label="Ant" />
            <Radio value="material" label="Material UI" />
            <Radio value="evergreen" label="Evergreen" />
          </RadioGroup>
          <hr />
          <div
            style={{
              maxWidth: 200,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Button
              intent="primary"
              onClick={() =>
                this.handleAction('ADD', {
                  type: 'h1',
                  props: {},
                  children: 'This is an h1 header'
                })
              }
            >
              Add
            </Button>
            <Button intent="danger" onClick={() => this.handleAction('remove')}>
              Remove
            </Button>
            <Button
              intent="success"
              onClick={() => this.handleAction('update')}
            >
              Update
            </Button>
          </div>
          <hr />
          <h4>Components</h4>
          <Button
            intent="none"
            onClick={() =>
              this.handleAction('ADD', {
                component: 'Button',
                target: 'body'
              })
            }
          >
            Add Button
          </Button>*/}

        <div className="iframe-container">
          <div className="iframe-browser-header">
            <div className="iframe-browser-button" />
            <div className="iframe-browser-button" />
            <div className="iframe-browser-button" />
          </div>
          <iframe
            src={`${process.env.REACT_APP_CRAFT_FRAME_URL}/${
              match.params.craftId
            }`}
            width="100%"
            height="90%"
            title="Craft Frame"
          />
        </div>
      </main>
    );
  }
}

export default MainFrame;
