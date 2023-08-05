import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import QuestionsContext from "../contexts/Questions.context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
};

export default function ModifyQuestionModal(props) {
  const { modalOpen, handleClose, formData, handleFormChange } =
    React.useContext(QuestionsContext);

  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [answer1, setAnswer1] = React.useState("");
  const [answer2, setAnswer2] = React.useState("");
  const [answer3, setAnswer3] = React.useState("");
  const [answer4, setAnswer4] = React.useState("");

  const questions = [
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
      difficulty: "",
      category: "",
    },
  ];

  const handleSubmit = async () => {
    let options = [answer1, answer2, answer3, answer4];
    const requestBody = {
      questions: [
        {
          question: question,
          options: options,
          answer: options[answer - 1],
          difficulty: difficulty,
          category: category,
        },
      ],
    };
    try {
      const response = await fetch(
        "https://j76ywowcl2.execute-api.us-east-1.amazonaws.com/prod/question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        // Handle non-2xx responses
        console.error("API call failed:", response.status, response.statusText);
        return;
      }

      const data = await response.json();
      console.log("API response:", data);
      alert("Questions added successfully");
    } catch (error) {
      // Handle fetch errors
      console.error("Error making API call:", error);
      console.log("Requestbody " + requestBody);
    }
  };

  const handleInput = (event) => {
    console.log(event.target.value);
    if (event.target.name === "questionText") {
      setQuestion(event.target.value);
    } else if (event.target.name === "category") {
      setCategory(event.target.value);
    } else if (event.target.name === "difficulty") {
      setDifficulty(event.target.value);
    } else if (event.target.name === "correctAnswerRadio") {
      setAnswer(event.target.value);
    } else if (event.target.name === "answer1") {
      setAnswer1(event.target.value);
    } else if (event.target.name === "answer2") {
      setAnswer2(event.target.value);
    } else if (event.target.name === "answer3") {
      setAnswer3(event.target.value);
    } else if (event.target.name === "answer4") {
      setAnswer4(event.target.value);
    }
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={2}>
          <TextField
            onChange={handleInput}
            // value={formData["questionText"] || ""}
            value={question}
            fullWidth
            label="Question Text"
            id="questionText"
            name="questionText"
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              // value={formData["category"] || ""}
              value={category}
              label="category"
              name="category"
              onChange={handleInput}
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
              // value={formData["difficulty"] || ""}
              value={difficulty}
              label="difficulty"
              name="difficulty"
              onChange={handleInput}
            >
              <MenuItem value={"easy"}>Easy</MenuItem>
              <MenuItem value={"medium"}>Medium</MenuItem>
              <MenuItem value={"hard"}>Hard</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="correctAnswerRadio"
              value={answer}
              onChange={handleInput}
            >
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Box sx={{ display: "flex", flex: 1 }}>
                    <FormControlLabel value="1" control={<Radio />} label="" />
                    <TextField
                      onChange={handleInput}
                      type="text"
                      // value={formData["answer1"] || ""}
                      value={answer1}
                      fullWidth
                      label="Answer 1"
                      id="answer1"
                      name="answer1"
                    />
                  </Box>

                  <Box sx={{ display: "flex", flex: 1 }}>
                    <FormControlLabel value="2" control={<Radio />} label="" />
                    <TextField
                      onChange={handleInput}
                      type="text"
                      // value={formData["answer2"] || ""}
                      value={answer2}
                      fullWidth
                      label="Answer 2"
                      id="answer2"
                      name="answer2"
                    />
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Box sx={{ display: "flex", flex: 1 }}>
                    <FormControlLabel value="3" control={<Radio />} label="" />
                    <TextField
                      onChange={handleInput}
                      type="text"
                      // value={formData["answer3"] || ""}
                      value={answer3}
                      fullWidth
                      label="Answer 3"
                      id="answer3"
                      name="answer3"
                    />
                  </Box>

                  <Box sx={{ display: "flex", flex: 1 }}>
                    <FormControlLabel value="4" control={<Radio />} label="" />
                    <TextField
                      onChange={handleInput}
                      type="text"
                      // value={formData["answer4"] || ""}
                      value={answer4}
                      fullWidth
                      label="Answer 4"
                      id="answer4"
                      name="answer4"
                    />
                  </Box>
                </Stack>
              </Stack>
            </RadioGroup>
          </FormControl>

          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {" "}
            Submit{" "}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
