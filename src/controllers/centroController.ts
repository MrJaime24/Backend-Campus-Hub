import { Request, Response } from "express";
import * as model from "../models/centroModel.js";

export async function create(req: Request, res: Response) {
  const id = await model.createCentro(
    req.body.nombreCentro,
    req.body.sufijoEmail
  );
  res.status(201).json({ id });
}

export async function list(req: Request, res: Response) {
  res.json(await model.getCentros());
}

export async function update(req: Request, res: Response) {
  await model.updateCentro(
    Number(req.params.id),
    req.body.nombreCentro,
    req.body.sufijoEmail
  );
  res.json({ message: "Actualizado" });
}

export async function remove(req: Request, res: Response) {
  await model.deleteCentro(Number(req.params.id));
  res.json({ message: "Eliminado" });
}
