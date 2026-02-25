'use client';

import { NewPost } from '@/components/SocialMediaComponents/NewPost';
import { PreviewPost } from '@/components/SocialMediaComponents/PreviewPost';
import { PreviewVideo } from '@/components/SocialMediaComponents/PreviewShortVideo';
import { Card, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NewPostPage() {
  return (
    <div className="w-full p-4 bg-background min-h-screen">
      <Card className="grid md:grid-cols-2 px-4 border-none rounded shadow-none bg-white dark:bg-white">
        <NewPost />

        <Card className="border-none shadow-none px-4 pt-0 gap-2 bg-white text-black w-full">
          <CardHeader className="pb-0 px-0 md:hidden text-xl font-bold">
            Preview
          </CardHeader>
          <Tabs defaultValue="preview-post" className="bg-white">
            <TabsList className="w-full bg-background ">
              <TabsTrigger
                className="border-none text-black/80 dark:text-black/80 data-[state=active]:bg-foreground dark:data-[state=active]:bg-foreground data-[state=active]:text-white dark:data-[state=active]:text-white"
                value="preview-post"
              >
                Imagem
              </TabsTrigger>
              <TabsTrigger
                className="border-none text-black/80 dark:text-black/80 data-[state=active]:bg-foreground dark:data-[state=active]:bg-foreground data-[state=active]:text-white dark:data-[state=active]:text-white"
                value="preview-video"
              >
                Video curto
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview-post">
              <div className="px-2 pt-4">
                <PreviewPost />
              </div>
            </TabsContent>
            <TabsContent value="preview-video">
              <div className="px-2 pt-4">
                <PreviewVideo />
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </Card>
    </div>
  );
}
