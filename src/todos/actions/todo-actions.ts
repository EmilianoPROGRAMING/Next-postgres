'use server';

import prisma from "@/lib/prisma";
import { todo } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const sleep = async(seconds: number = 0 ) => {

    return new Promise ( resolve => {
        setTimeout( () => {
            resolve(true);
        }, seconds * 1000 );
    });

}


export const toggleTodo = async(id: string, complete: boolean ): Promise<todo> => {

    await sleep(3);

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
        throw `todo con id  ${id} no encontrado`;
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { complete }
    });

    revalidatePath('/dashboard/server-actions');
    return updatedTodo;

}

export const addTodo = async( description: string, userId: string ) => {
    try {
        const todo = await prisma.todo.create({ data: { description, userId: '....' } });
        revalidatePath('/dashboard/server-actions');
            
        return todo;
        
     } catch (error) {
        return {
            message: "Error creando todo"
        }
     }
}

export const deleteCompleted = async(): Promise<void> => {

    try {
        await prisma.todo.deleteMany({ where: {complete: true } });
        revalidatePath('/dashboard/server-actions');
        
     } catch (error) {
        console.log(error);
        
        
     }

}