import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader2 className="animate-spin h-15 w-15" />
    </div>
  );
};
export default Loading;
