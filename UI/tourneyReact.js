const formContainer = document.querySelector('.react-form-container');

// Create component for button
class Button extends React.Component {
  render() {
    return (
        <button
          type={this.props.type || 'button'}
          value={this.props.value || null}
        >
          {this.props.text}
        </button>
    );
  }
};

// Create component for label
class Label extends React.Component {
  render() {
    if (this.props.hasLabel === 'true') {
      return <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
    }
  }
}

// Create component for input
class Input extends React.Component {
  render() {
    return (
      <fieldset>
        <Label
          hasLabel={this.props.hasLabel}
          htmlFor={this.props.htmlFor}
          label={this.props.label}
        />

        <input
          id={this.props.htmlFor}
          max={this.props.max || null}
          min={this.props.min || null}
          name={this.props.name || null}
          placeholder={this.props.placeholder || null}
          required={this.props.required || null}
          step={this.props.step || null}
          type={this.props.type || 'text'}
        />
      </fieldset>
    );
  }
}

// Create component for select input
class Select extends React.Component {
  render() {
    // Get all options from option prop
    const selectOptions = this.props.options.split(', ');

    // Generate list of options
    const selectOptionsList = selectOptions.map((selectOption, index) => {
      return <option key={index} value={index}>{selectOption}</option>
    });

    return (
      <fieldset>
        <Label
          hasLabel={this.props.hasLabel}
          htmlFor={this.props.htmlFor}
          label={this.props.label}
        />

        <select
          defaultValue=''
          id={this.props.htmlFor}
          name={this.props.name || null}
          required={this.props.required || null}
        >
          <option value='' disabled>Select one option</option>

          {selectOptionsList}
        </select>
      </fieldset>
    );
  }
};

// Create component for form
class Form extends React.Component {
  render() {
    return (
      <form method='post' enctype='application/json' action=''>

<center><h1>USBA Tournament Sanctioning Request</h1></center>

        <h2>Tournament Director Contact Information</h2>

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Tournament Director Name:'
          required='true'
          type='text'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Address 1:'
          required='true'
          type='text'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Address 2:'
          type='text'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='City:'
          required='true'
          type='text'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='State:'
          required='true'
          type='State'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Zip Code:'
          required='true'
          type='ZipCode'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Telephone Number:'
          required='true'
          type='text'
        />

        <Input
          hasLabel='true'
          htmlFor='emailInput'
          label='Email Address'
          required='true'
          type='Email'
        />

       <h2>Tournament Details</h2>

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Tournament Date:'
          required='true'
          type='Date'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Tournament Rain Date:'
          required='true'
          type='Date'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Tournament Address 1:'
          required='true'
          type='text'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Tournament Address 2:'
          type='text'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Tournament City:'
          required='true'
          type='text'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Tournament State:'
          required='true'
          type='State'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Tournament Zip:'
          required='true'
          type='ZipCode'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Registration Start Time:'
          required='true'
          type='Time'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Tournament Start Time:'
          required='true'
          type='Time'
        />

        <h3>Events</h3>
        <Select
          hasLabel='true'
          htmlFor='select'
          label='Event 1'
          options='Accuracy 50, Accuracy 100, Australian Round, Endurance,  Fast Catch, GLORP, Individual Relay Trial, Juggling, Juggling - Five Minutes, Long Distance, Maximum Time Aloft 100, Maximum Time Aloft Unlimited, Trick Catch/Doubling'
          required='true'
        />

        <Select
          hasLabel='true'
          htmlFor='select'
          label='Event 2'
          options='Accuracy 50, Accuracy 100, Australian Round, Endurance,  Fast Catch, GLORP, Individual Relay Trial, Juggling, Juggling - Five Minutes, Long Distance, Maximum Time Aloft 100, Maximum Time Aloft Unlimited, Trick Catch/Doubling'
        />

        <Select
          hasLabel='true'
          htmlFor='select'
          label='Event 3'
          options='Accuracy 50, Accuracy 100, Australian Round, Endurance,  Fast Catch, GLORP, Individual Relay Trial, Juggling, Juggling - Five Minutes, Long Distance, Maximum Time Aloft 100, Maximum Time Aloft Unlimited, Trick Catch/Doubling'
        />

        <Select
          hasLabel='true'
          htmlFor='select'
          label='Event 4'
          options='Accuracy 50, Accuracy 100, Australian Round, Endurance,  Fast Catch, GLORP, Individual Relay Trial, Juggling, Juggling - Five Minutes, Long Distance, Maximum Time Aloft 100, Maximum Time Aloft Unlimited, Trick Catch/Doubling'
        />

        <Select
          hasLabel='true'
          htmlFor='select'
          label='Event 5'
          options='Accuracy 50, Accuracy 100, Australian Round, Endurance,  Fast Catch, GLORP, Individual Relay Trial, Juggling, Juggling - Five Minutes, Long Distance, Maximum Time Aloft 100, Maximum Time Aloft Unlimited, Trick Catch/Doubling'
        />

        <Select
          hasLabel='true'
          htmlFor='select'
          label='Event 6'
          options='Accuracy 50, Accuracy 100, Australian Round, Endurance,  Fast Catch, GLORP, Individual Relay Trial, Juggling, Juggling - Five Minutes, Long Distance, Maximum Time Aloft 100, Maximum Time Aloft Unlimited, Trick Catch/Doubling'
        />

        <h3>Head Judge Nominees</h3>

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Judge Nominee 1:'
          required='true'
          type='text'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Judge Nominee 2:'
          required='true'
          type='text'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Judge Nominee 3:'
          required='true'
          type='text'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Judge Nominee 4:'
          type='text'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='Judge Nominee 5:'
          type='text'
        />

        <Button
          type='submit'
          value='submit'
          text='Send Sanctioning Request'
        />
      </form>
    )
  }
}

// Render Form component
ReactDOM.render(<Form />, formContainer);
