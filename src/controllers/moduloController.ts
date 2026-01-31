import { Request, Response } from "express";
import * as model from "../models/moduloModel.js";

/**
 * Controladores para la entidad Módulo.
 * Manejan las peticiones HTTP y llaman al modelo correspondiente.
 */

/** Registra un nuevo módulo */
export async function create(req: Request, res: Response) {
  const id = await model.createModulo(req.body.nombreModulo);
  res.status(201).json({ id });
}

/** Devuelve la lista de módulos */
export async function list(req: Request, res: Response) {
  res.json(await model.getModulos());
}

/** Actualiza un módulo existente */
export async function update(req: Request, res: Response) {
  await model.updateModulo(Number(req.params.id), req.body.nombreModulo);
  res.json({ message: "Actualizado correctamente" });
}

/** Elimina un módulo */
export async function remove(req: Request, res: Response) {
  await model.deleteModulo(Number(req.params.id));
  res.json({ message: "Eliminado correctamente" });
}
