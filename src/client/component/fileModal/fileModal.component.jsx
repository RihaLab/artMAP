import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography } from 'material-ui';
import { connect } from 'react-redux';
import { openDirectory, markFile, unmarkFile } from '../../action';
import FileModalTable from './fileModalTable';
import { filePropType } from './fileModalTableRow';

const fileModalContainer = (props) => {
  const onSubmit = () => {
    props.closeModal();
    props.selectFile(props.activeFile.path);
  };

  const isSubmitBtnDisabled = () => {
    if (!props.activeFile) {
      return true;
    }
    return (props.isDirSelect && !props.activeFile.isDirectory) ||
      (!props.isDirSelect && props.activeFile.isDirectory);
  };

  return (
    <Dialog
      open={props.isOpen}
      onEnter={() => props.openDirectory()}
      onClose={props.closeModal}
      maxWidth={false}
      disableBackdropClick
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <Typography type="subheading" gutterBottom>{props.path}</Typography>
        <FileModalTable {...props} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.closeModal}>Cancel</Button>
        <Button disabled={isSubmitBtnDisabled()} color="primary" onClick={onSubmit}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

fileModalContainer.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
  isDirSelect: PropTypes.bool,
  fileStructure: PropTypes.arrayOf(filePropType),
  openDirectory: PropTypes.func.isRequired,
  selectFile: PropTypes.func.isRequired,
  markFile: PropTypes.func.isRequired,
  unmarkFile: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  activeFile: filePropType,
};

fileModalContainer.defaultProps = {
  isOpen: false,
  isDirSelect: false,
  fileStructure: [],
  path: '',
  activeFile: null,
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
})(fileModalContainer);
