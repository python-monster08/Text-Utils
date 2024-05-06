import React, {useState} from 'react'


export default function TextForm(props){
    const handleUpCaseClick = ()=>{
        // console.log("Uppercase was clicked " + text);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Coverted to Upercase!", "success")
    }
    const handlelwCaseClick = ()=>{
        // console.log("Uppercase was clicked " + text);
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Coverted to lowercase!", "success")
    }
    const handleclearTectClick = ()=>{
        // console.log("Uppercase was clicked " + text);
        let newText = '';
        setText(newText)
        props.showAlert("Clear All Text!", "success")
    }

    const handleOnChange = (event)=>{
        // console.log("On Change");
        setText(event.target.value);
    }

    function countSentences(text) {
        // Define a regular expression to match sentence endings (. ! ?)
        const sentenceRegex = /[.!?]+/g;
        // Use the split method to split the text into an array of sentences
        const sentences = text.split(sentenceRegex);
        // Return the length of the array, which represents the number of sentences
        return sentences.length;
    }
    

    function countSyllables(word) {
        // Convert the word to lowercase to simplify the process
        word = word.toLowerCase();
        
        // Define a regular expression to match vowels
        const vowelRegex = /[aeiouy]+/g;
        
        // Match all occurrences of vowels in the word
        const vowels = word.match(vowelRegex);
        
        // Return the count of matched vowels
        return vowels ? vowels.length : 0;
    }
    function countSyllablesInText(text) {
        // Split the text into words
        const words = text.split(/\s+/);
        
        // Initialize a variable to store the total syllable count
        let totalSyllables = 0;
        
        // Iterate over each word and count syllables
        for (let i = 0; i < words.length; i++) {
            totalSyllables += countSyllables(words[i]);
        }
        
        // Return the total syllable count
        return totalSyllables;
    }

    // const handleCopyText = ()=>{
    //     var text = document.getElementById("myBox");
    //     text.select();
    //     navigator.clipboard.writeText(text.value);
    //     props.showAlert("Text Copied!", "success")
    // }

    const handleCopyText = () => {
        // Get the text to copy
        const text = document.getElementById("myBox").value;
    
        // Create a temporary textarea element
        const textarea = document.createElement("textarea");
        textarea.value = text;
    
        // Append the textarea to the DOM
        document.body.appendChild(textarea);
    
        // Select the text in the textarea
        textarea.select();
    
        try {
            // Execute the copy command
            const successful = document.execCommand('copy');
            const message = successful ? 'Text copied successfully' : 'Unable to copy text';
            props.showAlert(message, successful ? "success" : "error");
        } catch (err) {
            console.error('Error copying text:', err);
            props.showAlert("Error copying text", "error");
        }
    
        // Remove the temporary textarea from the DOM
        document.body.removeChild(textarea);
    }
    
    
    const handleExtraSpaces = ()=>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
    }
    
    const [text,setText] = useState('')
    return(
        <>
            <div className='container' style={{color: props.mode==='dark'?'white':'black'}}>
                <h2>{props.heading}</h2>
                <div className="mb-3">
                    {/* <label for="myBox" class="form-label">Example textarea</label> */}
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#192655':'white', color: props.mode==='dark'?'white':'black'}} id="myBox"  rows="8" name='text'></textarea>
                    <button className="btn btn-primary mt-2 mx-1" onClick={handleUpCaseClick}>Convert To Uppercase</button>
                    <button className="btn btn-primary mt-2 mx-1" onClick={handlelwCaseClick}>Convert To Lowercase</button>
                    <button className="btn btn-primary mt-2 mx-1" onClick={handleclearTectClick}>Clear Text</button>
                    <button className="btn btn-primary mt-2 mx-1" onClick={handleCopyText}>Copy Text</button>
                    <button className="btn btn-primary mt-2 mx-1" onClick={handleExtraSpaces}>Remove Extra Spaces from Text</button>
                </div>
            </div>

            <div className='container'>
                <h2>Your text summary</h2>
                <li>Total Words: {text.split(" ").length - 1}</li>
                <li>Total Characters : {(text.length) -0}</li>
                <li>Total Sentences: {countSentences(text) -1} </li>
                <li>Total Syllables/Vowels: {countSyllablesInText(text)}</li>
                <li>Total Minutes Read: {0.008 * text.split(" ").length}</li>

                <h2>Preview</h2>
                <p>{text.length>0?text:"Enter something in the textbox to preview it here"}</p>
            </div>
        </>
        
    )
}