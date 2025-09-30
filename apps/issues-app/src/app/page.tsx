import { Button } from "@pd/ui/button";
import { PriorityIcon, AssigneeIcon, CloseIcon } from "@pd/icons";
import { Text } from "@pd/ui/text";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      <Button 
        className="bg-blue-500"
        leftIcon={<PriorityIcon size={48} className="text-red-500 animate-pulse" />}
      >
        Priority Task1
      </Button>
       <Button 
        className="bg-pink-300"
        leftIcon={<AssigneeIcon size={28} className="text-blue-500 animate-pulse" />}
      >
        Priority Task1
      </Button>

      <Text as="h2" variant="title" className="text-red-400">This is Title Text</Text>
      <Text variant="body">This is Body Text</Text>
      <Text variant="small">This is Small Text</Text>
      <Text variant="label" className="animate-bounce">This is Label Tex 1</Text>
    </div>
  );
}
