import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import AddTaskButton from '../components/AddTaskButton';
import BottomDrawer from '../components/BottomDrawer';
import { useTodos } from '@/context/TodosContext';

const Home: React.FC = () => {
  const { todos, createTodo } = useTodos();

  const [localTodos, setLocalTodos] = useState(todos);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleTodo = (id: number) => {
    setLocalTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), title: text, completed: false };
    createTodo(text);
    setLocalTodos([...localTodos, newTodo]);
    setIsDrawerOpen(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="w-full h-full max-w-[500px] mx-auto flex flex-col items-center justify-between p-6 bg-gray-100">
          <Header />
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <AddTaskButton onClick={() => setIsDrawerOpen(true)} />
        </main>
        <BottomDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onAddTask={addTodo} />
      </IonContent>
    </IonPage>
  );
};

export default Home;