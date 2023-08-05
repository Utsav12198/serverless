import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import QuestionsTable from "./QuestionsTable";
import { useState, useEffect } from "react";
import ModifyQuestionModal from "../modals/ModifyQuestionModal";
import QuestionsContext from "../contexts/Questions.context";
import { useLocation, useNavigate } from "react-router-dom";
import { questionsData } from "../interfaces/Question.interface";
import { IconButton, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface Question {
  questionId: string;
  questionText: string;
  category: string;
  difficulty: string;
  tags: string[];
  gameCount: number;
  checked?: boolean;
  questionAnswers: {
    answerText: string;
    isCorrect: boolean;
  }[];
}

export default function QuestionsPanel() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    questionAnswers: [
      { answerText: null, isCorrect: false },
      { answerText: null, isCorrect: false },
      { answerText: null, isCorrect: false },
      { answerText: null, isCorrect: false },
    ],
  });
  const [rows, setRows] = useState([]);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const navigate = useNavigate();
  const location = useLocation();

  const game = location.state?.game;

  const fetchQuestionsByGameId = async (gameId) => {
    try {
      const requestBody = {
        id: gameId,
      };

      const response = await fetch(
        `https://q821rm5zx5.execute-api.us-east-1.amazonaws.com/prod/getgamedata`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching questions");
    }
  };

  useEffect(() => {
    if (game && game.id) {
      fetchQuestionsByGameId(game.id)
        .then((response) => {
          setRows(response);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [game]);

  const isGameView: boolean = location.pathname.includes(
    "/home/admin/games/view"
  );

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (name === "correctAnswerRadio") {
      setFormData((prevFormData) => {
        let index = parseInt(value, 10) - 1;
        if (
          Array.isArray(prevFormData["questionAnswers"]) &&
          index < prevFormData["questionAnswers"].length
        ) {
          prevFormData["questionAnswers"][index].isCorrect = true;
          prevFormData["questionAnswers"] = prevFormData["questionAnswers"].map(
            (item, elIndex) => {
              if (index !== elIndex) {
                item.isCorrect = false;
              }
              return item;
            }
          );
        }
        return { ...prevFormData, [name]: value };
      });
    } else if (name.startsWith("answer")) {
      setFormData((prevFormData) => {
        let index = parseInt(name.replace("answer", ""), 10) - 1;
        if (
          Array.isArray(prevFormData["questionAnswers"]) &&
          index < prevFormData["questionAnswers"].length
        ) {
          prevFormData["questionAnswers"][index].answerText = value;
        }
        return { ...prevFormData, [name]: value };
      });
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const deleteQuestion = (questionId: string) => {
    const prevRows = [...rows];
    const newRows = prevRows.filter((item) => item.questionId !== questionId);
    setRows(newRows);
  };
  return (
    <QuestionsContext.Provider
      value={{
        formData,
        rows,
        isGameView,
        deleteQuestion,
        setFormData,
        modalOpen,
        handleOpen,
        handleFormChange,
        handleClose,
      }}
    >
      <Stack spacing={4} sx={{ width: "100%" }}>
        {isGameView && <Typography variant="h4"> Science Quiz</Typography>}
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            onClick={() => navigate("/home/admin/games")}
          >
            {" "}
            View Games{" "}
          </Button>
          {!isGameView ? (
            <>
              <Button variant="contained" onClick={handleOpen}>
                {" "}
                Create Question{" "}
              </Button>
            </>
          ) : (
            <IconButton onClick={() => {}} sx={{ color: "red" }}>
              {" "}
              <EditOutlinedIcon />{" "}
            </IconButton>
          )}
          <ModifyQuestionModal />
        </Stack>

        <Stack>
          <QuestionsTable />
        </Stack>
      </Stack>
    </QuestionsContext.Provider>
  );
}
