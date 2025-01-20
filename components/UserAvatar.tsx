import { cn } from "../lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  src?: string;
  className?: string;
}

const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-8 w-8 md:h-8 md:w-8", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};
export default UserAvatar;
