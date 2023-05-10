import React, {useState} from "react";
import './counter.css'

function Counter({defaultValue = 1, id = 'count-order-id', name = 'countOfOrder'}) {
    const [value, setValue] = useState(defaultValue)

    return (
        <div className="count-container">
            <button type="button" className="count-changer-box count-minus-box"
                    onClick={() => setValue(prev => prev === 1 ? 1 : --prev)}>-
            </button>
            <input readOnly type="number" name={name} id={id} className="count-box"
                   value={value}/>
            <button type="button" className="count-changer-box count-plus-box"
                    onClick={() => setValue(prev => ++prev)}>+
            </button>
        </div>
    )
}

export default Counter