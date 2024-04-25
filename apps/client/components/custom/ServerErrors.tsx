interface ServerErrorsProps {
  message: string | null;
}

export function ServerErrors({ error }: { error: ServerErrorsProps }) {
  return (
    <div className="text-red-500 text-sm">
      {error?.message && <p>{error?.message}</p>}
    </div>
  );
}
