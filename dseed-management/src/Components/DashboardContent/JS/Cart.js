import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import CartVerification from '../Cart_Steps/JS/CartVerification';
import CartSteps from '../../Data/CartSteps';
import StripeContainer from '../Cart_Steps/JS/StripeContainer';

const Cart = () => {
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleNext = () => {
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
  
    const handleReset = () => {
      setActiveStep(0);
    };
    
    return (
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {CartSteps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                  
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 &&
            <React.Fragment>
              <h2>Step 1</h2>
              <CartVerification/>
            </React.Fragment>
          }
          {activeStep === 1 &&
            <React.Fragment>
              <h2>Step 2</h2>
              <StripeContainer/>
            </React.Fragment>
          }
          {activeStep === 2 &&
            <React.Fragment>
              <h2>Step 3</h2>
            </React.Fragment>
          }
          {activeStep < CartSteps.length &&
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />


            {
              activeStep === CartSteps.length - 1 ? <Button onClick={handleReset}>Finish</Button> : <Button onClick={handleNext}>Next</Button>
            }

          </Box>
          }
        </Box>
      );
}

export default Cart;