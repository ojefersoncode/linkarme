'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { EllipsisVertical, Pencil, Plus, Trash } from 'lucide-react';
import { Card } from '@/components/ui/card';

type PriorityType = 'Baixa' | 'Média' | 'Alta';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: PriorityType;
}

interface PriorityConfig {
  color: string;
  light: string;
  border: string;
  text: string;
}

const PRIORITIES: PriorityType[] = ['Baixa', 'Média', 'Alta'];

const PRIORITY_CONFIG: Record<PriorityType, PriorityConfig> = {
  Baixa: {
    color: 'bg-green-500',
    light: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600'
  },
  Média: {
    color: 'bg-yellow-500',
    light: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-600'
  },
  Alta: {
    color: 'bg-red-500',
    light: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600'
  }
};

const EMPTY_TASK: Omit<Task, 'id'> = {
  title: '',
  description: '',
  priority: 'Média'
};

interface Props {
  initialTasks: Task[];
  userId: string;
}

export default function Kanban({ initialTasks, userId }: Props) {
  const supabase = createClient();

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>(EMPTY_TASK);
  const [loading, setLoading] = useState(false);

  const tasksByPriority = (p: PriorityType) =>
    tasks.filter((t) => t.priority === p);

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;

    setLoading(true);

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: userId,
        title_task: newTask.title,
        content_task: newTask.description,
        priority_task: newTask.priority
      })
      .select('id, title_task, content_task, priority_task')
      .single();

    setLoading(false);

    if (error) {
      console.error('Erro ao criar task:', error);
      return;
    }

    const createdTask: Task = {
      id: data.id,
      title: data.title_task,
      description: data.content_task ?? '',
      priority: data.priority_task as PriorityType
    };

    setTasks((prev) => [createdTask, ...prev]);
    setNewTask(EMPTY_TASK);
    setShowAddModal(false);
  };

  const handleSaveEdit = async () => {
    if (!editingTask) return;

    setLoading(true);

    const { error } = await supabase
      .from('tasks')
      .update({
        title_task: editingTask.title,
        content_task: editingTask.description,
        priority_task: editingTask.priority
      })
      .eq('id', editingTask.id)
      .eq('user_id', userId);

    setLoading(false);

    if (error) {
      console.error('Erro ao editar task:', error);
      return;
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === editingTask.id ? editingTask : t))
    );
    setEditingTask(null);
  };

  const handleDelete = async (id: number) => {
    const oldTasks = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Erro ao deletar task:', error);
      setTasks(oldTasks);
    }
  };

  return (
    <div className="bg-background p-4">
      <Card className="min-h-screen bg-white border-none shadow rounded-sm p-6 max-md:p-4 font-sans">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-gray-800">Tarefas</h1>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-foreground hover:bg-foreground/90 cursor-pointer text-white gap-2"
          >
            <Plus className="size-4" /> Nova tarefa
          </Button>
        </div>

        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-6 gap-4">
          {PRIORITIES.map((priority) => {
            const cfg = PRIORITY_CONFIG[priority];
            const col = tasksByPriority(priority);

            return (
              <div key={priority} className="flex flex-col gap-3 border-none">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-sm ${cfg.light} ${cfg.border} border`}
                >
                  <div className={`w-3 h-3 rounded-full ${cfg.color}`} />
                  <span className={`text-sm font-semibold ${cfg.text}`}>
                    {priority}
                  </span>
                  <span
                    className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${cfg.color} text-white`}
                  >
                    {col.length}
                  </span>
                </div>

                <div className="flex flex-col gap-3 min-h-[120px]">
                  {col.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white shadow-md shadow-black/20 rounded-sm border-gray-300 p-4 flex flex-col gap-2 hover:shadow-md md:hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {task.title}
                        </h3>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 rounded cursor-pointer hover:bg-background transition-colors">
                              <EllipsisVertical className="w-4 h-4 text-black" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="flex-1 bg-white shadow-xl border-none"
                            align="start"
                          >
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                className="text-black hover:text-white"
                                onClick={() => setEditingTask({ ...task })}
                              >
                                <div className="flex items-center gap-2">
                                  <Pencil className="size-4" />
                                  <span>Editar</span>
                                </div>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="text-black hover:text-white"
                                onClick={() => handleDelete(task.id)}
                              >
                                <div className="flex items-center gap-2">
                                  <Trash className="size-4" />
                                  <span>Excluir</span>
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed bg-background rounded-lg overflow-hidden line-clamp-3 px-2 py-1">
                        {task.description}
                      </p>
                    </div>
                  ))}

                  {col.length === 0 && (
                    <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-200 rounded-xl text-xs text-gray-400">
                      Nenhuma tarefa
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Dialog
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
        >
          <DialogContent className="sm:max-w-md bg-white border-none shadow">
            <DialogHeader>
              <DialogTitle className="text-black">Editar tarefa</DialogTitle>
            </DialogHeader>

            <Card className="flex flex-col gap-6 bg-white border-none shadow-none">
              <div className="flex flex-col gap-2">
                <Label className="text-black">Título</Label>
                <Input
                  className="bg-white border border-black/20 shadow text-black"
                  value={editingTask?.title ?? ''}
                  onChange={(e) =>
                    setEditingTask((p) =>
                      p ? { ...p, title: e.target.value } : p
                    )
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-black">Descrição</Label>
                <Textarea
                  rows={4}
                  className="bg-white border border-black/20 shadow text-black resize-none"
                  value={editingTask?.description ?? ''}
                  onChange={(e) =>
                    setEditingTask((p) =>
                      p ? { ...p, description: e.target.value } : p
                    )
                  }
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label className="text-black">Prioridade</Label>
                <Select
                  value={editingTask?.priority}
                  onValueChange={(v) =>
                    setEditingTask((p) =>
                      p ? { ...p, priority: v as PriorityType } : p
                    )
                  }
                >
                  <SelectTrigger className="bg-white border border-black/20 shadow cursor-pointer text-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>

            <DialogFooter className="gap-2">
              <Button
                className="bg-white hover:bg-white text-black border border-black/20 shadow cursor-pointer"
                onClick={() => setEditingTask(null)}
              >
                Cancelar
              </Button>
              <Button
                className="bg-foreground hover:bg-foreground/90 text-white cursor-pointer"
                onClick={handleSaveEdit}
                disabled={loading}
              >
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={showAddModal}
          onOpenChange={(open) => {
            setShowAddModal(open);
            if (!open) setNewTask(EMPTY_TASK);
          }}
        >
          <DialogContent className="sm:max-w-md bg-white border-none shadow">
            <DialogHeader>
              <DialogTitle className="text-black">Nova tarefa</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-6 py-2">
              <div className="flex flex-col gap-2">
                <Label className="text-black">Título</Label>
                <Input
                  className="bg-white border border-black/20 shadow text-black"
                  placeholder="Nome da tarefa"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask((p) => ({ ...p, title: e.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-black">Descrição</Label>
                <Textarea
                  rows={4}
                  className="bg-white border border-black/20 shadow text-black resize-none"
                  placeholder="Descreva a tarefa..."
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask((p) => ({ ...p, description: e.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-black">Prioridade</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(v) =>
                    setNewTask((p) => ({ ...p, priority: v as PriorityType }))
                  }
                >
                  <SelectTrigger className="bg-white hover:bg-white text-black border border-black/20 shadow cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                className="bg-white hover:bg-white text-black border"
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </Button>
              <Button
                className="bg-foreground hover:bg-foreground/90 text-white"
                onClick={handleAddTask}
                disabled={loading}
              >
                Criar tarefa
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}
