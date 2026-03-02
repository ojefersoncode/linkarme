'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export default function WorkTabs() {
  const [tabs] = useState([
    { id: 'tab-1', title: 'Facebook' },
    { id: 'tab-2', title: 'Instagram' },
    { id: 'tab-3', title: 'Tiktok' },
    { id: 'tab-4', title: 'Youtube' },
    { id: 'tab-5', title: 'X' }
  ]);
  const [activeTab, setActiveTab] = useState('tab-1');

  const [profiles] = useState([
    { id: 'profile-1', title: 'Luiz' },
    { id: 'profile-2', title: 'Jeferson' }
  ]);

  const [selectedProfile, setSelectedProfile] = useState('profile-1');

  return (
    <Card className="bg-transparent pt-0 shadow-none border-none">
      <div className="flex items-center gap-4">
        <Select value={selectedProfile} onValueChange={setSelectedProfile}>
          <SelectTrigger className="border-none text-black bg-white dark:bg-white hover:bg-white hover:dark:bg-white cursor-pointer w-44">
            <SelectValue className="text-foreground" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-white text-black dark:text-black border-none shadow-xl">
            <SelectItem value="all">Meus perfis</SelectItem>
            {profiles.map((profile) => (
              <SelectItem key={profile.id} value={profile.id}>
                {profile.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="bg-white hover:bg-white cursor-pointer">
          <Plus />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex gap-2 items-center bg-transparent dark:bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2 group pr-2 border-none text-black/80 dark:text-black/80 bg-transparent dark:bg-transparent data-[state=active]:bg-foreground dark:data-[state=active]:bg-foreground data-[state=active]:text-white dark:data-[state=active]:text-white"
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="p-4 text-black bg-white rounded"
          >
            {tab.title}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
