// Function to parse the form text and extract information to fill the captcha
function fillcaptcha() {
    // Get the text content from the form
    const formText = document.querySelector('form').innerText;

    // Match text containing the word "Please"
    const prompts = formText.match(/.*\bPlease\b.*/g);
    
    // If a valid prompt is found
    if (prompts) {
        // Split the prompt into individual words
        const words = prompts[0].split(/\s+/);

        // Keywords that are looked for in the sentence
        const keywords = ["first", "second", "add", "subtract"]; 

        // Check for the presence of specific keywords in the sentence
        for (let i = 0; i < keywords.length; i++) {
            for (let j = 0; j < words.length; j++) {
                // If a keyword is found in the prompt
                if (keywords[i] === words[j]) {
                    // If the keyword is "first", return the 5th last word (as per your logic)
                    if (keywords[i] === "first") {
                        return words[words.length - 5];
                    }
                    // If the keyword is "second", return the 3rd last word
                    else if (keywords[i] === "second") {
                        return words[words.length - 3];
                    }
                    // If the keyword is "add", perform addition on two specific words and return the result as a string
                    else if (keywords[i] === "add") {
                        return String(parseInt(words[words.length - 3]) + parseInt(words[words.length - 5]));
                    }
                    // If the keyword is "subtract", perform subtraction on two specific words and return the result as a string
                    else if (keywords[i] === "subtract") {
                        return String(parseInt(words[words.length - 5]) - parseInt(words[words.length - 3]));
                    }
                }
            }
        }
        return "*"; // Return a fallback if no valid command is found
    }
    
    return "*"; // Return fallback if no prompts found
}

// Function to fill the captcha input field if available
function fillCaptchaIfAvailable() {
    // Get the captcha input field by its ID
    let captcha = document.getElementById("valuepkg3");
    
    // If captcha is found, set its value using the result from fillcaptcha
    if (captcha !== null) {
        captcha.value = fillcaptcha();
    } else {
        console.log("Captcha not found");
    }
}

// Check if the document is still loading
if (document.readyState === "loading") {
    // If still loading, wait for DOMContentLoaded event
    document.addEventListener("DOMContentLoaded", fillCaptchaIfAvailable);
} else {
    // If already loaded, execute immediately
    fillCaptchaIfAvailable();
}
