const highlightForbiddenWords = (text: string, forbiddenWords: string[]): string => {
    const forbiddenInLowerCase = forbiddenWords.map(word => word.toLowerCase());

    const words: string[] = text.split(" ");
    
    const wordsWithHighlights: string[] = words.map((word: string): string => {
        const normalizedWord: string = word.toLowerCase().replace(/[.,!?;:()[\]{}"'«»]/g, "");

        if (forbiddenInLowerCase.includes(normalizedWord)) {
            return `<del>${word}</del>`;
        }
        return word;
    })

    return wordsWithHighlights.join(" ");
}

const text: string = "This is a test sentence with some bad words.";
const forbiddenWords: string[] = ["bad", "test"];

const result = highlightForbiddenWords(text, forbiddenWords);

const resultElement: HTMLParagraphElement | null = document.querySelector("#textWithForbiddenWords");

if (resultElement) {
    resultElement.innerHTML = result;
}