import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { ItemWrapper } from '../components/ItemWrapper';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface Task{
  id: number;
  title: string;
  done: boolean;
}
export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle)

    if(taskWithSameTitle){
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }

    const newTask={
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task =>({...task}))

    const foundItem = updatedTasks.find(item => item.id === id);

    if(!foundItem)
    return;

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item','Tem certeza que você deseja remover esse To-DO?',[
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'sim',
        onPress: () => {
          const updateTasks = tasks.filter(task => task.id !== id);

          setTasks(updateTasks);
        }
      }
    ])
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs){
    const updatedTasks = tasks.map(task => ({...task}))

    const taskToBeUpdate = updatedTasks.find(task => task.id === task.id);

    if(!taskToBeUpdate)
    return;

    taskToBeUpdate.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})