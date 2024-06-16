import React from 'react';
import '../css/step-overview.css';

function StepOverviewComponent({ title, subtitle, description, image }) {
  return (
    <div className="page__container">
      <div className="content">
        <div className="center-container-always">
          <div className="step__overview">
            <div className="text-container">
              <h1>{title}</h1>
              <h4>{subtitle}</h4>
              <h6>{description}</h6>
            </div>
            <div className="image-container">
              <img src={image} alt={title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepOverviewComponent;
