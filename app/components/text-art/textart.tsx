import React from "react";

interface TextartProps {
  label: string;
  text: string;
}

function Textart({ label, text }: TextartProps) {
  return (
    <pre aria-label={label} className="text-art">
      {text}
    </pre>
  );
}

export default Textart;
