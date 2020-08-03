import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Typography,
  Button,
  StepLabel,
  Step,
  Stepper,
} from "@material-ui/core";

import UploadForm from "./UploadForm";
import { setVisibilitySubmit, setDetails } from "../../redux/actions/upload";
import ImagePicker from "../ImagePicker";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function getSteps() {
  return ["Details", "Visiblity"];
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const formRef = useRef();
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();

  const isLoading = useSelector(({ upload }) => upload.isLoading);
  const thumbnails = useSelector(({ upload }) => upload.thumbnails);
  const steps = getSteps();

  const handleNext = () => {
    formRef.current.submitForm();
    if (!Object.keys(formRef.current.errors).length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleFinish = () => {
    formRef.current.submitForm();
  };

  const submitInfo = ({ visibility }) => {
    dispatch(setVisibilitySubmit(visibility));
  };

  const setDetailsRx = (details) => {
    dispatch(setDetails(details));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length - 1 ? (
          <div>
            <Typography className={classes.instructions}>
              {
                <UploadForm
                  type="visibility"
                  formRef={formRef}
                  onSubmit={submitInfo}
                />
              }
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleFinish}
                className={classes.button}
              >
                Finish
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className={classes.content}>
              <UploadForm
                type="details"
                formRef={formRef}
                onSubmit={setDetailsRx}
              />
              <Typography variant="body1" className={classes.instructions}>
                Pick an thumbnail:
              </Typography>
              <ImagePicker list={thumbnails || new Array(3).fill({})} />
            </div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={isLoading}
                className={classes.button}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
