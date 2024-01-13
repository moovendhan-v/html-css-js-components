import React from 'react';

const IframeCard = () => {
  return (
    <div className="box">
      <iframe
        width="100%"
        height="100%"
        src="https://cdpn.io/Moovendhan-Agriculture/fullpage/JjzKERr?nocache=true&view="
        title="Embedded Video"
      ></iframe>
      <div className="d-flex justify-content-between">
        <div>
          <span>user</span>
        </div>
        <div className="d-flex">
          <span>{`Views: 100`}</span>
          {/* <span onClick={onSave}>{`Save`}</span> */}
        </div>
      </div>
    </div>
  );
};

export default IframeCard;
