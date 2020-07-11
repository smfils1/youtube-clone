import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import UploadForm from "./UploadForm";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Details", "Visiblity"];
}

export default function HorizontalLinearStepper({ filename }) {
  const classes = useStyles();
  const formRef = useRef();
  const [activeStep, setActiveStep] = React.useState(0);
  const [thumbnails, setThumbnails] = React.useState(
    new Array(3).fill(
      "https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png"
    )
  );
  const [thumbnail, setThumbnail] = React.useState("");
  const [enableNext, setEnableNext] = React.useState(false);
  const [details, setDetails] = React.useState(null);
  const [visibility, setVisibility] = React.useState(null);
  const steps = getSteps();

  const handleNext = () => {
    formRef.current.submitForm();
    if (!Object.keys(formRef.current.errors).length)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    console.log({ ...details, ...visibility });
  }, [visibility]);

  const handleFinish = () => {
    formRef.current.submitForm();

    // formRef.current.values
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/videos/thumbnails",
        {
          filename,
        }
      );

      setThumbnails(data.thumbnails);
      setEnableNext(true);
    } catch (err) {}
  }, []);

  return (
    <div className={classes.root}>
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
        <div>{filename}</div>
        {activeStep === steps.length - 1 ? (
          <div>
            <Typography className={classes.instructions}>
              {
                <UploadForm
                  type="visibility"
                  formRef={formRef}
                  onSubmit={setVisibility}
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
                onClick={() => {
                  handleFinish();
                  console.log("Finish");
                }}
                className={classes.button}
              >
                Finish
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              <div>
                <UploadForm
                  type="details"
                  formRef={formRef}
                  onSubmit={setDetails}
                />
                Pick an thumbnail:
                {thumbnails.map((thumbnail) => (
                  <img
                    src={thumbnail}
                    width="150"
                    height="100"
                    onClick={() => {
                      setThumbnail(thumbnail);
                    }}
                  ></img>
                ))}
              </div>
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
                onClick={handleNext}
                disabled={!enableNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
