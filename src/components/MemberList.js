import { Component } from 'react'
import { Member } from './Member'
import fetch from 'isomorphic-fetch'

const ALL_USERS = 'http://localhost:3001/api/v1/users#index'

export class MemberList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,  
            members: [],
            administrators: []
        }
        this.makeAdmin = this.makeAdmin.bind(this)
        this.removeAdmin = this.removeAdmin.bind(this)
    }

    componentDidMount() {
        this.setState({ loading: true })
        fetch(ALL_USERS)
        .then( response => response.json() ) 
        .then( members => this.setState({
            members, 
            loading: false 
        }))
    }

    makeAdmin(email) {
        
        const administrators = [
            ...this.state.administrators,
            email
        ]

        this.setState({ administrators })
    }

    removeAdmin(email) {
        const administrators = [
            ...this.state.administrators.filter(
                adminEmail => adminEmail !== email
            )
        ]

        this.setState({ administrators })        
    }

    render () {
        
        const { members, loading } = this.state
        return (
            <div>

             { loading ? <span>loading...</span> : <span>{members.length} members</span> }   

             { members.length ? 
                
                members.map(
                    (member, i)=> 
                        <Member key={i} 
                                admin={this.state.administrators.some(
                                    adminEmail => adminEmail === member.email
                                )}
                                name={member.name }
                                email={ member.email}
                                //thumbnail={ member.picture.thumbnail}
                                makeAdmin={this.makeAdmin}
                                removeAdmin={this.removeAdmin}
                        />
                )             
             : <span>Currently no members</span>
            }

            </div>
        )
    }

}