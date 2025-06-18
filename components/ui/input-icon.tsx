import { ComponentProps, useId } from "react";

import { Input } from "@/components/ui/input";

function InputIcon({
  icon,
  ...props
}: ComponentProps<"input"> & { icon: string }) {
  const id = useId();

  return (
    <div className="relative flex rounded-md shadow-xs">
      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm">
        {icon}
      </span>
      <Input
        id={id}
        className="-me-px rounded-e-none ps-6 shadow-none"
        type="text"
        {...props}
      />
    </div>
  );
}

export default InputIcon;
