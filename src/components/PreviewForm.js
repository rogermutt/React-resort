import { PropTypes } from 'react'
import { Autocomplete } from './Autocomplete'

const RESORTS = [
    'A',
    'B',
    'C',
    'D',
    'E'
]

const redirect = history => history.push("/dayList")

export const PreviewForm =({ resort, powder, backcountry, date, saveNewDay, history}) => {

        let empty
        
        let _invoice_value = JSON.parse(localStorage.getItem('invoice_value'))

        var storedDay = JSON.parse(localStorage.getItem('newDay'))     

        const submit = ev => {
            ev.preventDefault()

            // let rawDate = new Date(_date.value)

            // let dateFormatted = rawDate.toLocaleDateString()  

            // let newDay = {
            //     name: _resort.value,
            //     date: dateFormatted,
            //     powder: _powder.checked,
            //     backcountry: _backcountry.checked
            // }  
            
            saveNewDay(newDay, redirect(history))

            _resort.value = '',
            _date.value = '',
            _powder.checked = false,
            _backcountry.checked = false
                        
        }

        return (
            <form onSubmit={submit} id='newDay'>

                <label htmlFor="resort">Resort</label>
                <input  id="resort"
                        type="text"
                        defaultValue={storedDay.name}
                        ref={input => empty = input}
                        required />

                
                <label htmlFor="date">Date</label>
                <input  id="date"
                        type="date"
                        defaultValue="2014-05-05"
                        ref={input => empty = input}
                        required />
                        {/* storedDay above to be changd when date variable  */}
                <div>
                    <input  id="powder" 
                            type="checkbox"
                            ref={input => empty = input} 
                            defaultChecked={storedDay.powder} />
                    <label htmlFor="powder">powder</label>
                </div>

                <div>
                    <input id="backcountry" 
                            type="checkbox" 
                            ref={input => empty = input}
                            defaultChecked={storedDay.backcountry}/>
                    <label htmlFor="backcountry">backcountry</label>
                </div>  

                <label htmlFor="invoice">invoice</label>
                <input  id="invoice"
                        type="text"
                        defaultValue={_invoice_value}
                        ref={input => empty = input}
                        required />                
                
                <button>Add Day</button>
                
            </form>
        )
}

PreviewForm.defaultProps = {
    name: 'Aspen',
    date: '1/2/2016',
    powder: true,
    backcountry: false
}

PreviewForm.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    powder: PropTypes.bool.isRequired,
    backcountry: PropTypes.bool.isRequired
}