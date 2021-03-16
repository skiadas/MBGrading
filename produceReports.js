import * as fs from "fs";
import Handlebars from "handlebars";

Handlebars.registerHelper({
  upper: (s) => s.toUpperCase(),
  lower: (s) => s.toLowerCase(),
  incr: (n, i) => n + i,
  max: (arr) => (arr.length == 0 ? null : Math.max(...arr)),
});
Handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and: (...args) => args.every(),
  or: (...args) => args.some(),
});

const contents = fs.readFileSync("data.json", "utf-8");
const data = JSON.parse(contents);
const groups = data.groups;
const students = data.data;
const thresholds = data.thresholds;

const template = Handlebars.compile(fs.readFileSync("template.hbs", "utf-8"));
let r = produceReport(students[0], groups, thresholds);
fs.writeFileSync("student1.html", r, "utf-8");

function produceReport(student, groups, thresholds) {
  const processedData = processData(student, groups, thresholds);
  return template(processedData);
}

function processData(student, groups, thresholds) {
  const { name, attempts, target } = student;
  const processedGroups = Object.entries(groups).map((group) =>
    processGroup(group, attempts)
  );
  return { name, groups: processedGroups, target, thresholds };
}

function processGroup([name, objectiveNames], attempts) {
  const objectives = objectiveNames.map((o) =>
    processObjective(o, attempts[o])
  );
  const total = Math.min(
    ...objectives.map((o) => o.total).filter((t) => t === +t)
  );
  return { name, total, objectives };
}

function processObjective(name, attempts) {
  const total = attempts.length === 0 ? null : Math.max(...attempts);
  return { name, total, attempts };
}
