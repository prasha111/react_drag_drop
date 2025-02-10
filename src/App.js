import './App.css';
import { useState } from 'react';

function App() {
  const [listOne, setListOne] = useState([1, 2, 3, 4, 5]);
  const [listTwo, setListTwo] = useState([6, 7, 8, 9, 10]);
  const [itemDrag, setItemDrag] = useState(null);

  // Store the dragged item's ID
  const onDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    setItemDrag(Number(e.target.id));
  };

  // Allow dropping
  const allowDrop = (e) => {
    e.preventDefault();
  };

  // Handle drop event
  const onDrop = (e) => {
    e.preventDefault();
    const droppedItem = Number(e.dataTransfer.getData("text/plain"));
    const targetList = e.target.id;
    console.log(e.target.id)
    if (listOne.includes(droppedItem) && listTwo.includes(Number(targetList))) {
      setListOne((prevList) => prevList.filter((item) => item !== droppedItem));
      setListTwo((prevList) => [...prevList, droppedItem]);
    }

    if (listTwo.includes(droppedItem) && listOne.includes(Number(targetList))) {
      setListTwo((prevList) => prevList.filter((item) => item !== droppedItem));
      setListOne((prevList) => [...prevList, droppedItem]);
    }
  };

  return (
    <div className="App">
      <h1>Drag and Drop</h1>
      <div className="list-flex">
        {/* List One */}
        <div
          id="list-one"
          className="list-one"
          onDrop={onDrop}
          onDragOver={allowDrop}
        >
          {listOne.map((item) => (
            <div
              key={item}
              id={item}
              draggable={true}
              onDragStart={onDragStart}
              className="draggable-item"
            >
              {item}
            </div>
          ))}
        </div>

        {/* List Two */}
        <div
          id="list-two"
          className="list-two"
          onDrop={onDrop}
          onDragOver={allowDrop}
        >
          {listTwo.map((item) => (
            <div
              key={item}
              id={item}
              draggable={true}
              onDragStart={onDragStart}
              className="draggable-item"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;