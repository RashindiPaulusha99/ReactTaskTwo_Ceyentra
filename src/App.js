
import React, { useState } from "react";
import "./assets/Styles/styles.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import Data from "./Data/Data";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {

  const [text, settext] = useState("");
  const [state, setstate] = useState(Data);

  const handleDragEnd = ({ destination, source }) => {
    console.log("from", source);
    console.log("to", destination);
    if (!destination) {
      console.log("not droped in droppable");
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.draggableId
    ) {
      console.log("droped in same place");
      return;
    }

    const itemCopy = { ...state[source.droppableId].items[source.index] };
    
    setstate((prev) => {
      prev = { ...prev };
      prev[source.droppableId].items.splice(source.index, 1);
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      return prev;
    });
  };

  const additem = () => {
    setstate((prev) => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text
            },
            ...prev.todo.items
          ]
        }
      };
    });
    settext("");
  };
  return (
    <>
      <div>
        
         <TextField
          label="Todo"
          id="outlined-size-small"
          size="small"
          type="text"
          className="input"
          value={text}
          onChange={(e) => settext(e.target.value)}
        />
        <Button color="secondary" variant="contained" size="small" className="button" onClick={additem}>
          Add New
        </Button>
        
      </div>

      <div className="App">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className={"column"}>
                <h3 className="heading">{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && "dragging"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {" "}
                                    {el.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
          
        </DragDropContext>
      </div>
    </>
  );
}

export default App;