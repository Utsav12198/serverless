import { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField,Container } from '@mui/material';

const steps = ['Enter Email', 'Add New Password' ]; // Add your desired steps here

const ForgotPasswordForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({}); // Store form data

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepSubmit = () => {
    console.log(formData); // Log form data on submission
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <TextField onChange={(event)=>{
            setFormData(formData);
            handleFormChange(event);
          }} value={formData['email'] || ''}  fullWidth label="Email Address" id="email" name="email" />
        );
      case 1:
        return (
          <>
          <TextField type="password" onChange={handleFormChange} value={formData['password'] || ''} sx={{mb: 2}} fullWidth label="Password" id="password" name="password" />
          <TextField type="password" onChange={handleFormChange} value={formData['confirmPassword'] || ''} fullWidth label="Confirm Password" id="confirm password" name="confirmPassword"/>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container fixed>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2em 0'
        }}>{renderStepContent(activeStep)}</div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep < steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleNext}>
             Next
          </Button>): (
          <Button variant="contained" color="primary" onClick={handleStepSubmit}>
              Submit
            </Button>
            )}

        </div>
      </div>
    </Container>
  );
};

export default ForgotPasswordForm;
