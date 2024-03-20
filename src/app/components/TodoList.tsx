import Todo from "./Todo";
import fetchTodos from "@/lib/fetchTodos";
import { Fragment } from "react";

export default async function TodoList() {
    const todos = await fetchTodos();

    const sortedTodos = todos.reverse();

    const content = (
        <Fragment>
            {sortedTodos.map((todo) => (
                <Todo key={todo.id} {...todo} />
            ))}
        </Fragment>
    )

    return content
};