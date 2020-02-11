const pagedata = {
  mute: {
    functions: ["All inputs", "Roll", "Pitch", "Tap", "Swipe"],
    scope: ["Whole File", "Specific Section"]
  },
  neutral: {
    functions: ["Roll"],
    scope: ["Specific Section"]
  },
  expand_contract: {
    functions: ["Roll", "Pitch"],
    scope: ["Whole File", "Specific Section"],
    params: ["multiplier"]
  },
  shift: {
    functions: ["All inputs", "Roll", "Pitch", "Tap", "Swipe"],
    scope:["Whole File", "Specific Section"],
    params: ["time"]
  },
  amplitude: {
    functions: ["Roll"],
    scope: ["Whole File", "Specific Section"],
    params: ["multiplier", "floor"]
  }
};

export default pagedata;
