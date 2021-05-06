import React from "react";
import {  Button, Modal } from "react-bootstrap";

export class Confirmation extends React.Component {
  render() {
    const {
      proceedLabel = "Yes",
      cancelLabel = "Cancel",
      title = "Are you sure?",
      confirmation = "Please confirm something",
      show = false,
      proceed = (ok) => { alert(`confirmed ${ok}`)},
      enableEscape = true
    } = this.props;
    
    return (
      <div className="static-modal">
        <Modal className="modal-dialog-confirmation"
          show={show}
          onHide={() => proceed(false)}
          backdrop={enableEscape ? true : "static"}
          keyboard={enableEscape}
        >
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{confirmation}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => proceed(false)}>{cancelLabel}</Button>
            <Button variant="secondary"
              className="button-l"             
              onClick={() => proceed(true)}
            >
              {proceedLabel}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

