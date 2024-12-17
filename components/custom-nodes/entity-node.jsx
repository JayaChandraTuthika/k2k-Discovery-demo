import { Handle, Position } from "reactflow";
import { Mail, Phone, User, Globe } from "lucide-react";

const iconMap = {
  email: Mail,
  phone: Phone,
  person: User,
  domain: Globe,
};

export function EntityNode({ data }) {
  const Icon = iconMap[data.type] || User;

  return (
    <div
      className={`
        px-4 py-2 shadow-lg rounded-lg border cursor-pointer
        bg-card text-card-foreground
        hover:bg-accent hover:text-accent-foreground transition-colors
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
