import { PropTypes } from 'react'
import { Autocomplete } from './Autocomplete'

const RESORTS = [
    'A',
    'B',
    'C',
    'D',
    'E'
]

const stringDate = string => {
    let a = string.split('/')
    let day = a[0] > 9 ? a[0] : 0 + a[0]  
    let month = a[1]
    return string.length === 0 ? "2014-05-05" : `${a[2]}-${month}-${day}`
}

const redirect = history => history.push("/dayList")

export const PreviewForm =({ saveNewDay, history }) => {
    
        let empty, _resort, _date, _powder, _backcountry, _invoice_value
        
        let stored_invoice_value = JSON.parse(localStorage.getItem('invoice_value'))

        let storedDay = JSON.parse(localStorage.getItem('newDay'))   

        let formattedDate = stringDate(storedDay.date)

        const submit = ev => {
            ev.preventDefault()

            let rawDate = new Date(_date.value)

            console.log(rawDate);
            
            let dateFormatted = rawDate.toLocaleDateString()  

            let newDay = { 
                name: _resort.value,
                date: dateFormatted,
                powder: _powder.checked,
                backcountry: _backcountry.checked,
                invvalue: _invoice_value.value
            }  
            
            saveNewDay(newDay, redirect(history))

            _resort.value = '',
            _date.value = '',
            _powder.checked = false,
            _backcountry.checked = false,
            _invoice_value = 0
                        
        }

        return (
            <form onSubmit={submit} id='newDay'>

                <label htmlFor="resort">Resort</label>
                <input  id="resort"
                        type="text"
                        defaultValue={storedDay.name}
                        ref={input => _resort = input}
                        required />

                
                <label htmlFor="date">Date</label>
                <input  id="date"
                        type="date"
                        defaultValue={formattedDate}
                        ref={input => _date = input}
                        required />

                <div>
                    <input  id="powder" 
                            type="checkbox"
                            ref={input => _powder = input} 
                            defaultChecked={storedDay.powder} />
                    <label htmlFor="powder">powder</label>
                </div>

                <div>
                    <input id="backcountry" 
                            type="checkbox" 
                            ref={input => _backcountry = input}
                            defaultChecked={storedDay.backcountry}/>
                    <label htmlFor="backcountry">backcountry</label>
                </div>  

                <label htmlFor="invoice_value">invoice</label>
                <input  id="invoice_value"
                        type="text"
                        defaultValue={stored_invoice_value}
                        ref={input => _invoice_value = input}
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