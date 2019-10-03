import React from 'react';
import UploadCloud from './Icons/UploadCloud.js';
import remove from '../ASSETS/remove.svg';

import '../SASS/ProjectForm.scss';

import { useDropzone } from 'react-dropzone';

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

export function MultiImageUpload(props) {
  const { files, setFiles } = props.filesArray;
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles([
        ...files,
        ...acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      ]);
    }
  });

  const thumbs = () => {
    const removeThumbnail = index => {
      const newList = files.filter((file, i) => files[index] !== file);
      setFiles(newList);
    };
    return files.map((file, index) => (
      <div key={index}>
        <img
          alt=""
          src={remove}
          className="remove"
          onClick={() => removeThumbnail(index)}
        />
        <div className="thumb" key={index}>
          <div style={thumbInner}>
            <img
              alt="project thumbnail"
              src={file.preview}
              className="thumbnail"
            />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className="image-dropzone-container">
      <div
        {...getRootProps({ className: 'dropzone' })}
        className="upload-container"
      >
        <input {...getInputProps()} multiple={true} />
        <div className="drop-text-container">
          <UploadCloud />
          <p className="drop-text">drag and drop images or click here</p>
        </div>
      </div>
      <aside className="thumbnail-container">{thumbs()}</aside>
    </section>
  );
}
