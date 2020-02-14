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

const mapFunctions = {
  "All inputs": "A",
  Roll: "R",
  Pitch: "P",
  Tap: "TE",
  Swipe: "SE"
};

let fileData = [];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
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
        params: { multiplier: 1 },
        start_time: 0,
        end_time: 0
      },
      shift: {
        function: "All inputs",
        scope: "Whole File",
        params: { time: 1 },
        start_time: 0,
        end_time: 0
      },
      amplitude: {
        function: "Roll",
        scope: "Whole File",
        params: { multiplier: 1, floor: 0.005 },
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

  handleStart(e, name) {
    this.setState({
      [name]: { ...this.state[name], start_time: +e.target.value }
    });
  }

  handleStop(e, name) {
    this.setState({
      [name]: { ...this.state[name], end_time: +e.target.value }
    });
  }

  handleParam(e, name, param) {
    this.setState({
      [name]: {
        ...this.state[name],
        params: { ...this.state[name].params, [param]: +e.target.value }
      }
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
              <input
                type="number"
                className="input-text"
                onChange={e => this.handleStart(e, mapNames[name])}
                value={this.state[mapNames[name]].start_time}
                disabled={this.state[mapNames[name]].scope === "Whole File"}
              />
            </div>
          </div>
          <div className="option-container">
            <div style={{ display: "table-cell" }}>Stop:</div>
            <div style={{ display: "table-cell" }}>
              <input
                type="number"
                className="input-text"
                onChange={e => this.handleStop(e, mapNames[name])}
                value={this.state[mapNames[name]].end_time}
                disabled={this.state[mapNames[name]].scope === "Whole File"}
              />
            </div>
          </div>
        </div>
        <div className="column" id="column4">
          {rowdata.params &&
            rowdata.params.map((val, index) => (
              <div className="option-container">
                <div style={{ display: "table-cell" }}>{val}:</div>
                <div style={{ display: "table-cell" }}>
                  <input
                    type="number"
                    className="input-text"
                    onChange={e => this.handleParam(e, mapNames[name], val)}
                    value={this.state[mapNames[name]].params[val]}
                  />
                </div>
              </div>
            ))}
          <button id={mapNames[name]} onClick={this.handleClick}>
            Apply{" "}
          </button>
        </div>
      </div>
    );
  }

  handleClick(e) {
    const {
      start_time,
      end_time,
      mute,
      neutral,
      expand_contract,
      amplitude,
      shift
    } = this.state;
    switch (e.target.id) {
      case mapNames.Mute: {
        console.log("1");
        if (confirm("Are you sure you want to save ?")) {
          fileData = fileData.filter(
            val =>
              !(
                val.start >= mute.start_time &&
                val.end <= mute.end_time &&
                val.end - mute.end_time < mute.end_time - val.start &&
                (val.type == mapFunctions[mute.function] ||
                  mute.function == "All inputs")
              )
          );
          console.log(fileData);
        }
        break;
      }
      case mapNames.Neutral: {
        console.log("2");

        if (confirm("Are you sure you want to save ?")) {
          fileData.forEach((val, index) => {
            const startDiff = neutral.end_time - val.start;
            const endDiff = val.end - neutral.end_time;
            if (
              val.start >= neutral.start_time &&
              val.end <= neutral.end_time &&
              endDiff < startDiff &&
              val.type == "R"
            ) {
              fileData[index].lastdata = 0.5;
            }
          });
        }
        console.log(fileData);
        break;
      }
      case mapNames["Expand/Contract"]: {
        console.log("3");
        break;
      }
      case mapNames.Shift: {
        console.log("4");
        break;
      }
      case mapNames.Amplitude: {
        if (confirm("Are you sure you want to save ?")) {
          fileData.forEach((val, index) => {
            const startDiff = amplitude.end_time - val.start;
            const endDiff = val.end - amplitude.end_time;
            if (
              val.start >= amplitude.start_time &&
              val.end <= amplitude.end_time &&
              endDiff < startDiff &&
              val.type == "R"
            ) {
              let newValue;
              if (val.lastdata < 0.5) {
                newValue = 0.5 - val.lastdata;
                if (newValue > amplitude.params.floor) {
                  newValue *= amplitude.params.multiplier;
                  fileData[index].lastdata = 0.5 - newValue;
                }
              } else {
                // Value is above 0.5
                newValue = -0.5 + val.lastdata;
                if (newValue > amplitude.params.floor) {
                  newValue *= amplitude.params.multiplier;
                  fileData[index].lastdata = 0.5 + newValue;
                }
              }
            }
          });
        }
        console.log(fileData);
        break;
      }
    }
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
          const start_time = +line.slice(line.indexOf(":") + 1, -1);
          this.setState({
            start_time,
            mute: { ...this.state.mute, start_time },
            neutral: { ...this.state.neutral, start_time },
            expand_contract: {
              ...this.state.expand_contract,
              start_time
            },
            shift: { ...this.state.shift, start_time },
            amplitude: { ...this.state.amplitude, start_time }
          });
        }
        if (line.match(/main_gameplay_end/g)) {
          const end_time = +line.slice(line.indexOf(":") + 1, -1);
          this.setState({
            end_time,
            mute: { ...this.state.mute, end_time },
            neutral: { ...this.state.neutral, end_time },
            expand_contract: {
              ...this.state.expand_contract,
              end_time
            },
            shift: { ...this.state.shift, end_time },
            amplitude: { ...this.state.amplitude, end_time }
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
          if (type === "R" || type === "P" || type === "SE" || type === "TE") {
            fileData.push({ start, end, type, lastdata, extradata });
          }
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
