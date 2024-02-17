import clsx from 'clsx';

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
}) => {
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
