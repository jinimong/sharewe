export default function Button(props: any) {
  const { fullWidth, className } = props;
  return (
    <button
      className={`bg-gray-400 text-white hover:bg-gray-500 active:bg-gray-300 rounded px-4 py-2 ${
        fullWidth && 'w-full'
      } ${className}`}
      {...props}
    />
  );
}
