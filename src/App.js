import React, { useState } from 'react';
import { sign } from './util/signonce';
function App() {
    const [input, setInput] = useState('');
    const [nonce, setNonce] = useState('');
    const [session, setSession] = useState('');

    const [skuSignature, setSkuSignature] = useState('A26308E242742374');

    const [output, setOutput] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let temp = input;

        if (!isValidJSON(input)) setIsError(true);

        let data = {};

        // check if its a { data: "", error: null, sig: "" }
        let obj = JSON.parse(input);
        if (obj.data && obj.sig && obj.error == null) data = JSON.parse(obj.data);
        else data = JSON.parse(input);
        // if (typeof temp == 'string' && isValidJSON(temp)) {
        //     temp = JSON.parse(temp);
        // }
        setOutput(sign(data, nonce, session, skuSignature));
        setIsError(false);
    };
    return (
        <>
            <div className="div">
                <h1 className="code">Signonce</h1>
                <h3>A website to get signatures given a certain object/string and an optional nonce</h3>
                <p>
                    If you directly paste in one with <code>&#x7B; error: null, data: "", sig: "" &#x7D;</code>, it will use
                    the string in the "data" instead of using the sig provided in the object
                </p>
                <form className="form" onSubmit={handleSubmit} autocomplete="off">
                    <textarea
                        type="text"
                        id="biginput"
                        name="input"
                        value={input}
                        className="code"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <p>
                        Enter <code>nonce</code> (optional):
                    </p>
                    <input
                        type="text"
                        id="input"
                        name="input"
                        value={nonce}
                        className="code"
                        onChange={(e) => setNonce(e.target.value)}
                    />
                    <p>
                        Enter <code>sessionID</code> (optional):
                    </p>
                    <input
                        type="text"
                        id="input"
                        name="input"
                        value={session}
                        className="code"
                        onChange={(e) => setSession(e.target.value)}
                    />
                    <p>
                        Enter <code>skuSignature</code> (BTD6's is given to you):
                    </p>
                    <input
                        type="text"
                        id="input"
                        name="input"
                        value={skuSignature}
                        className="code"
                        onChange={(e) => setSkuSignature(e.target.value)}
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
                    <a href="https://github.com/hemisemidemipresent/signonce">Star this project on Github</a>
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
