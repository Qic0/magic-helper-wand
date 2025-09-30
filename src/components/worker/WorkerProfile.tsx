import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Briefcase } from "lucide-react";
import { WorkerDetailsDialog } from "@/components/WorkerDetailsDialog";

interface WorkerProfileProps {
  user: {
    id: string;
    full_name?: string;
    email?: string;
    role?: string;
    avatar_url?: string;
  };
  isOnline: boolean;
}

const WorkerProfile = ({ user, isOnline }: WorkerProfileProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  // Адаптируем данные пользователя к формату Worker
  const workerData = {
    uuid_user: user.id,
    full_name: user.full_name || 'Сотрудник',
    email: user.email || '',
    role: user.role || 'worker',
    avatar_url: user.avatar_url,
    created_at: new Date().toISOString(),
  };

  return (
    <>
      <Card className="border-2 cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => setDialogOpen(true)}>
        <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Аватар с индикатором онлайн */}
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={user.avatar_url} className="object-cover" />
              <AvatarFallback className="text-2xl font-bold bg-primary/10">
                {user.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div 
              className={`
                absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-4 border-background
                ${isOnline ? 'bg-green-500' : 'bg-gray-400'}
              `}
            />
          </div>

          {/* Имя */}
          <div>
            <h3 className="text-2xl font-bold mb-1">
              {user.full_name || 'Сотрудник'}
            </h3>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span className="capitalize text-sm">
                {user.role || 'Работник'}
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span className="truncate">{user.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <WorkerDetailsDialog
      worker={workerData}
      open={dialogOpen}
      onOpenChange={setDialogOpen}
    />
    </>
  );
};

export default WorkerProfile;
