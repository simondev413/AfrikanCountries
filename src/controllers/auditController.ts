import {AuditLog} from "../entities/Audit";
import { AppDataSource } from "../database/data-source";
import { Request, Response } from "express";

const auditRepository = AppDataSource.getRepository(AuditLog);

export const createAuditLog = async (
  action: string,
  entity: string,
  entityId: number,
  userId: number,
  ip: string 
): Promise<AuditLog> => {
  
  const audit = new AuditLog();
  audit.userId = userId.toString();
  audit.method = action;
  audit.route = `${entity}/${entityId}`;
  audit.statusCode = 200;
  audit.ip = ip;
  audit.userAgent = "";
  audit.body = {};
  audit.query = {};
  audit.params = {};
  audit.elapsedMs = 0;
  const auditData =  auditRepository.create(audit);
  return await auditRepository.save(auditData);
};

export const getAuditLogs = async (req:Request,resp:Response): Promise<Response> => {
  try {
    const audits =  await auditRepository.find();
    return resp.status(200).json(audits);
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
  
};