export const dynamic = 'force-dynamic';
export const revalidate = 0;


import { getUserServerSession } from "@/authProviders/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodoGrid } from "@/todos";
import { redirect } from "next/navigation";


export const metadata = {
 title: 'Listado de todos',
 description: 'SEO de todos',
};

export default async function RestTodosPage() {

  const user = await getUserServerSession();
  if (!user) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({ 
    where: { userId: user.id },
    orderBy: { description: 'asc' }
  });

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
          <NewTodo />
      </div>  

      <TodoGrid todos={todos} />
    </div>
  );
}