import React, { useState } from 'react';
import { sign } from './util/signonce';
function App() {
    const [input, setInput] = useState('');
    const [nonce, setNonce] = useState('');
    const [output, setOutput] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let temp = input;

        if (isValidJSON(temp)) {
            temp = JSON.parse(temp);
            if (typeof temp == 'string' && isValidJSON(temp)) {
                temp = JSON.parse(temp);
            }
            console.log(nonce);
            setOutput(sign('{}', nonce));
            setIsError(false);
        } else if (!isValidJSON(temp)) {
            setIsError(true);
        }
    };
    return (
        <>
            <div className="div">
                <h1 className="code">Signonce</h1>
                <h3>
                    A website to get signatures given a certain object/string and an optional nonce
                </h3>
                <form className="form" onSubmit={handleSubmit} autocomplete="off">
                    <input
                        type="text"
                        id="biginput"
                        name="input"
                        value={input}
                        className="code"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <p>Enter nonce:</p>
                    <input
                        type="text"
                        id="input"
                        name="input"
                        value={nonce}
                        className="code"
                        onChange={(e) => setNonce(e.target.value)}
                    />
                    <button type="submit" className="btn">
                        Process
                    </button>
                </form>
                {isError ? (
                    <p className="code">invalid JSON</p>
                ) : (
                    <p className="code" id="sig">
                        {output}
                    </p>
                )}
                <h2>
                    <a href="https://github.com/hemisemidemipresent/signonce">Github</a>
                </h2>
            </div>
        </>
    );
}
function isValidJSON(jsonString) {
    try {
        var o = JSON.parse(jsonString);
        if (o) return true;
    } catch (e) {}
    return false;
}
export default App;
