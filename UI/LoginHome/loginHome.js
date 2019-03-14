class LoginHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "Duder",
            navSelect: "home"
        };
        this.onClick = this.onClick.bind(this);
    }
    
    onClick(e){
        this.setState({navSelect: e.target.value});
    }
    
    render() {
        var NavSelection;
        switch(this.state.navSelect){
            case "home":
                NavSelection = <Home />;
                break;
            case "futureTourney":
                NavSelection = <FutureTourney />;
                break;
            case "pastTourney":
                NavSelection = <PastTourney />;
                break;
            default:
                NavSelection = "Error. Something broke! Go fix it.";
        }
        return(
            <div>
                <header>
                    <h1>Welcome {this.state.name}!</h1>
                </header>
                <section>
                    <nav>
                        <div value="home" onClick={this.onClick} >Home</div>
                        <div value="futureTourney" onClick={this.onClick} >Upcoming Tournaments</div>
                        <div value="pastTourney" onClick={this.onClick} >Past Tournaments</div>
                    </nav>
                </section>
                <article>
                    {NavSelection}
                </article>
            </div>
        );
    }
}

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <p>This is home page.</p>    
        );
    }
}

class FutureTourney extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <p>Insert a list of future tournaments here.</p>    
        );
    }
}

class PastTourney extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <p>Insert a list of past tournaments. Do something with attended ones?</p>    
        );
    }
}

var mainElement = document.querySelector("Main");

ReactDOM.render(<LoginHome />, mainElement);