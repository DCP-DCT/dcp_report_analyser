import * as React from "react";
import { useEffect, useState } from "react";
import { FilePicker } from "react-file-picker-preview";
import NodeInspector from "./NodesInspector/NodesInspector";

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
      <h1>Hello world</h1>
      <FilePicker
        className="button"
        buttonText="Upload a file!"
        extensions={["application/json"]}
        onChange={(file) => setFile(file)}
        onError={(error) => {
          alert("that's an error: " + error);
        }}
        onClear={() => setFile(null)}
      >
        The file picker
      </FilePicker>
      <NodeInspector nodeString={inputString} />
    </div>
  );
};

export default App;
