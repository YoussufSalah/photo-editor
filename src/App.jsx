import { useState } from "react";
import Slider from "./components/Slider";
import SidebarItem from "./components/SidebarItem";
import "./App.css";

const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
];

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [opts, setOpts] = useState(DEFAULT_OPTIONS);
  const selectedOption = opts[selectedIndex];

  function handleSliderChange({ target }) {
    setOpts((prevOpts) => {
      return prevOpts.map((opt, index) => {
        if (index !== selectedIndex) return opt;
        return { ...opt, value: target.value };
      });
    });
  }

  function getImageStyle() {
    const filters = opts.map((opt) => {
      return `${opt.property}(${opt.value}${opt.unit})`;
    });
    return { filter: filters.join(" ") };
  }
  console.log(getImageStyle());

  return (
    <div className="container">
      <div className="main-image" style={getImageStyle()}></div>
      <aside>
        {opts.map((opt, index) => {
          return (
            <SidebarItem
              key={index}
              name={opt.name}
              active={index === selectedIndex}
              handleClick={() => setSelectedIndex(index)}
            />
          );
        })}
      </aside>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
    </div>
  );
}

export default App;
