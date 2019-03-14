class Thing extends React.Component{
    render() {
        return (
            <h1>HELLO WORLD!</h1>    
        );
    }
}

class SomeForm extends React.Component{
    render() {
        return (
            <form>
                <label>
                name:
                <input type="text" name="name" />
                </label>
                
                <label>
                date:
                <input type="date" name="date" />
                </label>
                
                <Thing />
                
            </form>
        );
    }
}

var HelloWorld = React.createClass({

  render: function() {
    return React.createElement("h1", null, "Hello World!");
  },

});

var mainElement = document.querySelector("Main");
//var mainElement = document.getElementById("react-target");

ReactDOM.render(<SomeForm />, mainElement);
//ReactDOM.render(React.createElement(HelloWorld), mainElement);