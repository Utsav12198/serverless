import { useState,useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Container, Stack, Avatar, FormControl, InputLabel, MenuItem, Select, Typography, Box, Accordion, AccordionSummary, AccordionDetails, IconButton, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { questionsData } from '../interfaces/Question.interface';
import QuestionDetail from '../shared/QuestionDetail';
const steps = ['Game Metadata', 'Select Questions']; // Add your desired steps here


interface FormData {
  gameName?: string;
  category?: string;
  difficulty?: string;
  questionsCount?: string;
  interval?: number;
  // Add other properties as needed
}

interface Question {
  id: string;
  question: string;
  difficulty: string;
  // Add other properties as needed
}

const GameStepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [questions, setQuestions] = useState(questionsData);
  const [testresponse, setTestresponse] = useState<Question[]>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

    // Function to log the form data
    const logFormData = () => {
      console.log("formData",formData);
    };

    const fetchData = async (category, difficulty) => {
      try {
        const response = await fetch(`https://d8qi2n7h3g.execute-api.us-east-1.amazonaws.com/prod/getquestions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category, difficulty }),
        });
        const data = await response.json();
        console.log(data);
        setTestresponse(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    finally {
      setLoading(false); // Seting  loading to false after the API call is completed
    }
    };
  
  

    const handleNext = async () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      logFormData();
    

      if (formData.category && formData.difficulty) {
        await fetchData(formData.category, formData.difficulty);
      }
    };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCheckChangeFormData = () => {
    
    let selectedQuestions = questions.filter(item=>item.checked);
    console.log(selectedQuestions);
    let event = {target: {name: "questions", value: selectedQuestions}};
    handleFormChange(event);

};

const handleStepSubmit = () =>{
    console.log(formData);

    const requestBody = {
      category: formData.category,
      gameName: formData.gameName,
      difficulty: formData.difficulty,
      duration: 10, // Replacing this with the actual duration value
      numberOfQuestions: formData.questionsCount, // Replace this with the actual number of questions value
      questionIds: selectedQuestionIds,
      interval: formData.interval,
    };

    const requestBodyJson = JSON.stringify(requestBody);

    fetch('https://k5z5a1x023.execute-api.us-east-1.amazonaws.com/prod/creategame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBodyJson,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSelectedQuestionIds([]); 
        alert("Game Successfully created");
      })
      .catch((error) => {
        console.error('Error:', error);
      });


}



  const handleFormChange = (event) => {

    const { name, value } = event.target;
    console.log(event.target)
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    
  };

  const handleCheckChange = (item) =>{

    console.log("item",item);

    setSelectedQuestionIds((prevIds) => {
      if (prevIds.includes(item.id)) {
        // If the question ID is already in the selectedQuestionIds array, remove it
        return prevIds.filter((id) => id !== item.id);
      } else {
        // If the question ID is not in the selectedQuestionIds array, add it
        return [...prevIds, item.id];
      }
    });
    // let previousQuestionsData = [...questionsData];

  }
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          // repeated
          <Stack spacing={2}>
            <TextField onChange={(event) => {
              handleFormChange(event);
            }} value={formData['gameName'] || ''} fullWidth label="Game Name" id="gameName" name="gameName" />
            <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData['category'] || ''}
                label="Category"
                name="category"
                onChange={(event) => {

                  handleFormChange(event);
                }}
              >
                <MenuItem value={"Science"}>Science</MenuItem>
                <MenuItem value={"Sports"}>Sports</MenuItem>
                <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                <MenuItem value={"Technology"}>Technology</MenuItem>
                <MenuItem value={"General Knowledge"}>General Knowledge</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={formData['difficulty'] || ''}
                label="Difficulty"
                name="difficulty"
                onChange={(event) => {

                  handleFormChange(event);
                }}
              >
                <MenuItem value={"easy"}>Easy</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"hard"}>Hard</MenuItem>
              </Select>
            </FormControl>
            </Stack>
            <TextField onChange={(event) => {

              handleFormChange(event);
            }} value={formData['questionsCount'] || ''} fullWidth label="No. of Questions" id="questionsCount" name="questionsCount" type='number' />
             
             <TextField onChange={(event) => {

handleFormChange(event);
}} value={formData['interval'] || ''} fullWidth label="Game Interval in seconds" id="interval" name="interval" type='number' />
            

          </Stack>

        );
      case 1:
        return (


          <FormGroup>
  <Stack spacing={2}>
    {/* Only render questions if testresponse is available and not loading */}
    {testresponse && !loading ? (
      testresponse.map((item, index) => {
        return (
          <Accordion key={item.id}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ alignSelf: 'center', marginRight: 2 }}>
                <Checkbox
                  // checked={item.checked} // Assuming the API response has a property for checked status
                  onChange={() => {
                    handleCheckChange(item);
                  }}
                />
              </Box>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ marginLeft: 2 }} />} sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
                  {/* Display the questionText from the API response */}
                  <Typography variant="h6">{item.question}</Typography>
                  <Typography variant='body1'>{item.id}</Typography>
                </Box>
              </AccordionSummary>
            </Box>
            <AccordionDetails>
              {/* If you need to show more details for each question, you can use the QuestionDetail component */}
              {/* Your QuestionDetail component implementation */}
            </AccordionDetails>
          </Accordion>
        );
      })
    ) : (
      <Typography variant="body1">Loading questions...</Typography>
    )}
  </Stack>
</FormGroup>
            
   
        );

      default:
        return null;
    }
  };

  return (
    <Container fixed>
      <>
        <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '2em 0' }}>
      {renderStepContent(activeStep)}
</div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Button onClick={()=>{
            if(activeStep > 0){
              handleBack()
            } 
          }} disabled={activeStep === 0}>
            Back
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleNext} >
              Next
            </Button>) : (
              <Button variant="contained" color="primary" onClick={handleStepSubmit}>
  Submit
</Button>
          )}

        </div>
      </div>
      </>
    </Container>
  );
};

export default GameStepperForm;
