import { Request, Response } from "express";
import * as model from "../models/tituloModel.js";

/**
 * Controladores para la entidad Título Académico.
 */

/** Registra un título */
export async function create(req: Request, res: Response) {
  const id = await model.createTitulo(req.body.nombreTitulo);
  res.status(201).json({ id });
}

/** Obtiene todos los títulos */
export async function list(req: Request, res: Response) {
  res.json(await model.getTitulos());
}

/** Actualiza un título */
export async function update(req: Request, res: Response) {
  await model.updateTitulo(Number(req.params.id), req.body.nombreTitulo);
  res.json({ message: "Título actualizado" });
}

/** Elimina un título */
export async function remove(req: Request, res: Response) {
  await model.deleteTitulo(Number(req.params.id));
  res.json({ message: "Título eliminado" });
}
