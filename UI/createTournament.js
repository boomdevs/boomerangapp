var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd;
} 

if(mm<10) {
    mm = '0'+mm;
} 

today = yyyy + '-' + mm + '-' + dd;

class CreateTournamentForm extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            location_name: 'A Place!',
            location_address: 'I want cookies.',
            location_city: "Cookie City",
            location_state: "Pick a place.",
            tournament_start_date: today,
            registration_start_time: "07:00",
            event_1_start_time: "07:00",
            rain_date: today,
            rain_date_registration_time: "07:00",
            rain_date_event_1_start_time: "07:00"
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        const name = event.target.name;
        
        this.setState({
            [name]: event.target.value
        });
    }
    
    handleSubmit(event){
        console.log("Poke me.");
        event.preventDefault();
        console.log(this.state);
        axios.post('https://sabrie.com:3000/tournaments', this.state)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    render() {
        
        return (
            <form onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>Tournament Details</th>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td><input type="text"  name="location_name" value={this.state.location_name} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td><input type="text" name="location_address" value={this.state.location_address} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td><input type="text" name="location_city" value={this.state.location_city} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td><input type="text" name="location_state" value={this.state.location_state} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Date(s)</td>
                            <td><input type="date" name="tournament_start_date" value={this.state.tournament_start_date} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Registration Start Time</td>
                            <td><input type="time" name="registration_start_time" value={this.state.registration_start_time} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Tournament Start Time</td>
                            <td><input type="time" name="event_1_start_time" value={this.state.event_1_start_time} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Rain Date</td>
                            <td><input type="date" name="rain_date" value={this.state.rain_date} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Rain Date Registration Start Time</td>
                            <td><input type="time" name="rain_date_registration_time" value={this.state.rain_date_registration_time} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Rain Date Tournament Start Time</td>
                            <td><input type="time" name="rain_date_event_1_start_time" value={this.state.rain_date_event_1_start_time} onChange={this.handleChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}






var mainElement = document.querySelector("Main");

ReactDOM.render(<CreateTournamentForm />, mainElement);