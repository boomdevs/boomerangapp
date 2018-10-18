class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            loggingIn: true
        };
        this.registerClick = this.registerClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    registerClick(){
        this.setState({
            loggingIn: this.state.loggingIn ? false : true
        });    
        console.log(this.state.loggingIn);
    }
    
    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        console.log(`name: ${name} | value: ${value}`);
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(){
        //axios validate
    }
    
    render(){
        console.log(`username: ${this.state.username} | password: ${this.state.password}`);
        if (this.state.loggingIn){
            return(
                <div>
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        Email:<br/>
                        <input type="email" name="username" onChange={this.handleChange} value={this.state.username}/><br/>
                        Password:<br/>
                        <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/><br/><br/>
                        <input type="submit" value="Submit" />
                    </form>
                    <p>Not a member? <span id="register" onClick={this.registerClick}>Register here.</span></p>
                </div>
            );
        }else{
            return(
                <Register registerClick={this.registerClick} />
            );
        }
    }
}

class Error extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.error === null){
            return(<div></div>);
        }else{
        return(
            <p id="error">{this.props.error}</p>    
        );
        }
    }
}

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            nickname: "",
            usba_member: false,
            competition_level: ["Junior","Novice","Intermediate","Advanced","Senior"],
            error: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault;
        if(this.state.username === "" || this.state.password === "" || this.state.first_name === "" || this.state.last_name === ""){
            this.setState({
                error: "You must fill in the required fields."
            });
        } else {
            this.setState({
                error: null
            });
        }
        console.log(this.state);
        axios.post('https://sabrie.com:3000/person', this.state)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        console.log(`name: ${name} | value: ${value}`);
        this.setState({
            [name]: value
        });
        console.log(`State is now ${this.state[name]}`);
    }
    
    render(){
        let competitionLevel = this.state.competition_level.map((level) => 
           <option value={level} key={level}>{level}</option>
        );
        let error = <Error error={this.state.error} />;
        return(
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    Email:<br/>
                    <input type="email" name="username" onChange={this.handleChange} /><br/>
                    Password:<br/>
                    <input type="text" name="password" onChange={this.handleChange} /><br/>
                    First Name:<br/>
                    <input type="text" name="first_name" onChange={this.handleChange} /><br/>
                    Last Name:<br/>
                    <input type="text" name="last_name" onChange={this.handleChange} /><br/>
                    Nickname (optional):<br/>
                    <input type="text" name="nickname" onChange={this.handleChange} /><br/>
                    USBA Member:<br/>
                    <input type="radio" name="usba_member" value={true} onChange={this.handleChange} /> Yes  <input type="radio" name="usba_member" value={false} onChange={this.handleChange} defaultChecked /> No<br/>
                    Competition Level:<br/>
                    <select name="competition_level" onChange={this.handleChange}>
                        {competitionLevel}
                    </select><br/><br/>
                    {error}
                    <input type="submit" value="Submit" />
                </form>
                <p>Already a member? <span id="register" onClick={this.props.registerClick}>Login here.</span></p>
            </div>
        );
    }
}

var mainElement = document.querySelector("Main");
ReactDOM.render(<Login />, mainElement);