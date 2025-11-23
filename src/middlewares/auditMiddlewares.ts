import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database/data-source";
import { AuditLog } from "../entities/Audit";

export const auditMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const auditRepo = AppDataSource.getRepository(AuditLog);

  const start = Date.now();
  const originalSend = res.send;

  // Interceptar o envio da resposta
  res.send = function (body?: any): Response {
    const elapsed = Date.now() - start;

    const userId = (req as any).user?.id || null;

    // Remover dados sensíveis
    const safeBody = { ...req.body };
    if (safeBody.password) safeBody.password = "***redacted***";

    const log = auditRepo.create({
      userId,
      method: req.method,
      route: req.originalUrl,
      statusCode: res.statusCode,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      body: safeBody,
      query: req.query,
      params: req.params,
      elapsedMs: elapsed
    });

    auditRepo.save(log).catch((err) => {
      console.error(" Error saving audit log:", err);
    });

    return originalSend.call(this, body);
  };

  next();
};
