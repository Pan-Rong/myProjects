import React from 'react';

function ComponentWithRegex(){
    return (
        <div>
            <h3>Only asc/desc are allowed:{match.params.direction}</h3>
        </div>
    )
}
export default ComponentWithRegex;