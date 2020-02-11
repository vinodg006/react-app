import React from "react";
import { RowComponent } from "../components/RowComponent";
import data from "../data";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRow(rowdata, name) {
    return (
      <div className="row-container">
        <div className="column" id="column1">
          {name} :
        </div>
        <div className="column" id="column2">
          {rowdata.functions.map((val, index) => (
            <div keys={index} className="option-container">
              <div style={{ display: "table-cell" }}>
                <input type="radio" className="input-radio" />
              </div>
              <div style={{ display: "table-cell" }}>{val}</div>
            </div>
          ))}
        </div>
        <div className="column" id="column3">
          {rowdata.scope.map((val, index) => (
            <div keys={index} className="option-container">
              <div style={{ display: "table-cell" }}>
                <input type="radio" className="input-radio" />
              </div>
              <div style={{ display: "table-cell" }}>{val}</div>
            </div>
          ))}
          <div className="option-container">
            <div style={{ display: "table-cell" }}>Start:</div>
            <div style={{ display: "table-cell" }}>
              <input type="text" className="input-text" />
            </div>
          </div>
          <div className="option-container">
            <div style={{ display: "table-cell" }}>Stop:</div>
            <div style={{ display: "table-cell" }}>
              <input type="text" className="input-text" />
            </div>
          </div>
        </div>
        <div className="column" id="column4">
          {rowdata.params &&
            rowdata.params.map((val, index) => (
              <div className="option-container">
                <div style={{ display: "table-cell" }}>{val}:</div>
                <div style={{ display: "table-cell" }}>
                  <input type="text" className="input-text" />
                </div>
              </div>
            ))}
          <button>Apply </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="app-container">
        {this.renderRow(data.mute, "Mute")}
        {this.renderRow(data.neutral, "Neutral")}
        {this.renderRow(data.expand_contract, "Expand/Contract")}
        {this.renderRow(data.shift, "Shift")}
        {this.renderRow(data.amplitude, "Amplitude")}
      </div>
    );
  }
}

export default App;
