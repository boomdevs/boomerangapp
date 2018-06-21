//var initData = JSON.parse({"tournament_id":1,"location_name":"A Place!"},{"tournament_id":2,"location_name":"Another Place!"});
var initData;

class LocationName extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = initData;
        //this.state = {data: 'false'};


    axios.get('https://sabrie.com:3000/tournaments')
      .then(function (response) {
            console.log("second call for tournament data.")            
            setInitDataReturn(response.data); 
      })
      .catch(function (error) {
        console.log(error);
      });
      
      function setInitDataReturn(data){
          console.log("setting data / second");
          initData = data.rows; 
          console.log("state = " + JSON.stringify(initData));
          }
    };

    render(){      
        
        const names = this.state.map((location) =>
            <option>{location.location_name}</option>
        );
            
        console.log("Rendering...")
        return(
            <select onChange={this.onChange}>
                {names}
            </select>
        );
    
    }
}

class EditTournamentForm extends React.Component{
    

    constructor(props) {
        super(props);
        this.state = {
            locationName: 'Some Place',
            locationAddress: 'Over there.'
        };

        axios.get('https://sabrie.com:3000/tournaments')
          .then(function (response) {
            console.log("first call for tournament data.")  
            setInitDataReturn(response.data.rows);
              
                //should this be this.state?
/*                initData = response.data.rows;
                for (var x in response.data.rows){
                    var name = response.data.rows[x].location_name;
                   listLocationName.push(name); 
                   /*console.log("adding a name! " + name);*/

                }
            //console.log(response);
          )
          .catch(function (error) {
            console.log(error);
          });    
        
      function setInitDataReturn(data){
          console.log("setting data / first");
          initData = data;
      }

    this.onChange = this.onChange.bind(this);
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
    
/*
    optionContent(){
            var something = initData.map((row) =>
            
               <option>row.location_name</option>
            
            );
    }
*/  
    
    render() {
        //console.log(initData);
        //console.log("render list data = " + listLocationName);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <LocationName />
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
/*
function getTournamentList(){
axios.get('/tournaments')
  .then(function (response) {
        //populate a selector with the tournaments, by Id
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });    
}
*/

var mainElement = document.querySelector("Main");

ReactDOM.render(<EditTournamentForm />, mainElement);