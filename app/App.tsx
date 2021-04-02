import * as React from "react";
import { useEffect, useState } from "react";
import { FilePicker } from "react-file-picker-preview";
import NodeInspector from "./NodesInspector/NodesInspector";
import "./index.css";

const App = () => {
  const [file, setFile] = useState<File>(null);
  const [inputString, setInputString] = useState(null);

  useEffect(() => {
    if (file !== null) {
      file.arrayBuffer().then((data) => {
        const enc = new TextDecoder("utf-8");

        setInputString(enc.decode(data));
      });
    }
  }, [file]);

  return (
    <div>
      <h1>DCP report analyser</h1>
      <FilePicker
        className="file-input"
        maxSize={1000}
        style={file && {paddingBottom: '30px'}}
        buttonText="Upload a file!"
        extensions={["application/json"]}
        onChange={(file) => setFile(file)}
        onError={(error) => {
          alert("that's an error: " + error);
        }}
        onClear={() => setFile(null)}
      />
      <NodeInspector nodeString={inputString} />
    </div>
  );
};

export default App;
