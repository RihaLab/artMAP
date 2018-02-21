import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from 'material-ui';
import { connect } from 'react-redux';
import { openDirectory, markFile, unmarkFile } from '../../../action';
import { Modal } from '../../../component';
import FileList from '../component/fileList';
import { FileProps } from '../../../propTypes';

class FileModalContainer extends Component {
  constructor(props) {
    super(props);
    this.markFile = this.markFile.bind(this);
    this.isFileValidToMark = this.isFileValidToMark.bind(this);
    this.isSubmitBtnDisabled = this.isSubmitBtnDisabled.bind(this);
    this.openFolder = this.openFolder.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      markedFile: null,
    };
  }

  isFileValidToMark(fileToMark) {
    const { isDirSelect } = this.props;
    if (isDirSelect && fileToMark.isDirectory) {
      return true;
    }
    return !isDirSelect && !fileToMark.isDirectory;
  }

  markFile(fileToMark) {
    if (!this.isFileValidToMark(fileToMark)) {
      return null;
    }
    if (this.state.markedFile === fileToMark) {
      return this.setState({ markedFile: null });
    }
    return this.setState({ markedFile: fileToMark });
  }

  isSubmitBtnDisabled() {
    const { markedFile } = this.state;
    if (!markedFile) {
      return true;
    }
    return !this.isFileValidToMark(markedFile);
  }

  openFolder(file) {
    this.setState({ markedFile: null });
    if (file.isDirectory) {
      this.props.openDirectory(file.path);
    }
  }

  handleClose() {
    this.props.onClose(this.state.markedFile);
  }

  render() {
    const { props } = this;

    const modalContent = (
      <div>
        <Typography type="subheading" gutterBottom>{props.path}</Typography>
        <FileList
          activeFile={this.state.markedFile}
          fileStructure={props.fileStructure}
          onItemClick={this.markFile}
          onItemDblClick={this.openFolder}
        />
      </div>
    );

    const modalActions = (
      <div>
        <Button color="primary" onClick={props.handleClose}>Cancel</Button>
        <Button disabled={this.isSubmitBtnDisabled()} color="primary" onClick={this.handleClose}>
          Ok
        </Button>
      </div>
    );

    return (
      <Modal
        title={props.title}
        isOpen={props.isOpen}
        onOpen={() => props.openDirectory()}
        onClose={props.handleClose}
        content={modalContent}
        actions={modalActions}
      />
    );
  }
}

FileModalContainer.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
  isDirSelect: PropTypes.bool,
  fileStructure: PropTypes.arrayOf(PropTypes.shape(FileProps)),
  openDirectory: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

FileModalContainer.defaultProps = {
  isOpen: false,
  isDirSelect: false,
  fileStructure: [],
  path: '',
};

const mapStateToProps = state => ({
  path: state.fileSelect.path,
  fileStructure: state.fileSelect.structure,
  activeFile: state.fileSelect.activeFile,
});

export default connect(mapStateToProps, {
  openDirectory,
  markFile,
  unmarkFile,
})(FileModalContainer);
