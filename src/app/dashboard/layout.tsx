import { Sidebar, TopMenu } from "@/components";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* TODO: src/components <Sidebar /> */}
      <Sidebar />
      {/*TODO: Fin del <Sidebar /> */}


      {/* Main Layout content - Contenido principal del Layout */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">

        {/* TODO: src/components <TopMenu /> */}
        <TopMenu />
        {/* TODO: Fin del <TopMenu /> */}

        {/* TODO: Contenido en el Layout.tsx */}
        <div className="px-6 bg-gray-300 h-screen pt-6">
          {children}
          {/* TODO: Fin del contenido en el Layout.tsx */}
        </div>
      </div>
    </>
  );
}