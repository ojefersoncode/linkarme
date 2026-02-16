import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount
} from '@/components/ui/avatar';

export default function Avatars() {
  return (
    <AvatarGroup className="">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>

      <AvatarGroupCount className="bg-foreground dark:bg-foreground">
        +99
      </AvatarGroupCount>
    </AvatarGroup>
  );
}
