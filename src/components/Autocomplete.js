import { Component } from 'react'

export class Autocomplete extends Component {

    get value() {
        return this.refs.inputResort.value
    }

    set value(inputValue) {
        this.refs.inputResort.value = inputValue
    }    
    
    render () {
        return (
            <div>
                <input  type="text" 
                        ref="inputResort"
                        list="resort-list" />

                <datalist id="resort-list">
                    {this.props.options.map(
                        (opt, i) => <option key={i}>{opt}</option>
                    )}
                </datalist>

            </div>
        )
    }

}