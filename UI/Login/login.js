const Error = ({error}) => (error ? <p className="error">{error}</p> : null);
const competition_levels = ["Junior", "Novice", "Intermediate", "Advanced", "Senior"];

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            loggingIn: true,
            error: null
        };
        this.registerClick = this.registerClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    registerClick(){
        this.setState({
            loggingIn: !this.state.loggingIn
        });    
        console.log(this.state.loggingIn);
    }
    
    handleChange(event){
        const {name, value} = event.target;
        console.log(`name: ${name} | value: ${value}`);
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(event){
        event.preventDefault;
        if(this.state.username === "" || this.state.password === ""){
            this.setState({
                error: "You must fill in the required fields."
            });
        } else {
            this.setState({
                error: null
            });
            console.log("submitted?");
        }
        //axios validate
    }
    
    render(){
        console.log(`username: ${this.state.username} | password: ${this.state.password}`);
        const {error} = this.state;
        if (this.state.loggingIn){
            return(
                <div>
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        Email:<br/>
                        <input type="email" name="username" onChange={this.handleChange} value={this.state.username} required /><br/>
                        Password:<br/>
                        <input type="password" name="password" onChange={this.handleChange} value={this.state.password} required /><br/><br/>
                        {error}
                        <input type="submit" value="Submit" />
                    </form>
                    <p>Not a member? <span id="register" onClick={this.registerClick}>Register here.</span></p>
                </div>
            );
        }
        return(
            <Register registerClick={this.registerClick} />
        );
    }
}

/*class Error extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const error = this.props;
        return error ? <p className="error">{this.props.error}</p> : null;
    }
}*/

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
            competition_level: "Junior",
            error: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault();
        if(this.state.username === "" || this.state.password === "" || this.state.first_name === "" || this.state.last_name === ""){
           return this.setState({error: "You must fill in the required fields."});
        }
        this.setState({
            error: null
        });
        console.log(this.state);
        if(this.state.error === null){
        axios.post('https://sabrie.com:3001/person', this.state)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    
    handleChange(event){
        const {name, value} = event.target;
        console.log(`name: ${name} | value: ${value}`);
        this.setState({
            [name]: value
        });
        console.log(`State is now ${this.state[name]}`);
    }
    
    render(){
        let disable = false;
        if (this.state.email === "" || this.state.password === "" || this.state.first_name === "" || this.state.last_name === ""){
            disable = true;
        }
        const {error} = this.state;
        if (error) return <Error error={error} />;
        const competitionLevel = competition_levels.map(level => 
           <option value={level.level} key={level.level}>{level}</option>
        );
        return(
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    Email:<br/>
                    <input type="email" name="username" onChange={this.handleChange} required /><br/>
                    Password:<br/>
                    <input type="text" name="password" onChange={this.handleChange} required /><br/>
                    First Name:<br/>
                    <input type="text" name="first_name" onChange={this.handleChange} required /><br/>
                    Last Name:<br/>
                    <input type="text" name="last_name" onChange={this.handleChange} required /><br/>
                    Nickname (optional):<br/>
                    <input type="text" name="nickname" onChange={this.handleChange} /><br/>
                    USBA Member:<br/>
                    <input type="radio" name="usba_member" value={true} onChange={this.handleChange} /> Yes  <input type="radio" name="usba_member" value={false} onChange={this.handleChange} defaultChecked /> No<br/>
                    Competition Level:<br/>
                    <select name="competition_level" onChange={this.handleChange}>
                        {competitionLevel}
                    </select><br/><br/>
                    {error}
                    <input type="submit" value="Submit" disabled={disable} onClick={this.handleSubmit} />
                </form>
                <p>Already a member? <span id="register" onClick={this.props.registerClick}>Login here.</span></p>
            </div>
        );
    }
}

const mainElement = document.querySelector("Main");
ReactDOM.render(<Login />, mainElement);