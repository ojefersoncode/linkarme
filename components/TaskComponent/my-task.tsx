'use client';

import { useState } from 'react';
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
import { Dot, EllipsisVertical, Pencil, Trash } from 'lucide-react';

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

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Tarefa 1',
    description: 'O conteúdo fica aqui, e você poderá editá-lo posteriormente',
    priority: 'Alta'
  },
  {
    id: 2,
    title: 'Tarefa 2',
    description: 'O conteúdo fica aqui, e você poderá editá-lo posteriormente',
    priority: 'Alta'
  },
  {
    id: 3,
    title: 'Tarefa 3',
    description:
      'O conteúdo fica aqui, e você poderá editá-lo posteriormente, mas essa tarefa tem uma descrição um pouco maior para testar o comportamento do texto quando ele ultrapassa o limite de linhas definido no card. Vamos ver como fica quando isso acontecer.',
    priority: 'Média'
  },
  {
    id: 4,
    title: 'Tarefa 4',
    description: 'O conteúdo fica aqui, e você poderá editá-lo posteriormente',
    priority: 'Baixa'
  },
  {
    id: 5,
    title: 'Tarefa 5',
    description: 'O conteúdo fica aqui, e você poderá editá-lo posteriormente',
    priority: 'Baixa'
  }
];

const EMPTY_TASK: Omit<Task, 'id'> = {
  title: '',
  description: '',
  priority: 'Média'
};

export default function Kanban() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>(EMPTY_TASK);

  const tasksByPriority = (p: PriorityType) =>
    tasks.filter((t) => t.priority === p);

  const handleSaveEdit = () => {
    if (!editingTask) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === editingTask.id ? editingTask : t))
    );
    setEditingTask(null);
  };

  const handleDelete = (id: number) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    setTasks((prev) => [...prev, { ...newTask, id: Date.now() }]);
    setNewTask(EMPTY_TASK);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-white p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Tarefas</h1>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-foreground hover:bg-foreground/90  text-white gap-2"
        >
          <span className="text-lg leading-none">+</span> Nova tarefa
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {PRIORITIES.map((priority) => {
          const cfg = PRIORITY_CONFIG[priority];
          const col = tasksByPriority(priority);
          return (
            <div key={priority} className="flex flex-col gap-3">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${cfg.light} ${cfg.border} border`}
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
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2 hover:shadow-md transition-shadow"
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
                              <div className="flex items-center gap-2 ">
                                <Pencil className="size-4 " />
                                <span> Editar</span>
                              </div>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="text-black hover:text-white dark:hover:text-white"
                              onClick={() => handleDelete(task.id)}
                            >
                              <div className="flex items-center gap-2 ">
                                <Trash className="size-4 " />
                                <span> Excluir</span>
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed bg-background rounded-lg overflow-hidden line-clamp-3 p-1">
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-black dark:text-black">
              Editar tarefa
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-black dark:text-black">Título</Label>
              <Input
                className="bg-white dark:bg-white border-none shadow text-black placeholder:text-gray-500"
                value={editingTask?.title ?? ''}
                onChange={(e) =>
                  setEditingTask((p) =>
                    p ? { ...p, title: e.target.value } : p
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-black dark:text-black">Descrição</Label>
              <Textarea
                rows={4}
                className="bg-white dark:bg-white border-none shadow text-black resize-none placeholder:text-gray-500"
                value={editingTask?.description ?? ''}
                onChange={(e) =>
                  setEditingTask((p) =>
                    p ? { ...p, description: e.target.value } : p
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-black dark:text-black">Prioridade</Label>
              <Select
                value={editingTask?.priority}
                onValueChange={(v) =>
                  setEditingTask((p) =>
                    p ? { ...p, priority: v as PriorityType } : p
                  )
                }
              >
                <SelectTrigger>
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
            <Button variant="outline" onClick={() => setEditingTask(null)}>
              Cancelar
            </Button>
            <Button
              className="bg-green-700 hover:bg-green-800 text-white"
              onClick={handleSaveEdit}
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nova tarefa</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label>Título</Label>
              <Input
                placeholder="Nome da tarefa"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask((p) => ({ ...p, title: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Descrição</Label>
              <Textarea
                rows={3}
                placeholder="Descreva a tarefa..."
                value={newTask.description}
                onChange={(e) =>
                  setNewTask((p) => ({ ...p, description: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Prioridade</Label>
              <Select
                value={newTask.priority}
                onValueChange={(v) =>
                  setNewTask((p) => ({ ...p, priority: v as PriorityType }))
                }
              >
                <SelectTrigger>
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
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-green-700 hover:bg-green-800 text-white"
              onClick={handleAddTask}
            >
              Criar tarefa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
