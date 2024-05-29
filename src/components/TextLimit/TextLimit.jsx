export function TextLimit({ text, limit, speak }) {
    const textLimited = text?.length > limit? `${text.substring(0, limit)}...` : text;
    return (
        <p 
            onMouseEnter={() => speak(textLimited)}
            onMouseLeave={() => window.speechSynthesis.cancel()}
        >
            {textLimited}
        </p>
    )
}