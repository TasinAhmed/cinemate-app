import clsx from 'clsx';
import { type FieldValues, type UseFormRegister } from 'react-hook-form';
import { type IconType } from 'react-icons';

interface InputProps {
  type: string;
  placeholder: string;
  className?: string;
  icon?: IconType;
  toggleShowPassword?: () => void;
  iconPointer?: boolean;
  register: UseFormRegister<FieldValues>;
  id: string;
  required?: boolean;
}

const Input = ({
  type,
  placeholder,
  className,
  icon: Icon,
  toggleShowPassword,
  iconPointer,
  register,
  id,
  required,
}: InputProps) => {
  return (
    <div
      className={clsx(
        `flex w-full items-center overflow-hidden rounded-md border-transparent
          bg-zinc-700 text-white transition-shadow focus-within:ring-2`,
        className
      )}
    >
      <input
        type={type}
        placeholder={placeholder}
        className="flex-1 border-0 bg-inherit focus:ring-0"
        {...register(id, { required })}
      />
      <div
        onClick={toggleShowPassword}
        className={clsx({ 'cursor-pointer': iconPointer }, 'px-3')}
      >
        {Icon && <Icon />}
      </div>
    </div>
  );
};
export default Input;
