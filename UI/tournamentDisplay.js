class TournamentDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tournaments: []
        };
        
        axios.get('https://sabrie.com:3000/tournaments')
          .then(function (response) {
            console.log("Got a response:   Data = " + JSON.stringify(response.data.rows));
            super.setState({
                tournaments : response.data.rows
                
            });
            }

          )
          .catch(function (error) {
            console.log(error);
          });
    }
    
    RSVP(){}
    
    render(){
        var tournamentList = this.state.tournaments.map(tournament =>
            <Tournament 
                key = {tournament.tournament_id}
                id = {tournament.tournament_id}
                tournamentName = "Tournament Name"
                time = {tournament.tournament_start_date}
                locationName = {tournament.location_name}
                address = {tournament.location_address}
                city = {tournament.location_city}
                state = {tournament.location_state}
            />
        );
        return(
            <div>
                <h1>Upcoming Tournaments</h1>
                <p>Please click RSVP to register</p>
                {tournamentList}
            </div>    
        );
    }
}

class Tournament extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        
        return(
          <div id={this.props.id}>
            <h4>{this.props.tournamentName}</h4>
            <table className="tournamentTable">
                <tbody>
                    <tr>
                        <th>When:</th>
                        <td>{this.props.time}</td>
                    </tr>
                    <tr>
                        <th>Where:</th>
                        <td>{this.props.locationName}</td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>{this.props.address}</td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>{this.props.city}, {this.props.state}</td>
                    </tr>
                </tbody>
            </table>
            <button type="button" id="RSVP" onClick={this.RSVP}>RSVP</button>
          </div>  
        );
    }
}

var mainElement = document.querySelector("Main");

ReactDOM.render(<TournamentDisplay />, mainElement);