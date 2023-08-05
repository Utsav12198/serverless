import { Box, Grid, Paper, Typography } from "@mui/material";

export default function QuestionDetail(props) {
  const { row } = props;
  return (
    <Box sx={{ margin: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Question
        </Typography>
        {props.children}
      </Box>
      <Typography variant="body1" gutterBottom component="div">
        {row.questionText}
      </Typography>

      <Box sx={{ display: "inline-flex", gap: 1 }}>
        {row.tags.map((label, index) => {
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
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {row.questionAnswers.map((answer, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: answer.isCorrect ? "#adffad" : "inherit",
                }}
              >
                <Typography variant="h6">Answer {index + 1}</Typography>
                <Typography>{answer.answerText}</Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
