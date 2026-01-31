import { Request, Response } from "express";
import * as model from "../models/cursoModel.js";

export async function create(req: Request, res: Response) {
  const id = await model.createCurso(req.body.numCurso);
  res.status(201).json({ id });
}

export async function list(req: Request, res: Response) {
  res.json(await model.getCursos());
}

export async function update(req: Request, res: Response) {
  await model.updateCurso(Number(req.params.id), req.body.numCurso);
  res.json({ message: "Actualizado" });
}

export async function remove(req: Request, res: Response) {
  await model.deleteCurso(Number(req.params.id));
  res.json({ message: "Eliminado" });
}
