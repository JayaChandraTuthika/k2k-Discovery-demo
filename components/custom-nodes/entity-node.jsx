import { Handle, Position } from "reactflow";
import { Mail, Phone, User, Globe, Database } from "lucide-react";

const iconMap = {
  email: Mail,
  phone: Phone,
  person: User,
  website: Globe,
  ip: Database,
};

export function EntityNode({ data, selected }) {
  const Icon = iconMap[data.type] || User;

  return (
    <div
      className={`
        px-4 py-2 shadow-lg rounded-lg border cursor-pointer
        ${selected ? "border-primary" : "border-border"}
        ${data.type === "ip" ? "bg-secondary" : "bg-secondary"}
        hover:bg-secondary/80 transition-colors
      `}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{data.label}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
}
