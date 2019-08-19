import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import DraggableBox from './DraggableBox';

const DraggableList = SortableContainer(({colors, deleteColor}) => {
    return (
        <div style={{height: '100%'}}>
            {colors.map((color, index) => (
                <DraggableBox 
                    index={index} 
                    background={color.color} 
                    name={color.name} 
                    key={color.name} 
                    deleteColor={deleteColor}
                />
            ))}
        </div>
    )
});

export default DraggableList;
