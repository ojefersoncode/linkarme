'use client';

import ArrowBack from '@/components/Dashboard/ArrowBack';
import { NewPost } from '@/components/SocialMediaComponents/NewPost';
import { PreviewPost } from '@/components/SocialMediaComponents/PreviewPost';
import { PreviewVideo } from '@/components/SocialMediaComponents/PreviewShortVideo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NewPostPage() {
  return (
    <div className="w-full p-4 md:p-6 bg-background min-h-screen">
      <div className="pb-4">
        <ArrowBack />
      </div>
      <Card className="grid md:grid-cols-2 px-4 border-none shadow-none bg-white dark:bg-white">
        <NewPost />

        <Card className="border-none shadow-none p-4 gap-2 bg-white text-black w-full">
          <CardHeader className="pb-4 px-0 text-xl font-bold">
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
