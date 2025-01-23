export default function parseHTML(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  let questions = doc.querySelectorAll(".question-pnl");

  let sections = {
    "Reasoning": { correct: 0, wrong: 0, not_attempted: 0, marks: 0 },
    "GK": { correct: 0, wrong: 0, not_attempted: 0, marks: 0 },
    "Maths": { correct: 0, wrong: 0, not_attempted: 0, marks: 0 },
    "English": { correct: 0, wrong: 0, not_attempted: 0, marks: 0 }
  };

  let sectionNames = ["Reasoning", "GK", "Maths", "English"];

  questions.forEach((question, index) => {
    let section = sectionNames[Math.floor(index / 25)];

    // Correctly finding the "Chosen Option" row
    let chosenOptionRow = [...question.querySelectorAll(".menu-tbl tr")].find(row =>
      row.innerText.includes("Chosen Option :")
    );
    let chosenOption = chosenOptionRow ? chosenOptionRow.querySelector("td.bold").innerText.trim() : "--";

    // Correctly finding the "Right Answer"
    let rightAnswerElement = question.querySelector(".rightAns img.tick");
    let rightAnswer = rightAnswerElement
      ? rightAnswerElement.closest("td").innerText.trim().match(/^\d+/)?.[0]
      : null;

    if (chosenOption === "--") {
      sections[section].not_attempted++;
    } else if (chosenOption.trim() === rightAnswer?.trim()) {
      sections[section].correct++;
    } else {
      sections[section].wrong++;
    }
  });

  // Calculate marks for each section
  Object.keys(sections).forEach(section => {
    sections[section].marks = (sections[section].correct * 2) - (sections[section].wrong * 0.5);
  });

  let totalMarks = Object.values(sections).reduce((sum, sec) => sum + sec.marks, 0);

  return { ...sections, totalMarks };
}
