import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, Circle } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
  return (
    <section className='flex-grow w-full overflow-y-auto mt-6 mb-6'>
      {todos.map(todo => (
        <Card key={todo.id} className="mb-3">
          <CardContent onClick={() => toggleTodo(todo.id)} className="flex items-center p-4 cursor-pointer hover:scale-[0.99] transition-all">
            <Button
              variant="ghost"
              className="p-0 mr-2 hover:bg-transparent"
            >
              {todo.completed ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <Circle className="h-6 w-6" />
              )}
            </Button>
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default TodoList;