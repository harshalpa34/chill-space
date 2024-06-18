const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default layout;
