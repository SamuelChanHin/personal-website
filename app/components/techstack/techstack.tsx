import React from "react";

const frontendStacks = [
  "nextjs",
  "react",
  "redux",
  "sass",
  "tailwindcss",
  "css",
  "html",
  "js",
  "ts",
];
const backendStacks = ["nodejs", "nestjs", "express", "ts"];
const databaseStacks = ["postgres", "redis", "dynamodb", "MS SQL SERVER"];
const cloudStacks = ["aws"];
const devOpsStacks = [
  "docker",
  "kubernetes",
  "nginx",
  "ubuntu",
  "github",
  "gitlab",
];

function TechStack() {
  return (
    <div className="stackContainer">
      <div className="stack">
        <div className="stackName">Frontend</div>
        <div className="stackIcons box">
          {frontendStacks.map((name) => {
            return <img src={`https://skillicons.dev/icons?i=${name}`} />;
          })}
        </div>
      </div>
      <div className="stack">
        <div className="stackName">Backend</div>
        <div className="stackIcons  box">
          {backendStacks.map((name) => {
            return <img src={`https://skillicons.dev/icons?i=${name}`} />;
          })}
        </div>
      </div>

      <div className="stack">
        <div className="stackName">Database</div>
        <div className="stackIcons box">
          {databaseStacks.map((name) => {
            return <img src={`https://skillicons.dev/icons?i=${name}`} />;
          })}
        </div>
      </div>
      <div className="stack">
        <div className="stackName">Infrastructure & framework</div>
        <div className="stackIcons box">
          {[...cloudStacks, ...devOpsStacks].map((name) => {
            return <img src={`https://skillicons.dev/icons?i=${name}`} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default TechStack;
