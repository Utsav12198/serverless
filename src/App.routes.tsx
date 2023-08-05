import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
// import AuthPage from './pages/AuthPage/AuthPage';
import LoginForm from './components/LoginForm/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm/ForgotPasswordForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import ProfilePage from './components/ProfilePage/ProfilePage';
import AdminPanel from './components/AdminPanel/AdminPanel';
import GamePanel from './components/AdminPanel/GamePanel/GamePanel';
import QuestionsPanel from './components/AdminPanel/QuestionsPanel/QuestionsPanel';
import QuestionsTable from './components/AdminPanel/QuestionsPanel/QuestionsTable';
import LeaderBoardPage from './components/LeaderBoardPage/LeaderBoardPage';
import SecurityQuestionForm from './components/LoginForm/SecurityQuestionForm/SecurityQuestionForm';
import GamesList  from './components/TriviaLobby/GamesList';
import QuizGame from './components/GameExperience/QuizGame';
import TeamForm from './components/Teams/TeamForm';
import ForbiddenError from './components/ErrorPages/ForbiddenError';
import InternalServerError from './components/ErrorPages/InternalServerError';
import AllQuestionsPanel from "./components/AdminPanel/QuestionsPanel/AllQuestionsPanel";
import GameDashboard from "./components/AdminPanel/Dashboards/gameuserdashboard";


  
  
  
  

const router = createBrowserRouter([
    { path: "/", element:  <Navigate to="auth/login"  /> },
    {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginForm /> },
      { path: "forgotPassword", element: <ForgotPasswordForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "login/securityQuestion", element: <SecurityQuestionForm /> },
    ],
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
        {path: 'gamesList', element: <GamesList /> },
        {path: 'quizgame/:gameId', element :<QuizGame />},
        {path: 'addTeam', element: <TeamForm/>},
        {path: 'leaderboard', element: <LeaderBoardPage /> },
        {path: 'profile', element: <ProfilePage />},
        {path: 'admin', element: <AdminPanel />, 
        children:[
            { path: '', element: <Navigate to="games"  /> },
            {path: 'games', element: <GamePanel />},
            { path: 'games/view', element: <QuestionsPanel />},
            {path: 'questions', element: <QuestionsPanel />},
            { path: "dashboard", element: <GameDashboard /> },
        ]},
        // {path: '/forgotPassword', element: <ForgotPasswordForm />},
        // {path: '/register', element: <RegisterForm />}
    ]},

    {path:'/forbidden', element:<ForbiddenError/>},
    {path:'/serverError', element:<InternalServerError/>}

  ])

export default router;
