/*global React*/
/*global axios*/
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

class DropDown extends React.Component{
    constructor(props) {
        super(props);
        this.state = {"rows" : [{"tournament_id":1,"location_name":"Initial 1"},{"tournament_id":2,"location_name":"Initial 2"}]};

        console.log("Initial Population of dropdown.");
        axios.get('https://sabrie.com:3000/tournaments')
          .then(function (response) {
            console.log("Got a response:   Data = " + JSON.stringify(response.data));
            super.setState(response.data);
            }
          )
          .catch(function (error) {
            console.log(error);
          });
    }


    render(){
        console.log("Rendering...");
        console.log("DropDown state is = " + JSON.stringify(this.state));
        console.log("DropDown props are = " + JSON.stringify(this.props));
        
        const options = this.state.rows.map(item =>
                <option value={item.tournament_id}>{item.location_name}</option>
            );
        
        console.log("options = " + JSON.stringify(this.state.rows));
        
    return (
        <select onChange={(e) => getId(e.target.value)}>
            <option>Select Tournament</option>
            {options}
        </select>
        )
    }
}

function getId(id){
    console.log("Getting details for tournament with id " + id);

    axios.get('https://sabrie.com:3000/tournaments?id=' + id)
      .then(function (response) {
        console.log("Got detailed tournament data.  Data = " + JSON.stringify(response.data.rows[0]));
            updateText(response.data.rows[0]);
        }
      )
      .catch(function (error) {
        console.log(error);
      });
}

function updateText(data){
    this.setState(data);
    console.log("UpdateText set state.")
}

class EditTournamentForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            tournament_id: 0,
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
        updateText = updateText.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    onChange(e) {
        axios.get('https://sabrie.com:3000/tournaments')
          .then(function (response) {
                //populate a selector with the tournaments, by Id
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });    
    }
    
    handleChange(event){
        console.log("I am changing the stuffs for " + event.target.name);
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
        console.log("state is now " + this.state[name]);
    }

    handleSubmit(event){
        console.log("I am handling your submit.");
        event.preventDefault();
        console.log("updated data to send = " + JSON.stringify(this.state));
        axios.post('https://sabrie.com:3000/tournaments', this.state)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    

    render() {
        console.log("rendering id: " + this.state.tournament_id);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <DropDown/>
                    <table>
                        <tbody>
                            <tr>
                                <th>Tournament Details</th>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td><input type="text"  name="location_name" defaultValue={this.state.location_name} value={this.state.location_name} onChange={this.handleChange} /></td>
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
                                <td><input type="datetime" name="tournament_start_date" value={this.state.tournament_start_date} onChange={this.handleChange} /></td>
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
                                <td><input type="datetime" name="rain_date" value={this.state.rain_date} onChange={this.handleChange} /></td>
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
                    
                    <input type="submit" value="Submit" className="button" />
                    
                </form>
            </div>            
            
        );
    }
}

var mainElement = document.querySelector("Main");

ReactDOM.render(<EditTournamentForm />, mainElement);