const quoteDisplay = document.getElementById('quote-display');
const authorDisplay = document.getElementById('author-display');
const regenerateBtn = document.getElementById('regenerate-btn');
const apiUrl = 'https://api.quotable.io/quotes/random';

const fallbackQuotes = [
    {
        content: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela"
    },
    {
        content: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        content: "Your time is limited, so don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    {
        content: "If life were predictable it would cease to be life, and be without flavor.",
        author: "Eleanor Roosevelt"
    },
    {
        content: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle"
    }
];

function displayFallbackQuote() {
    const quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    quoteDisplay.textContent = `“${quote.content}”`;
    authorDisplay.textContent = `— ${quote.author}`;
}

async function generateNewQuote() {
    regenerateBtn.disabled = true;
    regenerateBtn.textContent = 'Loading...';
    quoteDisplay.style.opacity = 0;
    authorDisplay.style.opacity = 0;

    setTimeout(async () => {
        try {
            const response = await fetch(apiUrl, { cache: 'no-cache' });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const quote = data[0];

            if (quote && quote.content && quote.author) {
                quoteDisplay.textContent = `“${quote.content}”`;
                authorDisplay.textContent = `— ${quote.author}`;
            } else {
                throw new Error("Invalid data format from API.");
            }

        } catch (error) {
            console.error("Error fetching quote, using fallback:", error);
            displayFallbackQuote();
        } finally {
            regenerateBtn.disabled = false;
            regenerateBtn.textContent = 'Regenerate';
            quoteDisplay.style.opacity = 1;
            authorDisplay.style.opacity = 1;
        }
    }, 300);
}

regenerateBtn.addEventListener('click', generateNewQuote);
document.addEventListener('DOMContentLoaded', generateNewQuote);

