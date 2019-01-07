import { Component } from 'react'

export class Member extends Component {

    render () {

        const { admin, name, thumbnail, email, makeAdmin, removeAdmin } = this.props
        
        return (
           <div>
               <h1>{name}</h1> 

                { admin 
                    ?  <a onClick={ () => removeAdmin(email) }>Remove admin</a>
                    :  <a onClick={ () => makeAdmin(email) }>Make admin</a>
                }

               <img src={thumbnail} alt="profile picture"/>
               <p> <a href={`mailto:${email}`} >{email}</a> </p>
           </div>
        )
    }

}