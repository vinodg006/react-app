import React, { Fragment } from "react";

class Options extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOptionClick(index) {}

  render() {
    const { element } = this.props;
    return (
      <Fragment>
        {element.map((val, index) => (
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
      </Fragment>
    );
  }
}

export default Options;
