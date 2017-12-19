import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFolderStructure } from '../../../action/fileSelect/fileSelect.action';
import File from './file';

class FileSelectModalTable extends PureComponent {
  constructor(props) {
    super(props);
    this.openDirectory = this.openDirectory.bind(this);
  }

  componentDidMount() {
    this.props.getFolderStructure();
  }

  openDirectory(file) {
    if (file.isDirectory) {
      this.props.getFolderStructure(file.path);
    }
  }

  render() {
    const { files, setFileActive, activePath } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Size</th>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file =>
            (
              <File
                key={file.path}
                isActive={file.path === activePath}
                onClick={() => setFileActive(file)}
                onDoubleClick={this.openDirectory}
                {...file}
              />
            ))}
        </tbody>
      </table>
    );
  }
}

FileSelectModalTable.propTypes = {
  files: PropTypes.shape({
    isDirectory: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  getFolderStructure: PropTypes.func.isRequired,
  setFileActive: PropTypes.func.isRequired,
  activePath: PropTypes.string,
};

FileSelectModalTable.defaultProps = {
  files: [],
  activePath: null,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  getFolderStructure,
})(FileSelectModalTable);
