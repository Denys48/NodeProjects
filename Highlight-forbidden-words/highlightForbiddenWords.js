"use strict";
const highlightForbiddenWords = (text, forbiddenWords) => {
    const forbiddenInLowerCase = forbiddenWords.map(word => word.toLowerCase());
    const words = text.split(" ");
    const wordsWithHighlights = words.map((word) => {
        const normalizedWord = word.toLowerCase().replace(/[.,!?;:()[\]{}"'«»]/g, "");
        if (forbiddenInLowerCase.includes(normalizedWord)) {
            return `<del>${word}</del>`;
        }
        return word;
    });
    return wordsWithHighlights.join(" ");
};
const text = "This is a test sentence with some bad words.";
const forbiddenWords = ["bad", "test"];
const result = highlightForbiddenWords(text, forbiddenWords);
const resultElement = document.querySelector("#textWithForbiddenWords");
if (resultElement) {
    resultElement.innerHTML = result;
}
