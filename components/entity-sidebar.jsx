import { Button } from "@/components/ui/button";
import { Mail, Phone, User, Globe, Database } from "lucide-react";

const entityTypes = [
  { type: "email", label: "Email", icon: Mail },
  { type: "phone", label: "Phone", icon: Phone },
  { type: "person", label: "Person", icon: User },
  { type: "website", label: "Website", icon: Globe },
  { type: "ip", label: "IP Address", icon: Database },
];

export function EntitySidebar({ onDragStart }) {
  return (
    <div className="w-64 border-r border-border bg-card p-4">
      <h2 className="font-semibold mb-4">Entities</h2>
      <div className="space-y-2">
        {entityTypes.map((entity) => {
          const Icon = entity.icon;
          return (
            <Button
              key={entity.type}
              variant="ghost"
              className="w-full justify-start"
              draggable
              onDragStart={(e) => onDragStart(e, entity.type)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {entity.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
