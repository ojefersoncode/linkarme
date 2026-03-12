import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Kanban from '@/components/TaskComponent/Kanban';
import { NavbarDashboard } from '@/components/Dashboard/navbar-dashboard';

export type PriorityType = 'Baixa' | 'Média' | 'Alta';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: PriorityType;
}

export default async function TasksPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/auth/login');
  }

  const { data, error } = await supabase
    .from('tasks')
    .select('id, title_task, content_task, priority_task')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar tasks:', error);
  }

  const initialTasks: Task[] =
    data?.map((task) => ({
      id: task.id,
      title: task.title_task,
      description: task.content_task ?? '',
      priority: task.priority_task as PriorityType
    })) ?? [];

  return (
    <div className="bg-background">
      <NavbarDashboard />

      <Kanban initialTasks={initialTasks} userId={user.id} />
    </div>
  );
}
