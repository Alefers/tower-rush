import React from 'react';

const  Target = (props) => {
    return (
        <div className={'target ' + props.type }>
            <div className="t-head"></div>
            <div className="t-shoulders"></div>
        </div>
    );
}

export default Target;