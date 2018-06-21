/*global React*/
/*global axios*/


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
        <select>
        {options}
        </select>
        )
    }
}

class EditTournamentForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            locationName: 'Some Place',
            locationAddress: 'Over there.'
        };
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
        var change = event;
    }

    handleSubmit(event){
        alert("I am handling your submit.");
        event.preventDefault();
    }
    

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <DropDown/>
                    <table>
                        <tbody>
                            <tr>
                                <th><label>Date:</label></th>
                                <td><input type="date" name="date" onChange={this.handleChange} /></td>
                            </tr>
                            <tr>                            
                                <th><label>Location Name:</label></th>
                                <td><input type="text" name="locationName" value={this.state.locationName} onChange={this.handleChange} /></td>
                            </tr>
                            <tr>                            
                                <th><label>Location Address:</label></th>
                                <td><input type="text" name="locationAddress" value={this.state.locationAddress} onChange={this.handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <input type="submit" value="Submit" class="button" />
                    
                </form>
            </div>            
            
        );
    }
}

var mainElement = document.querySelector("Main");

ReactDOM.render(<EditTournamentForm />, mainElement);

/*
function LocationDropdown(props) {
    const options = props.locations.map((location) =>
        <select key={locations.tournament_id}>{location.location_name}</option>
    );
    


    
    return (
    <option>
        {options}
    </option>
    );
}

const locations = JSON.stringify(tournaments);
*/