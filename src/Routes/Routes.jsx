import { createBrowserRouter } from "react-router";

// import Error from "../Shared/Error";
import RootLayout from "../Layouts/RootLayouts";
import Home from "../Shared/Components/Home/Home";
import PrivateRoute from "./PrivateRoutes";
import Login from "../Shared/Authentication/Login";
import Register from "../Shared/Authentication/Register";
import AddTaskForm from "../Pages/Buyers/AddTaskForm";
import Payment from "../Pages/Payment/Payment";
import PaymentContainer from "../Pages/Payment/PaymentContainer";
import PurchaseCoin from "../Pages/Payment/PurchaseCoin";
import PaymentHistory from "../Pages/Payment/PaymentHistory";
import TaskToReview from "../Pages/Buyers/TaskToReview";
import TaskList from "../Pages/Worker/Tasklist";
import TaskDetails from "../Pages/Worker/TaskDetails";
import Error from "../Shared/Error/Error";
import MySubmissions from "../Pages/Worker/MySubmissions";
import MyTasks from "../Pages/Buyers/MyTasks";
import Withdrawal from "../Pages/Worker/WithDrawal";
import ManageUsers from "../Pages/Admin/ManageUsers";
import ManageTasks from "../Pages/Admin/ManageTasks";
import DashboardRouter from "../Pages/Dashboard/DashboardRouter";
import States from "../Pages/Buyers/States";
import WorkerStats from "../Pages/Worker/WorkerStats";
import AdminStates from "../Pages/Admin/AdminStates";
import WithdrawRequest from "../Pages/Admin/WitdrawRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        index: true,
        path: "login",
        Component: Login,
      },
      {
        index: true,
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: PrivateRoute, // this renders the Outlet
    children: [
      {
        path: "",
        Component: DashboardRouter, // this layout will render its own <Outlet />
        children: [
          {
            index: true,
            path: "add-task",
            Component: AddTaskForm,
          },
          {
            index: true,
            path: "purchase-coin",
            Component: PurchaseCoin,
          },
          {
            index: true,
            path: "payment/:id",
            Component: PaymentContainer,
          },
          {
            index: true,
            path: "paymenthistory/:email",
            Component: PaymentHistory,
          },
          {
            index: true,
            path: "taskreview",
            Component: TaskToReview
          },
          {
            index: true,
            path: "tasklist",
            Component: TaskList
          },
          {
            index: true,
            path: "addtask/:id",
            Component: TaskDetails,
          },
          {
            index: true,
            path: "mySubmissions/:email",
            Component: MySubmissions,
          },
          {
            index: true,
            path: "mytasks",
            Component: MyTasks,
          },
          {
            index: true,
            path: "withdraw",
            Component: Withdrawal,
          },
          {
            index: true,
            path: "manage-users",
            Component: ManageUsers,
          },
          {
            index: true,
            path: "manage-tasks",
            Component: ManageTasks,
          },
          {
            index: true,
            path: "buyerstats",
            Component: States,
          },
          {
            index: true,
            path: "workerstats",
            Component: WorkerStats,
          },
          {
            index: true,
            path: "adminstates",
            Component: AdminStates,
          },
          {
            index: true,
            path: "withdrawrequest",
            Component: WithdrawRequest,
          }
        ],
      },
    ],
  },
]);
