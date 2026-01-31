import { Request, Response } from "express";
import * as model from "../models/rolModel.js";

/**
 * Controladores para la gestión de Roles.
 */

/** Crea un nuevo rol */
export async function create(req: Request, res: Response) {
  const id = await model.createRol(req.body.nombreGrupo, req.body.permisos);
  res.status(201).json({ id });
}

/** Lista todos los roles */
export async function list(req: Request, res: Response) {
  res.json(await model.getRoles());
}

/** Actualiza los datos de un rol */
export async function update(req: Request, res: Response) {
  await model.updateRol(
    Number(req.params.id),
    req.body.nombreGrupo,
    req.body.permisos
  );
  res.json({ message: "Rol actualizado con éxito" });
}

/** Elimina un rol */
export async function remove(req: Request, res: Response) {
  await model.deleteRol(Number(req.params.id));
  res.json({ message: "Rol eliminado con éxito" });
}
