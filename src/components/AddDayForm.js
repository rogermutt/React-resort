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

export const AddDayForm =({ resort, powder, backcountry, date, invvalue, onNewDay, history}) => {

        let _resort, _powder, _date, _backcountry, _invvalue

        const submit = ev => {
            ev.preventDefault()

            let rawDate = new Date(_date.value)

            let dateFormatted = rawDate.toLocaleDateString()  

            let newDay = {
                name: _resort.value,
                date: dateFormatted,
                powder: _powder.checked,
                backcountry: _backcountry.checked,
                invvalue: _invvalue.value
            }  
            
            onNewDay(newDay, redirect(history))

            _resort.value = '',
            _date.value = '',
            _powder.checked = false,
            _backcountry.checked = false,
            _invvalue = 0
                        
        }

        return (
            <form onSubmit={submit} id='newDay'>

                <label htmlFor="resort">Resort</label>
                <Autocomplete options={RESORTS}
                              ref={input => _resort = input} />
                
                <label htmlFor="date">Date</label>
                <input  id="date"
                        type="date"
                        defaultValue={date}
                        ref={input => _date = input}
                        required />
                <div>
                    <input  id="powder" 
                            type="checkbox"
                            ref={input => _powder = input} 
                            defaultChecked={powder} />
                    <label htmlFor="powder">powder</label>
                </div>

                <div>
                    <input id="backcountry" 
                            type="checkbox" 
                            ref={input => _backcountry = input}
                            defaultChecked={backcountry}/>
                    <label htmlFor="backcountry">backcountry</label>
                </div>

                <div>
                    <label htmlFor="invvalue">invvalue</label>
                    <input id="invvalue" 
                            type="text" 
                            ref={input => _invvalue = input}/>
                </div>    

                <label htmlFor="invoice">invoice</label>
                <input id="invoice" type="file" name="invoice"  />
                

                <button>Add Day</button>
                
            </form>
        )
}

AddDayForm.defaultProps = {
    name: 'Aspen',
    date: '1/2/2016',
    powder: true,
    backcountry: false,
    invvalue: 100  
}

AddDayForm.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    powder: PropTypes.bool.isRequired,
    backcountry: PropTypes.bool.isRequired,
    invvalue: PropTypes.number.isRequired
}