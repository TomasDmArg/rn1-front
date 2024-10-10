import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import AddTaskButton from '../components/AddTaskButton';
import BottomDrawer from '../components/BottomDrawer';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete project proposal', completed: false },
    { id: 2, text: 'Buy groceries', completed: true },
    { id: 3, text: 'Go for a run', completed: false },
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
    setIsDrawerOpen(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="w-full h-full max-w-[500px] mx-auto flex flex-col items-center justify-between p-6 bg-gray-100">
          <Header user={user} />
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <AddTaskButton onClick={() => setIsDrawerOpen(true)} />
        </main>
        <BottomDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onAddTask={addTodo} />
      </IonContent>
    </IonPage>
  );
};

export default Home;