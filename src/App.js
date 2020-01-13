import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import TimelineGantt from "./TimelineGantt";

function App() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <TimelineGantt />
      </DndProvider>
    </div>
  );
}

export default App;
