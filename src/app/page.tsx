import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { Fragment } from "react";

export const revalidate = 0;

export default function Home() {
  return (
    <Fragment>
      <AddTodo />
      <TodoList/>
    </Fragment>
  )
}