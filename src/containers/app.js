import React from "react";
import { RowComponent } from "../components/RowComponent";
import data from "../data";

const mapNames = {
  Mute: "mute",
  Neutral: "neutral",
  "Expand/Contract": "expand_contract",
  Shift: "shift",
  Amplitude: "amplitude"
};

let fileData = [];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start_time: 0,
      end_time: 0,
      file: "",
      mute: {
        function: "All inputs",
        scope: "Whole File",
        start_time: 0,
        end_time: 0
      },
      neutral: {
        function: "Roll",
        scope: "Specific Section",
        start_time: 0,
        end_time: 0
      },
      expand_contract: {
        function: "Roll",
        scope: "Whole File",
        params: "multiplier",
        start_time: 0,
        end_time: 0
      },
      shift: {
        function: "All inputs",
        scope: "Whole File",
        params: "time",
        start_time: 0,
        end_time: 0
      },
      amplitude: {
        function: "Roll",
        scope: "Whole File",
        params: "multiplier",
        start_time: 0,
        end_time: 0
      }
    };
  }

  onFunctionChange(e, name) {
    this.setState({
      [name]: { ...this.state[name], function: e.target.value }
    });
  }

  onScopeChange(e, name) {
    this.setState({
      [name]: { ...this.state[name], scope: e.target.value }
    });
  }

  renderRow(rowdata, name) {
    return (
      <div className="row-container">
        <div className="column" id="column1">
          {name} :
        </div>
        <div className="column" id="column2">
          {rowdata.functions.map((val, index) => (
            <div key={index} className="option-container">
              <div style={{ display: "table-cell" }}>
                <input
                  type="radio"
                  className="input-radio"
                  value={val}
                  key={`${name}-${val}`}
                  checked={this.state[mapNames[name]].function === val}
                  onChange={e => this.onFunctionChange(e, mapNames[name])}
                />
              </div>
              <div style={{ display: "table-cell" }}>{val}</div>
            </div>
          ))}
        </div>
        <div className="column" id="column3">
          {rowdata.scope.map((val, index) => (
            <div key={index} className="option-container">
              <div style={{ display: "table-cell" }}>
                <input
                  type="radio"
                  className="input-radio"
                  key={`${name}-${val}`}
                  value={val}
                  checked={this.state[mapNames[name]].scope === val}
                  onChange={e => this.onScopeChange(e, mapNames[name])}
                />
              </div>
              <div style={{ display: "table-cell" }}>{val}</div>
            </div>
          ))}
          <div className="option-container">
            <div style={{ display: "table-cell" }}>Start:</div>
            <div style={{ display: "table-cell" }}>
              <input type="number" className="input-text" />
            </div>
          </div>
          <div className="option-container">
            <div style={{ display: "table-cell" }}>Stop:</div>
            <div style={{ display: "table-cell" }}>
              <input type="number" className="input-text" />
            </div>
          </div>
        </div>
        <div className="column" id="column4">
          {rowdata.params &&
            rowdata.params.map((val, index) => (
              <div className="option-container">
                <div style={{ display: "table-cell" }}>{val}:</div>
                <div style={{ display: "table-cell" }}>
                  <input type="number" className="input-text" />
                </div>
              </div>
            ))}
          <button>Apply </button>
        </div>
      </div>
    );
  }

  handleFile(e) {
    var reader = new FileReader();

    // Read file into memory
    reader.readAsText(e.target.files[0]);
    reader.onload = () => {
      const file = reader.result;
      let startIndex = -1;
      this.setState({ file });
      const allLines = file.split(/\r\n|\n/);
      // Reading line by line
      allLines.forEach((line, index) => {
        // console.log(line, index);
        if (line.match(/main_gameplay_start/g)) {
          this.setState({
            start_time: +line.slice(line.indexOf(":") + 1, -1)
          });
        }
        if (line.match(/main_gameplay_end/g)) {
          this.setState({
            end_time: +line.slice(line.indexOf(":") + 1, -1)
          });
        }
        if (line.match(/GAME_CONFIG_END/g)) {
          startIndex = index;
        }
        if (startIndex !== -1 && index > startIndex) {
          const start = +line.slice(0, line.indexOf("|"));
          const linemstart = line.slice(line.indexOf("|") + 1);
          const end = +linemstart.slice(0, linemstart.indexOf("|"));
          const linemend = linemstart.slice(linemstart.indexOf("|") + 1);
          const type = linemend.slice(0, linemend.indexOf("|"));
          const linemtype = linemend.slice(linemend.indexOf("|") + 1);
          const lastdata = +linemtype.slice(0, linemtype.indexOf("|"));
          const extradata = linemtype.slice(linemtype.indexOf("|") + 1);
          fileData.push({ start, end, type, lastdata, extradata });
        }
      });
      console.log(fileData, "Vinod");
    };

    reader.onerror = function() {
      console.log(reader.error);
    };
  }

  render() {
    // console.log(this.state);
    return (
      <div className="app-container">
        <input type="file" id="file" onChange={this.handleFile.bind(this)} />
        <div style={{ display: "inline-block", margin: "0 15px 0 0" }}>
          Start: {this.state.start_time}
        </div>
        <div style={{ display: "inline-block" }}>
          End: {this.state.end_time}
        </div>
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
