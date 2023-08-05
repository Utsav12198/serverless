import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import { Chip, Grid } from "@mui/material";
import type { Question } from "../interfaces/Question.interface";
import QuestionsContext from "../contexts/Questions.context";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useLocation } from "react-router-dom";
import QuestionDetail from "../shared/QuestionDetail";

function Row(props: { row: Question }) {
  const { row } = props;
  const { setFormData, handleOpen, isGameView, deleteQuestion } =
    React.useContext(QuestionsContext);
  const [open, setOpen] = React.useState(false);

  const createFormData = () => {
    let formData = { ...row };
    row.questionAnswers.forEach((item, index) => {
      formData[`answer${index + 1}`] = item.answerText;
      if (item.isCorrect) {
        formData["correctAnswerRadio"] = `${index + 1}`;
      }
    });
    // statically changing should be dynamic;
    formData["difficulty"] = formData["difficulty"].toLowerCase();
    formData["category"] = "option 1";

    setFormData(formData);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "200px",
          }}
        >
          {row.questionText}
        </TableCell>
        <TableCell align="right">{row.category}</TableCell>
        <TableCell align="right">{row.difficulty}</TableCell>
        <TableCell align="right">
          <Box sx={{ display: "inline-flex", gap: 1 }}>
            {row.tags.slice(0, 4).map((label, index) => {
              return (
                <Paper
                  key={`tag-${index}`}
                  elevation={3}
                  style={{
                    padding: "0.5em",
                    height: "fit-content",
                    backgroundColor: "#ffabab",
                  }}
                >
                  <Typography variant="body1" sx={{ fontSize: "12px" }}>
                    {" "}
                    {label}{" "}
                  </Typography>
                </Paper>
              );
            })}
          </Box>
        </TableCell>
        {!isGameView && <TableCell align="right">{row.gameCount}</TableCell>}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <QuestionDetail row={row}>
              <div style={{ display: "inline-flex" }}>
                <IconButton
                  onClick={() => {
                    console.log("clicked....");
                    createFormData();
                    handleOpen();
                  }}
                  sx={{ color: "red" }}
                >
                  {" "}
                  <EditOutlinedIcon />{" "}
                </IconButton>
                <IconButton
                  sx={{ color: "#f04462" }}
                  onClick={() => {
                    deleteQuestion(row.questionId);
                  }}
                >
                  {" "}
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </div>
            </QuestionDetail>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function QuestionsTable() {
  const { rows, isGameView } = React.useContext(QuestionsContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newRPP = event.target.value;
    setRowsPerPage(parseInt(newRPP, 10));
    setPage(0);
  };
  return (
    <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: "bold" }}>Question</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Category
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Difficulty
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Tags
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <Row key={`${row.questionId}-${index}`} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
