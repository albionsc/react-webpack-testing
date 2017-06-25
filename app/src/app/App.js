import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin  from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            textualValue: ''
        }
    }

    handleSubmit() {
        this.props.onSubmit();
    }

    handleError() {
        this.props.onError();
    }


    render() {
        return (
            <MuiThemeProvider>
                <ValidatorForm ref="form"
                    onSubmit={this.handleSubmit.bind(this)}
                    onError={this.handleError.bind(this)}>
                    <p>Congratulations, you now have a useless React application</p>
                    <TextValidator
                        floatingLabelText="Textual"
                        onChange={this.handleChange}
                        name="textual"
                        value={this.state.textualValue}
                        validators={['required']}
                        errorMessages={['this field is required']} />
                    <RaisedButton className="app__button__submit" type="submit" value="submit" label="submit" />
                </ValidatorForm>
            </MuiThemeProvider>
        )
    }
}

export default App;