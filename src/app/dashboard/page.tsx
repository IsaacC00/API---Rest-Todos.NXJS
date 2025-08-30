import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { WidgetItem } from "@/components";

export default async function DashboardPage() {

  //? obtenemos la sesion con la funcion y recibe como parametro authOptions
  const session = await getServerSession(authOptions);

  //? si no existe sesion redirecionamos al signin
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (

    <div className="grid gap-6 sm:grid-cols-2 grid-cols-1">

      {/* TODO: src/components <WidgetItem /> */}
      <WidgetItem title="Bienvenido al Dashboard">
        <div className="flex flex-col justify-center items-center">
          <p>Como te encuentras hoy {JSON.stringify(session.user?.name)}?</p>
          <span>Server Side</span>
        </div>
      </WidgetItem>
      {/* TODO: Fin <WidgetItem /> */}

    </div>

  );
}